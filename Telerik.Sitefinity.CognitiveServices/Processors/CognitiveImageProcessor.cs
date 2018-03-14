using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Telerik.Microsoft.Practices.Unity;
using Telerik.Sitefinity.Abstractions;
using Telerik.Sitefinity.CognitiveServices.Model;
using Telerik.Sitefinity.CognitiveServices.ServiceClients;
using Telerik.Sitefinity.Libraries.Model;
using Telerik.Sitefinity.Modules.Libraries;
using Telerik.Sitefinity.Taxonomies;
using Telerik.Sitefinity.Taxonomies.Model;

namespace Telerik.Sitefinity.CognitiveServices.Processors
{
    /// <summary>
    /// The class exposes cognitive processing functionality - tagging and image analyzing.
    /// </summary>
    public class CognitiveImageProcessor : ICognitiveImageProcessor
    {
        private readonly IVisionClient visionClient;

        public CognitiveImageProcessor()
            : this(ObjectFactory.Container.Resolve<IVisionClient>())
        {
        }

        public CognitiveImageProcessor(IVisionClient visionClient)
        {
            this.visionClient = visionClient;
        }

        /// <summary>
        /// Determines whether this instance can process the provided image
        /// </summary>
        /// <returns>
        ///   <c>true</c> if this instance can process; otherwise, <c>false</c>.
        /// </returns>
        public bool CanProcess()
        {
            return true;
        }

        /// <summary>
        /// Processes the specified content.
        /// </summary>
        /// <param name="content">The content.</param>
        /// <param name="sourceStream">The source stream.</param>
        public void Process(Image content, Stream sourceStream)
        {
            byte[] imageBytes = GetByteArray(sourceStream);

            VisionModel visionModel = this.visionClient.Analyze(imageBytes);

            if (visionModel != null)
            {
                if (visionModel.Adult != null && (visionModel.Adult.IsAdultContent || visionModel.Adult.IsRacyContent))
                {
                    var racyErrorMessage = string.Format("The file '{0}' cannot be processed because inappropriate content was detected.", content.Title);
                    throw new LibraryItemUploadException(racyErrorMessage);
                }
                
                Description description = visionModel.Description;
                if (description != null && description.Captions != null && description.Captions.Any())
                {
                    var caption = description.Captions.OrderByDescending(c => c.Confidence).FirstOrDefault().Text;
                    if (!string.IsNullOrWhiteSpace(caption))
                    {
                        content.AlternativeText = caption;
                    }
                }

                var highConfidenceTags = this.GetHighConfidenceTags(visionModel);
                if (highConfidenceTags.Any())
                {
                    IList<Guid> taxonIds = this.CreateTaxons(TaxonomyManager.TagsTaxonomyId, highConfidenceTags);
                    content.Organizer.AddTaxa("Tags", taxonIds.ToArray());
                }
            }
        }

        private IEnumerable<string> GetHighConfidenceTags(VisionModel visionModel)
        {
            var highConfidanceTags = new List<string>();
            var tags = visionModel.Tags;
            if (tags != null && tags.Any())
            {
                highConfidanceTags.AddRange(tags.Where(t => t.Confidence >= ConfidenceThreshold).Select(t => t.Name));
            }

            var categories = visionModel.Categories;
            if (categories != null && categories.Any())
            {
                IEnumerable<Detail> details = categories.Where(c => c.Detail != null).Select(c => c.Detail);
                if (details.Any())
                {
                    IEnumerable<Celebrity> celebrities = details
                        .Where(d => d.Celebrities != null && d.Celebrities.Any())
                        .SelectMany(c => c.Celebrities)
                        .Where(t => t.Confidence >= ConfidenceThreshold);

                    if (celebrities != null && celebrities.Any())
                    {
                        highConfidanceTags.AddRange(celebrities.Select(t => t.Name));
                    }

                    IEnumerable<Landmark> landmarks = details
                        .Where(c => c.Landmarks != null && c.Landmarks.Any())
                        .SelectMany(c => c.Landmarks)
                        .Where(t => t.Confidence >= ConfidenceThreshold);

                    if (landmarks != null && landmarks.Any())
                    {
                        highConfidanceTags.AddRange(landmarks.Select(l => l.Name));
                    }
                }
            }

            return highConfidanceTags;
        }
        
        private IList<Guid> CreateTaxons(Guid taxonomyId, IEnumerable<string> titles)
        {
            var taxonIds = new List<Guid>();
            var taxonomyManager = TaxonomyManager.GetManager();
            var taxonomy = taxonomyManager.GetTaxonomy(taxonomyId) as Taxonomy;

            foreach (var title in titles)
            {
                var taxonId = taxonomyManager.GetTaxa<FlatTaxon>().Where(t => t.Name == title).Select(t => t.Id).FirstOrDefault();
                if (taxonId == Guid.Empty)
                {
                    taxonId = Guid.NewGuid();
                    var taxon = taxonomyManager.CreateTaxon<FlatTaxon>(taxonId);
                    taxon.Taxonomy = taxonomy;
                    taxon.Name = title;
                    taxon.Title = title;
                    taxon.UrlName = title;
                    taxonomyManager.SaveChanges();
                }

                taxonIds.Add(taxonId);
            }

            return taxonIds;
        }

        public static byte[] GetByteArray(Stream input)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                input.CopyTo(ms);
                return ms.ToArray();
            }
        }

        private const double ConfidenceThreshold = 0.79;
    }
}

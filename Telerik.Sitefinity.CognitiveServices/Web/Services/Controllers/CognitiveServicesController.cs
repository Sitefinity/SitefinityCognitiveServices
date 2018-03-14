using Aylien.TextApi;
using System.Web.Http;
using Telerik.Sitefinity.CognitiveServices.Configuration;
using Telerik.Sitefinity.CognitiveServices.Web.Services.DTO;
using Telerik.Sitefinity.Configuration;

namespace Telerik.Sitefinity.CognitiveServices.Web.Services.Controllers
{
    public class CognitiveServicesController : ApiController
    {
        private readonly Client textAnalize;

        public CognitiveServicesController()
            : this(Config.Get<CognitiveServicesConfig>())
        {
        }

        public CognitiveServicesController(CognitiveServicesConfig config)
        {
            this.textAnalize = new Client(config.AylienAppId, config.AylienAppKey);
        }

        [HttpPost]
        public Entities Entities(EntitiesRequest entitiesRequest)
        {
            Entities result = this.textAnalize.Entities(entitiesRequest.Url, entitiesRequest.Text);

            return result;
        }

        [HttpPost]
        public Summarize Summarize(SummarizeRequest summarizeRequest)
        {
            Summarize result =
                this.textAnalize.Summarize(summarizeRequest.Text, summarizeRequest.Title, summarizeRequest.Url, summarizeRequest.Mode, summarizeRequest.SentencesNumber, summarizeRequest.SentencesPercentage);

            return result;
        }

        [HttpPost]
        public Hashtags Hashtags(HashtagsRequest hashtagsRequest)
        {
            Hashtags result = this.textAnalize.Hashtags(hashtagsRequest.Url, hashtagsRequest.Text, hashtagsRequest.Language);

            return result;
        }

        [HttpPost]
        public ClassifyByTaxonomy Classify(ClassifyRequest classifyRequest)
        {
            ClassifyByTaxonomy result = this.textAnalize.ClassifyByTaxonomy(classifyRequest.Taxonomy, classifyRequest.Url, classifyRequest.Text, classifyRequest.Language);

            return result;
        }

        [HttpPost]
        public Sentiment Sentiment(SentimentRequest sentimentRequest)
        {
            Sentiment result =
                this.textAnalize.Sentiment(sentimentRequest.Url, sentimentRequest.Text, sentimentRequest.Mode, sentimentRequest.Language);

            return result;
        }
    }
}
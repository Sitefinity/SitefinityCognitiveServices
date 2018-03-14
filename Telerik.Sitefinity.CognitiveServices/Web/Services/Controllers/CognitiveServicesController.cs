using Aylien.TextApi;
using System.Web.Http;
using Telerik.Sitefinity.CognitiveServices.Web.Services.DTO;

namespace Telerik.Sitefinity.CognitiveServices.Web.Services.Controllers
{
    public class CognitiveServicesController : ApiController
    {
        private readonly Client textAnalize;

        private const string AppId = "9bb3fe6e";
        private const string AppKey = "07b4a1456a3625ad55341126fc22f906";

        public CognitiveServicesController()
        {
            this.textAnalize = new Client(CognitiveServicesController.AppId, CognitiveServicesController.AppKey);
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
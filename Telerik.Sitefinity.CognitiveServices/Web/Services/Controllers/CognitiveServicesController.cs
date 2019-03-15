using Aylien.TextApi;
using System.Web.Http;
using System.Web.Http.Cors;
using Telerik.Sitefinity.CognitiveServices.Configuration;
using Telerik.Sitefinity.CognitiveServices.Web.Services.DTO;
using Telerik.Sitefinity.Configuration;

namespace Telerik.Sitefinity.CognitiveServices.Web.Services.Controllers
{
    // Uncomment for local extension development using: npm start
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "POST", exposedHeaders: "authorization,content-type,x-sf-service-request")]
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
        public IHttpActionResult Entities(EntitiesRequest entitiesRequest)
        {
            Entities result = this.textAnalize.Entities(entitiesRequest.Url, entitiesRequest.Text);
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Summarize(SummarizeRequest summarizeRequest)
        {
            Summarize result =
                this.textAnalize.Summarize(summarizeRequest.Text, summarizeRequest.Title, summarizeRequest.Url, summarizeRequest.Mode, summarizeRequest.SentencesNumber, summarizeRequest.SentencesPercentage);

            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Hashtags(HashtagsRequest hashtagsRequest)
        {
            Hashtags result = this.textAnalize.Hashtags(hashtagsRequest.Url, hashtagsRequest.Text, hashtagsRequest.Language);

            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Classify(ClassifyRequest classifyRequest)
        {
            ClassifyByTaxonomy result = this.textAnalize.ClassifyByTaxonomy(classifyRequest.Taxonomy, classifyRequest.Url, classifyRequest.Text, classifyRequest.Language);

            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult Sentiment(SentimentRequest sentimentRequest)
        {
            Sentiment result =
                this.textAnalize.Sentiment(sentimentRequest.Url, sentimentRequest.Text, sentimentRequest.Mode, sentimentRequest.Language);

            return Ok(result);
        }
    }
}
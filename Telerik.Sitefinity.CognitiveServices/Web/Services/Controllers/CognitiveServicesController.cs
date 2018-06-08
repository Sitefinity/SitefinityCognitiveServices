using Aylien.TextApi;
using System.Net.Http;
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
        [AcceptVerbs("OPTIONS")]
        public IHttpActionResult Entities(EntitiesRequest entitiesRequest)
        {
            if (this.Request.Method == HttpMethod.Options)
            {
                return new OptionsOkResult();
            }

            Entities result = this.textAnalize.Entities(entitiesRequest.Url, entitiesRequest.Text);

            return Ok(result);
        }

        [HttpPost]
        [AcceptVerbs("OPTIONS")]
        public IHttpActionResult Summarize(SummarizeRequest summarizeRequest)
        {
            if (this.Request.Method == HttpMethod.Options)
            {
                return new OptionsOkResult();
            }

            Summarize result =
                this.textAnalize.Summarize(summarizeRequest.Text, summarizeRequest.Title, summarizeRequest.Url, summarizeRequest.Mode, summarizeRequest.SentencesNumber, summarizeRequest.SentencesPercentage);

            return Ok(result);
        }

        [HttpPost]
        [AcceptVerbs("OPTIONS")]
        public IHttpActionResult Hashtags(HashtagsRequest hashtagsRequest)
        {
            if (this.Request.Method == HttpMethod.Options)
            {
                return new OptionsOkResult();
            }

            Hashtags result = this.textAnalize.Hashtags(hashtagsRequest.Url, hashtagsRequest.Text, hashtagsRequest.Language);

            return Ok(result);
        }

        [HttpPost]
        [AcceptVerbs("OPTIONS")]
        public IHttpActionResult Classify(ClassifyRequest classifyRequest)
        {
            if (this.Request.Method == HttpMethod.Options)
            {
                return new OptionsOkResult();
            }

            ClassifyByTaxonomy result = this.textAnalize.ClassifyByTaxonomy(classifyRequest.Taxonomy, classifyRequest.Url, classifyRequest.Text, classifyRequest.Language);

            return Ok(result);
        }

        [HttpPost]
        [AcceptVerbs("OPTIONS")]
        public IHttpActionResult Sentiment(SentimentRequest sentimentRequest)
        {
            if (this.Request.Method == HttpMethod.Options)
            {
                return new OptionsOkResult();
            }

            Sentiment result =
                this.textAnalize.Sentiment(sentimentRequest.Url, sentimentRequest.Text, sentimentRequest.Mode, sentimentRequest.Language);

            return Ok(result);
        }
    }
}
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Telerik.Sitefinity.CognitiveServices.Web.Services
{
    public class OptionsOkResult : IHttpActionResult
    {
        public async Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            //response.Headers.Add("Access-Control-Allow-Headers", "authorization,content-type,x-sf-service-request");

            return response;
        }
    }
}
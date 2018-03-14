using System;
using System.Net.Http;
using System.Net.Http.Headers;
using ServiceStack.Text;
using Telerik.Microsoft.Practices.Unity;
using Telerik.Sitefinity.CognitiveServices.Configuration;
using Telerik.Sitefinity.CognitiveServices.Model;
using Telerik.Sitefinity.Configuration;

namespace Telerik.Sitefinity.CognitiveServices.ServiceClients
{
    public class VisionClient : IVisionClient
    {
        private readonly string subscriptionKey;
        private readonly string serviceUriBase;
        private readonly HttpClient httpClient;

        [InjectionConstructor]
        public VisionClient() : this(Config.Get<CognitiveServicesConfig>(), new HttpClient())
        {
        }

        internal VisionClient(CognitiveServicesConfig config, HttpClient httpClient)
        {
            if (config == null)
            {
                throw new ArgumentNullException("config");
            }

            if (string.IsNullOrWhiteSpace(config.AzureComputerVisionApiServiceUriBase))
            {
                throw new ArgumentNullException("AzureComputerVisionApiServiceUriBase");
            }

            if (string.IsNullOrWhiteSpace(config.AzureComputerVisionApiSubscriptionKey))
            {
                throw new ArgumentNullException("AzureComputerVisionApiSubscriptionKey");
            }

            if (httpClient == null)
            {
                throw new ArgumentNullException("httpClient");
            }

            this.serviceUriBase = config.AzureComputerVisionApiServiceUriBase;
            this.subscriptionKey = config.AzureComputerVisionApiSubscriptionKey;
            this.httpClient = httpClient;
            this.httpClient.BaseAddress = new Uri(this.serviceUriBase, UriKind.Absolute);
            this.DecorateHeaders(this.httpClient, this.subscriptionKey);
        }

        public VisionModel Analyze(byte[] imageContent, string contentHeaderValue = default(string))
        {
            string requestParameters = "visualFeatures=Categories,Tags,Description,Color,Adult&details=Celebrities,Landmarks&language=en";
            string uri = "/vision/v1.0/analyze?" + requestParameters;

            using (ByteArrayContent content = new ByteArrayContent(imageContent))
            {
                // This example uses content type "application/octet-stream".
                // The other content types you can use are "application/json" and "multipart/form-data".
                if (string.IsNullOrEmpty(contentHeaderValue))
                {
                    contentHeaderValue = ServicesConstants.OctetStreamHeader;
                }

                content.Headers.ContentType = new MediaTypeHeaderValue(contentHeaderValue);
                
                // Get the JSON response.
                var response = this.httpClient.PostAsync(uri, content).Result;
                string contentString = response.Content.ReadAsStringAsync().Result;

                var model = this.MapResponceToModel(contentString);

                return model;
            }
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Disposes the managed resources
        /// </summary>
        /// <param name="disposing">Defines whether a disposing is executing now.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.httpClient != null)
                {
                    this.httpClient.Dispose();
                }
            }
        }

        private VisionModel MapResponceToModel(string responseContent)
        {
            var model = JsonSerializer.DeserializeFromString<VisionModel>(responseContent);

            return model;
        }

        private void DecorateHeaders(HttpClient client, string subscriptionKey)
        {
            client.DefaultRequestHeaders.Add(ServicesConstants.SybscriptionKeyHeader, subscriptionKey);
        }
    }
}

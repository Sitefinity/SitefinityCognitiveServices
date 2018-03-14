using System.Configuration;
using Telerik.Sitefinity.Configuration;

namespace Telerik.Sitefinity.CognitiveServices.Configuration
{
    public class CognitiveServicesConfig : ConfigSection
    {
        [ConfigurationProperty("azureComputerVisionApiSubscriptionKey")]
        public string AzureComputerVisionApiSubscriptionKey
        {
            get
            {
                return (string)this["azureComputerVisionApiSubscriptionKey"];
            }
            set
            {
                this["azureComputerVisionApiSubscriptionKey"] = value;
            }
        }

        [ConfigurationProperty("azureComputerVisionApiServiceUriBase")]
        public string AzureComputerVisionApiServiceUriBase
        {
            get
            {
                return (string)this["azureComputerVisionApiServiceUriBase"];
            }
            set
            {
                this["azureComputerVisionApiServiceUriBase"] = value;
            }
        }
    }
}

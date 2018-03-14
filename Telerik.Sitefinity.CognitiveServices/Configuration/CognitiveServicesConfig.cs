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

        [ConfigurationProperty("aylienAppId")]
        public string AylienAppId
        {
            get
            {
                return (string)this["aylienAppId"];
            }
            set
            {
                this["aylienAppId"] = value;
            }
        }

        [ConfigurationProperty("aylienAppKey")]
        public string AylienAppKey
        {
            get
            {
                return (string)this["aylienAppKey"];
            }
            set
            {
                this["aylienAppKey"] = value;
            }
        }
    }
}

using System;
using Telerik.Sitefinity.CognitiveServices.Model;

namespace Telerik.Sitefinity.CognitiveServices.ServiceClients
{
    public interface IVisionClient : IDisposable
    {
        VisionModel Analyze(byte[] imageContent, string contentHeaderValue = default(string));
    }
}

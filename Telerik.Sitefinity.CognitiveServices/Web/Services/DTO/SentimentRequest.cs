namespace Telerik.Sitefinity.CognitiveServices.Web.Services.DTO
{
    public class SentimentRequest
    {
        public string Url { get; set; }

        public string Text { get; set; }

        public string Mode { get; set; }

        public string Language { get; set; }
    }
}

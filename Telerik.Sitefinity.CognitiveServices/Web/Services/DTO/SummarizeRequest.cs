namespace Telerik.Sitefinity.CognitiveServices.Web.Services.DTO
{
    public class SummarizeRequest
    {
        public string Text { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public string Mode { get; set; }

        public int SentencesNumber { get; set; }

        public int SentencesPercentage { get; set; }
    }
}

namespace Telerik.Sitefinity.CognitiveServices.Web.Services.DTO
{
    public class ClassifyRequest
    {
        public string Url { get; set; }

        public string Text { get; set; }

        public string Language { get; set; }

        public string Taxonomy { get; set; }
    }
}
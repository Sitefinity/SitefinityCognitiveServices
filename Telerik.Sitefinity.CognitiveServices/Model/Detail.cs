using System.Collections.Generic;

namespace Telerik.Sitefinity.CognitiveServices.Model
{
    public class Detail
    {
        public IEnumerable<Celebrity> Celebrities { get; set; }

        public IEnumerable<Landmark> Landmarks { get; set; }
    }
}

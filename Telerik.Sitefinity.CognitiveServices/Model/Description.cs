using System.Collections.Generic;

namespace Telerik.Sitefinity.CognitiveServices.Model
{
    public class Description
    {
        public IEnumerable<string> Tags { get; set; }

        public IEnumerable<Caption> Captions { get; set; }
    }
}

using System.Collections.Generic;

namespace Telerik.Sitefinity.CognitiveServices.Model
{
    public class VisionModel
    {
        public Description Description { get; set; }

        public IEnumerable<Category> Categories { get; set; }
  
        public Color Color { get; set; }

        public Adult Adult { get; set; }

        public IEnumerable<Tag> Tags { get; set; }
    }
}

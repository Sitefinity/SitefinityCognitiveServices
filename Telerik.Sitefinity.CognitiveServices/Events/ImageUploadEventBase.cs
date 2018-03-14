using System.IO;
using Telerik.Sitefinity.Services.Events;
using SitefinityModel = Telerik.Sitefinity.Libraries.Model;

namespace Telerik.Sitefinity.CognitiveServices
{
    public abstract class ImageUploadEventBase : IEvent
	{
		private string origin;

		private Stream rawImage;

		public string Origin
		{
			get { return this.origin; }
			set { this.origin = value; }
		}

		public Stream RawImageStream
		{
			get
			{
				return this.rawImage;
			}

			set
			{
				if ((value == null || this.rawImage != null) && this.rawImage != value)
				{
					this.RawImageChanged = true;
				}

				this.rawImage = value;
			}
		}

		public SitefinityModel.Image ImageContentItem { get; set; }

		internal bool RawImageChanged { get; set; }
	}
}
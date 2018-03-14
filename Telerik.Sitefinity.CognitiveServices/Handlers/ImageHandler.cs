using System;
using System.Linq;
using Telerik.Microsoft.Practices.Unity;
using Telerik.Sitefinity.Abstractions;
using Telerik.Sitefinity.CognitiveServices.Processors;
using Telerik.Sitefinity.Services;

namespace Telerik.Sitefinity.CognitiveServices.Handlers
{
    public class ImageHandler : IDisposable
    {
        private bool disposedValue = false;

        public void Initialzie()
        {
            EventHub.Unsubscribe<ImageUploadingEvent>(this.HandleImageUploadingEvent);
            EventHub.Subscribe<ImageUploadingEvent>(this.HandleImageUploadingEvent);
        }

        private void HandleImageUploadingEvent(ImageUploadingEvent imageUploadingEvent)
        {
            if (imageUploadingEvent == null)
            {
                throw new ArgumentNullException("imageUploadingEvent");
            }

            var cognitiveImageProcessors = ObjectFactory.Container.ResolveAll<ICognitiveImageProcessor>();
            if (cognitiveImageProcessors != null && cognitiveImageProcessors.Any())
            {
                foreach (ICognitiveImageProcessor cognitiveImageProcessor in cognitiveImageProcessors)
                {
                    if (cognitiveImageProcessor.CanProcess())
                    {
                        cognitiveImageProcessor.Process(imageUploadingEvent.ImageContentItem, imageUploadingEvent.RawImageStream);
                    }
                }
            }
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposedValue)
            {
                return;
            }

            if (disposing)
            {
                EventHub.Unsubscribe<ImageUploadingEvent>(this.HandleImageUploadingEvent);
                disposedValue = true;
            }
        }
    }
}

using System;
using System.IO;
using Telerik.Sitefinity.Libraries.Model;
using Telerik.Sitefinity.Modules.Libraries.Data;
using Telerik.Sitefinity.Services;

namespace Telerik.Sitefinity.CognitiveServices.Providers
{
    public class CustomOpenAccessLibrariesProvider : OpenAccessLibrariesProvider
    {
        protected virtual void OnImageUploading(ImageUploadingEvent eventArgs)
        {
            if (eventArgs == null)
            {
                throw new ArgumentException("eventArgs");
            }

            EventHub.Raise(eventArgs);
        }

        protected virtual void OnImageUploaded(ImageUploadedEvent eventArgs)
        {
            if (eventArgs == null)
            {
                throw new ArgumentException("eventArgs");
            }

            EventHub.Raise(eventArgs);
        }

        public override void Upload(MediaContent content, Stream source, string extension, bool uploadAndReplace)
        {
            if (content is Image)
            {
                ImageUploadingEvent eventArgs = new ImageUploadingEvent
                {
                    RawImageStream = source,
                    ImageContentItem = content as Image
                };

                this.OnImageUploading(eventArgs);

                if (eventArgs.RawImageChanged)
                {
                    // Using a temp MemoryStream in order to prevent a closing/disposing
                    // the Stream or Image (image obj which has been created from that stream and in case of disposing the image it will also dispose the stream)
                    // earlier and causing a "A generic error occurred in GDI+" exception.
                    using (MemoryStream tempStream = new MemoryStream())
                    {
                        eventArgs.RawImageStream.CopyTo(tempStream);
                        base.Upload(content, tempStream, extension);
                    }

                    this.OnImageUploaded(new ImageUploadedEvent()
                    {
                        RawImageStream = eventArgs.RawImageStream,
                        ImageContentItem = content as Image
                    });

                    return;
                }
            }

            base.Upload(content, source, extension, uploadAndReplace);
        }
    }
}
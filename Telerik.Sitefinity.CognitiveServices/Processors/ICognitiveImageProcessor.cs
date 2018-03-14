using System.IO;
using Telerik.Sitefinity.Libraries.Model;

namespace Telerik.Sitefinity.CognitiveServices.Processors
{
    /// <summary>
    /// Interface for cognitive processors in Sitefinity.
    /// </summary>
    public interface ICognitiveImageProcessor
    {
        /// <summary>
        /// Determines whether this instance can process the provided media content.
        /// </summary>
        /// <returns>
        ///   <c>true</c> if this instance can process; otherwise, <c>false</c>.
        /// </returns>
        bool CanProcess();

        /// <summary>
        /// Processes the specified content.
        /// </summary>
        /// <param name="content">The content.</param>
        /// <param name="sourceStream">The source stream.</param>
        void Process(Image content, Stream sourceStream);
    }
}

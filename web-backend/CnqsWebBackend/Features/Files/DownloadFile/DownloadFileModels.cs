using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.DownloadFile;

[UsedImplicitly]
public class DownloadFileRequest
{
    public required Guid FileId { get; set; }
}

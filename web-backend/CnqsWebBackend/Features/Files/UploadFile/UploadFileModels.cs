using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.UploadFile;

[UsedImplicitly]
public class UploadFileRequest
{
    public required IFormFile File { get; set; }
    public bool? AutoShare { get; set; }
}

public class UploadFileResponse
{
    public required string ViewUrl { get; set; }
    public string? ShareUrl { get; set; }
}

using FastEndpoints;
using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.UploadFile;

[UsedImplicitly]
public class UploadFileEndpoint : Endpoint<UploadFileRequest, UploadFileResponse>
{
    public override void Configure()
    {
        Post("/api/upload");
        AllowAnonymous();
        AllowFileUploads();
    }

    public override Task HandleAsync(UploadFileRequest req, CancellationToken ct)
    {
        bool autoShare = req.AutoShare ?? false;
        Guid fileGuid = Guid.NewGuid();

        Response = new UploadFileResponse
        {
            ViewUrl = $"https://example.com/files/{fileGuid}/{req.File.FileName}",
            ShareUrl = autoShare ? $"https://example.com/l/{fileGuid}" : null,
        };

        return Task.CompletedTask;
    }
}

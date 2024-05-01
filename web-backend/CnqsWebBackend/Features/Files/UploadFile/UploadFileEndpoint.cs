using FastEndpoints;
using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.UploadFile;

[UsedImplicitly]
public class UploadFileEndpoint : Endpoint<UploadFileRequest, UploadFileResponse>
{
    public required DummyFileService FileService { private get; [UsedImplicitly] init; }

    public override void Configure()
    {
        Post("/api/upload");
        AllowAnonymous();
        AllowFileUploads();
    }

    public override async Task HandleAsync(UploadFileRequest req, CancellationToken ct)
    {
        bool autoShare = req.AutoShare ?? false;
        Guid fileGuid = Guid.NewGuid();
        string fileName = req.File.FileName;

        await FileService.StoreFile(fileGuid, fileName, req.File.OpenReadStream(), ct);

        Response = new UploadFileResponse
        {
            ViewUrl = $"https://example.com/files/{fileGuid}/{fileName}",
            ShareUrl = autoShare ? $"https://example.com/l/{fileGuid}" : null,
        };
    }
}

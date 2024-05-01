using FastEndpoints;
using JetBrains.Annotations;
using Microsoft.AspNetCore.StaticFiles;

namespace CnqsWebBackend.Features.Files.DownloadFile;

public class DownloadFileEndpoint : Endpoint<DownloadFileRequest>
{
    public required DummyFileService FileService { private get; [UsedImplicitly] init; }
    private static readonly FileExtensionContentTypeProvider ContentTypeProvider = new();

    public override void Configure()
    {
        Get("/l/{FileId}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(DownloadFileRequest req, CancellationToken ct)
    {
        FileInfo fileInfo = FileService.GetFileForRead(req.FileId);
        ContentTypeProvider.TryGetContentType(fileInfo.Name, out string? contentType);

        // await SendFileAsync(fileInfo, contentType: contentType ?? "application/octet-stream", cancellation: ct);
        await SendStreamAsync(fileInfo.OpenRead(), contentType: contentType ?? "application/octet-stream", cancellation: ct);
    }
}

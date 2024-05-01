using FastEndpoints;
using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.ListFiles;

public class ListFilesEndpoint : EndpointWithoutRequest<ListFilesResponse>
{
    public required DummyFileService FileService { private get; [UsedImplicitly] init; }

    public override void Configure()
    {
        Get("/api/files");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        (Guid Id, string Name)[] storedFiles = await FileService.GetStoredFiles(ct);
        HttpRequest request = HttpContext.Request;

        Response = new ListFilesResponse
        {
            Files = storedFiles
                .Select(tuple =>
                {
                    UriBuilder uriBuilder = new()
                    {
                        Scheme = request.Scheme,
                        Host = request.Host.Host,
                        Path = $"/l/{tuple.Id}"
                    };

                    if (request.Host.Port.HasValue)
                    {
                        uriBuilder.Port = request.Host.Port.Value;
                    }

                    return new ListFilesFileModel
                    {
                        FileName = tuple.Name,
                        ShareLink = uriBuilder.Uri.ToString(),
                    };
                })
                .ToArray(),
        };
    }
}
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

        Response = new ListFilesResponse
        {
            Files = storedFiles
                .Select(tuple => new ListFilesFileModel
                {
                    FileName = tuple.Name,
                    ShareLink = $"https://example.com/l/{tuple.Id}",
                })
                .ToArray(),
        };
    }
}

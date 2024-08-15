using CnqsWebBackend.Data;
using CnqsWebBackend.Features.Files.Data;
using FastEndpoints;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace CnqsWebBackend.Features.Files.ListFiles;

public class ListFilesEndpoint : EndpointWithoutRequest<ListFilesResponse>
{
    public required ApplicationDbContext DbContext { private get; [UsedImplicitly] init; }

    public override void Configure()
    {
        Get("/api/files");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        FileEntity[] fileEntities = await DbContext.Files
            .OrderByDescending(file => file.CreatedAt)
            .ToArrayAsync(ct);

        Response = new ListFilesResponse
        {
            Files = fileEntities
                .Select(entity => new ListFilesFileModel
                {
                    FileId = entity.Id,
                    FileName = entity.DisplayName,
                })
                .ToArray(),
        };
    }
}

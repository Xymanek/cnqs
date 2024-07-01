using CnqsWebBackend.Data;
using CnqsWebBackend.Features.Files.Data;
using FastEndpoints;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CnqsWebBackend.Features.Files.UpdateDisplayName;

[UsedImplicitly]
public class UpdateDisplayNameEndpoint : Endpoint<UpdateDisplayNameRequest, Results<NoContent, NotFound>>
{
    public override void Configure()
    {
        Put("/api/files/{FileId}/display-name");
        AllowAnonymous();
    }

    public required ApplicationDbContext DbContext { private get; [UsedImplicitly] init; }

    public override async Task HandleAsync(UpdateDisplayNameRequest req, CancellationToken ct)
    {
        Guid fileId = Route<Guid>("FileId");

        FileEntity? file = await DbContext.Files
            .Where(file => file.Id == fileId)
            .SingleOrDefaultAsync(ct);

        if (file == null)
        {
            Response = TypedResults.NotFound();
            return;
        }

        file.DisplayName = req.NewDisplayName;
        await DbContext.SaveChangesAsync(ct);

        Response = TypedResults.NoContent();
    }
}
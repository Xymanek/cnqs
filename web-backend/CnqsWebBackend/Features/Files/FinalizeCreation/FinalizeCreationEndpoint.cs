using System.Net;
using Amazon.S3;
using Amazon.S3.Model;
using CnqsWebBackend.Data;
using CnqsWebBackend.Features.Files.Data;
using CnqsWebBackend.Features.Files.Infra;
using FastEndpoints;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CnqsWebBackend.Features.Files.FinalizeCreation;

[UsedImplicitly]
public class FinalizeCreationEndpoint : Endpoint<FinalizeCreationRequest, Results<NoContent, NotFound>>
{
    public override void Configure()
    {
        Post("/api/files/{FileId}/finalize-creation");
        AllowAnonymous();
    }

    public required IFinalizationTicketProtector FinalizationTicketProtector { private get; init; }
    public required IOptions<FileStorageOptions> StorageOptions { private get; init; }
    public required IFileObjectKeyGenerator KeyGenerator { private get; init; }
    public required ApplicationDbContext DbContext { private get; init; }
    public required IAmazonS3 S3 { private get; init; }

    public override async Task HandleAsync(FinalizeCreationRequest request, CancellationToken ct)
    {
        Guid fileId = Route<Guid>("FileId");

        Guid unprotectedTicket;
        try
        {
            unprotectedTicket = FinalizationTicketProtector.UnprotectTicket(request.FinalizationTicket);
        }
        catch (ConfirmationTicketUnprotectionFailedException e)
        {
            Logger.LogTrace(e, "UnprotectTicket failed");
            ThrowError("Invalid ticket");
            return;
        }

        if (unprotectedTicket != fileId)
        {
            Logger.LogTrace("Ticket value does not match file id");
            ThrowError("Invalid ticket");
            return;
        }

        FileEntity? fileEntity = await DbContext.Files
            .SingleOrDefaultAsync(f => f.Id == fileId, cancellationToken: ct);

        if (fileEntity == null)
        {
            Response = TypedResults.NotFound();
            return;
        }

        try
        {
            await S3.GetObjectMetadataAsync(new GetObjectMetadataRequest
            {
                BucketName = StorageOptions.Value.Bucket,
                Key = KeyGenerator.GetRawFileKey(fileEntity.Id, fileEntity.FileNameWithExtension),
            }, ct);
        }
        catch (AmazonS3Exception e) when (e.StatusCode == HttpStatusCode.NotFound)
        {
            ThrowError("File is not uploaded");
            return;
        }

        fileEntity.StoreStatus = FileStoreStatus.Completed;
        await DbContext.SaveChangesAsync(ct);

        Response = TypedResults.NoContent();
    }
}
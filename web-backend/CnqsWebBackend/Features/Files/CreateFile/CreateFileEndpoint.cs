using Amazon.S3;
using Amazon.S3.Model;
using CnqsWebBackend.Data;
using CnqsWebBackend.Features.Files.Data;
using CnqsWebBackend.Features.Files.Infra;
using EntityFramework.Exceptions.Common;
using FastEndpoints;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NodaTime;

namespace CnqsWebBackend.Features.Files.CreateFile;

[UsedImplicitly]
public class CreateFileEndpoint : Endpoint<CreateFileRequest, CreateFileResponse>
{
    public override void Configure()
    {
        Post("/api/files");
        AllowAnonymous();
    }

    public required IOptions<FileStorageOptions> StorageOptions { private get; init; }
    public required IFileObjectKeyGenerator KeyGenerator { private get; init; }
    public required ApplicationDbContext DbContext { private get; init; }
    public required IAmazonS3 S3 { private get; init; }
    public required IClock Clock { private get; init; }

    public override async Task HandleAsync(CreateFileRequest req, CancellationToken ct)
    {
        FileEntity fileEntity = new()
        {
            ClientId = req.ClientFileId,

            FileNameWithExtension = req.FileNameWithExtension,
            DisplayName = req.DisplayName,

            CreatedAt = Clock.GetCurrentInstant(),

            StoreStatus = FileStoreStatus.Pending,
        };
        DbContext.Files.Add(fileEntity);

        try
        {
            await DbContext.SaveChangesAsync(ct);
        }
        catch (UniqueConstraintException e) when (e.ConstraintProperties is [nameof(FileEntity.ClientId)])
        {
            DbContext.Files.Remove(fileEntity);

            fileEntity = await DbContext.Files
                .SingleAsync(entity => entity.ClientId == req.ClientFileId, ct);

            if (fileEntity.StoreStatus != FileStoreStatus.Pending)
            {
                AddError(r => r.ClientFileId, "File is no longer pending; creation/upload cannot be repeated");
            }

            if (fileEntity.FileNameWithExtension != req.FileNameWithExtension)
            {
                AddError(r => r.FileNameWithExtension, "File record was already created, filename cannot be changed");
            }

            ThrowIfAnyErrors();
        }

        DateTimeOffset uploadUrlExpires = Clock.GetCurrentInstant().Plus(Duration.FromHours(1)).ToDateTimeOffset();
        string uploadUrl = await S3.GetPreSignedURLAsync(new GetPreSignedUrlRequest
        {
            BucketName = StorageOptions.Value.Bucket,
            Key = KeyGenerator.GetRawFileKey(fileEntity.Id, req.FileNameWithExtension),
            Verb = HttpVerb.PUT,
            Expires = uploadUrlExpires.UtcDateTime,
            Protocol = S3.Config.UseHttp ? Protocol.HTTP : Protocol.HTTPS,
            ContentType = req.ContentType,
        });

        Response = new CreateFileResponse
        {
            Id = fileEntity.Id,
            UploadUrl = uploadUrl,
            UploadUrlExpires = uploadUrlExpires,
        };
    }
}
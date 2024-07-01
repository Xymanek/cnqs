using Amazon.S3;
using Amazon.S3.Model;
using CnqsWebBackend.Data;
using CnqsWebBackend.Features.Files.Data;
using CnqsWebBackend.Features.Files.Infra;
using FastEndpoints;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NodaTime;

namespace CnqsWebBackend.Features.Files.ListFiles;

public class ListFilesEndpoint : EndpointWithoutRequest<ListFilesResponse>
{
    public required IOptions<FileStorageOptions> StorageOptions { private get; [UsedImplicitly] init; }
    public required IFileObjectKeyGenerator KeyGenerator { private get; [UsedImplicitly] init; }
    public required ApplicationDbContext DbContext { private get; [UsedImplicitly] init; }
    public required IAmazonS3 S3 { private get; [UsedImplicitly] init; }
    public required IClock Clock { private get; [UsedImplicitly] init; }

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
            Files = await Task.WhenAll(
                fileEntities
                    .Select(entity => Task.Run(async () =>
                    {
                        DateTimeOffset downloadUrlExpires = Clock.GetCurrentInstant()
                            .Plus(Duration.FromMinutes(15))
                            .ToDateTimeOffset();

                        // TODO: /l/{fileId} link instead
                        string uploadUrl = await S3.GetPreSignedURLAsync(new GetPreSignedUrlRequest
                        {
                            BucketName = StorageOptions.Value.Bucket,
                            Key = KeyGenerator.GetRawFileKey(entity.Id, entity.FileNameWithExtension),
                            Verb = HttpVerb.GET,
                            Expires = downloadUrlExpires.UtcDateTime,
                            Protocol = S3.Config.UseHttp ? Protocol.HTTP : Protocol.HTTPS,
                        });

                        return new ListFilesFileModel
                        {
                            FileName = entity.DisplayName,
                            ShareLink = uploadUrl,
                        };
                    }, ct))),
        };
    }
}
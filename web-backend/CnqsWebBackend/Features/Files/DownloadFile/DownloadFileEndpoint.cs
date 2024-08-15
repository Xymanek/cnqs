using Amazon.S3;
using Amazon.S3.Model;
using CnqsWebBackend.Data;
using CnqsWebBackend.Features.Files.Data;
using CnqsWebBackend.Features.Files.Infra;
using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NodaTime;

namespace CnqsWebBackend.Features.Files.DownloadFile;

public class DownloadFileEndpoint : Endpoint<DownloadFileRequest, Results<NotFound, RedirectHttpResult>>
{
    public required IOptions<FileStorageOptions> StorageOptions { private get; init; }
    public required IFileObjectKeyGenerator KeyGenerator { private get; init; }
    public required ApplicationDbContext DbContext { private get; init; }
    public required IAmazonS3 S3 { private get; init; }
    public required IClock Clock { private get; init; }

    public override void Configure()
    {
        Get("/api/files/{fileId}/content");
        AllowAnonymous();
    }

    public override async Task<Results<NotFound, RedirectHttpResult>> ExecuteAsync(
        DownloadFileRequest req, CancellationToken ct
    )
    {
        FileEntity? file = await DbContext.Files
            .Where(file => file.Id == req.FileId)
            .SingleOrDefaultAsync(ct);
        
        if (file == null)
        {
            return TypedResults.NotFound();
        }

        DateTimeOffset urlExpires = Clock.GetCurrentInstant()
            .Plus(Duration.FromMinutes(15))
            .ToDateTimeOffset();

        string downloadUrl = await S3.GetPreSignedURLAsync(new GetPreSignedUrlRequest
        {
            BucketName = StorageOptions.Value.Bucket,
            Key = KeyGenerator.GetRawFileKey(file.Id, file.FileNameWithExtension),
            Verb = HttpVerb.GET,
            Expires = urlExpires.UtcDateTime,
            Protocol = S3.Config.UseHttp ? Protocol.HTTP : Protocol.HTTPS,
        });

        return TypedResults.Redirect(downloadUrl);
    }
}

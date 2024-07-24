using System.Data.Common;
using Amazon.S3;
using CnqsWebBackend.Data;
using FastEndpoints.Testing;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.Memory;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using Respawn;
using Testcontainers.Minio;
using Testcontainers.PostgreSql;

namespace CnqsWebBackend.Tests;

[UsedImplicitly]
[DisableWafCache] // I need to find a better way to do db migrations while keeping the WAF cache
public class CnqsBackendApp : AppFixture<Program>
{
    private readonly PostgreSqlContainer _postgres = new PostgreSqlBuilder()
        .Build();
    
    private readonly MinioContainer _minio = new MinioBuilder()
        .Build();

    private const string BucketName = "cnqs";

    protected override async Task PreSetupAsync()
    {
        await _postgres.StartAsync();
        await _minio.StartAsync();
    }

    protected override void ConfigureApp(IWebHostBuilder a)
    {
        a.ConfigureAppConfiguration(config =>
        {
            config.Add(new MemoryConfigurationSource
            {
                InitialData = GetAppConfiguration()
                    .Select(tuple => new KeyValuePair<string, string?>(tuple.Item1, tuple.Item2)),
            });
        });
    }

    private IEnumerable<(string, string?)> GetAppConfiguration()
    {
        yield return ("ConnectionStrings:Default", _postgres.GetConnectionString());
        
        yield return ("App:FileStorage:Endpoint", _minio.GetConnectionString());
        yield return ("App:FileStorage:PublicEndpoint", _minio.GetConnectionString());
        yield return ("App:FileStorage:InternalEndpoint", _minio.GetConnectionString());
        yield return ("App:FileStorage:ForcePathStyle", true.ToString());
        yield return ("App:FileStorage:AccessKey", _minio.GetAccessKey());
        yield return ("App:FileStorage:SecretKey", _minio.GetSecretKey());
        yield return ("App:FileStorage:Bucket", BucketName);
    }

    private Respawner? _respawner;

    protected override async Task SetupAsync()
    {
        await MigrateDb();
        await SetupRespawner();
        
        await CreateBucketAsync();
    }

    private async Task CreateBucketAsync()
    {
        IAmazonS3 s3 = Server.Services.GetRequiredService<IAmazonS3>();
        await s3.PutBucketAsync(BucketName);
    }

    private async Task SetupRespawner()
    {
        await using DbConnection connection = await GetOpenDbConnection();
        _respawner = await Respawner.CreateAsync(connection, new RespawnerOptions
        {
            DbAdapter = DbAdapter.Postgres,
            SchemasToInclude =
            [
                "public"
            ],
        });
    }

    private async Task MigrateDb()
    {
        await using AsyncServiceScope asyncScope = Server.Services.CreateAsyncScope();
        ApplicationDbContext dbContext = asyncScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        await dbContext.Database.MigrateAsync();
    }

    protected override async Task TearDownAsync()
    {
        await _postgres.StopAsync();
        await _minio.StopAsync();
    }

    public async Task ResetDb()
    {
        await using DbConnection connection = await GetOpenDbConnection();
        await _respawner!.ResetAsync(connection);
    }

    private async Task<DbConnection> GetOpenDbConnection()
    {
        NpgsqlConnection connection = new(_postgres.GetConnectionString());
        await connection.OpenAsync();
        
        return connection;
    }
}
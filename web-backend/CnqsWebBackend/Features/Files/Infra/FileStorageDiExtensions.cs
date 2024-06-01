using Amazon.Runtime;
using Amazon.S3;
using CnqsWebBackend.Features.Files.Infra;
using Microsoft.Extensions.Options;

// ReSharper disable once CheckNamespace
namespace CnqsWebBackend.DiExtensions;

public static class FileStorageDiExtensions
{
    public static void AddCnqsFileStorage(this IServiceCollection services)
    {
        services
            .AddOptions<FileStorageOptions>()
            .BindConfiguration("App:FileStorage");

        services.AddSingleton<IAmazonS3>(provider =>
        {
            FileStorageOptions options = provider.GetRequiredService<IOptionsMonitor<FileStorageOptions>>()
                .CurrentValue;

            return new AmazonS3Client(
                new BasicAWSCredentials(options.AccessKey, options.SecretKey),
                new AmazonS3Config
                {
                    ForcePathStyle = options.ForcePathStyle,
                    
                    ServiceURL = options.Endpoint,
                    UseHttp = new Uri(options.Endpoint).Scheme == "http",
                }
            );
        });
    }
}
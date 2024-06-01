namespace CnqsWebBackend.Features.Files.Infra;

public class FileStorageOptions
{
    public required string Endpoint { get; set; }
    public bool ForcePathStyle { get; set; }

    public required string AccessKey { get; set; }
    public required string SecretKey { get; set; }
    
    public required string Bucket { get; set; }
}
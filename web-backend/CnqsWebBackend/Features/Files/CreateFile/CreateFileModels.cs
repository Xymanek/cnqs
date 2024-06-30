using System.ComponentModel.DataAnnotations;

namespace CnqsWebBackend.Features.Files.CreateFile;

public class CreateFileRequest
{
    public required Guid ClientFileId { get; set; }
    public required string ContentType { get; set; }

    [MaxLength(250)] public required string FileNameWithExtension { get; set; }
    [MaxLength(250)] public required string DisplayName { get; set; }
}

public class CreateFileResponse
{
    public required Guid Id { get; set; }
    public required string UploadUrl { get; set; }
    public required DateTimeOffset UploadUrlExpires { get; set; }
}
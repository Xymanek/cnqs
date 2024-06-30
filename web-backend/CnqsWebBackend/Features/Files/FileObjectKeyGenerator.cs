namespace CnqsWebBackend.Features.Files;

public interface IFileObjectKeyGenerator
{
    string GetRawFileKey(Guid fileId, string fileName);
}

[RegisterSingleton]
public class FileObjectKeyGenerator : IFileObjectKeyGenerator
{
    // TODO: validate raw file name?
    public string GetRawFileKey(Guid fileId, string fileName)
        => $"{fileId}/{fileName}";
}
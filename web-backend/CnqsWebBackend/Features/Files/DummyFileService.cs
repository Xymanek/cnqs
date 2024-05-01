namespace CnqsWebBackend.Features.Files;

[RegisterSingleton]
public class DummyFileService
{
    private readonly string _storageDirectory = Path.Combine(Environment.CurrentDirectory, "UploadedFiles");

    public async ValueTask StoreFile(Guid fileGuid, string fileName, Stream content, CancellationToken ct = default)
    {
        string fileDirectory = Path.Combine(_storageDirectory, fileGuid.ToString());
        string filePath = Path.Combine(fileDirectory, fileName);

        Directory.CreateDirectory(fileDirectory);

        await using FileStream fs = File.Create(filePath);
        await content.CopyToAsync(fs, ct);
    }

    public ValueTask<(Guid Id, string Name)[]> GetStoredFiles(CancellationToken ct = default)
    {
        return ValueTask.FromResult(GatherFiles().ToArray());
    }

    private IEnumerable<(Guid Id, string Name)> GatherFiles()
    {
        foreach (string directoryPath in Directory.EnumerateDirectories(_storageDirectory))
        {
            string directoryName = Path.GetFileName(directoryPath);
            Guid guid = Guid.Parse(directoryName);

            string filePath = Directory.EnumerateFiles(directoryPath).Single();

            yield return (guid, Path.GetFileName(filePath));
        }
    }

    public Stream GetFileForRead(Guid fileId)
    {
        string fileDirectory = Path.Combine(_storageDirectory, fileId.ToString());
        string fileName = Directory.EnumerateFiles(fileDirectory).Single();
        string filePath = Path.Combine(fileDirectory, fileName);

        return File.OpenRead(filePath);
    }
}

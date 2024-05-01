namespace CnqsWebBackend.Features.Files.ListFiles;

public class ListFilesResponse
{
    public required IList<ListFilesFileModel> Files { get; set; }
}

public class ListFilesFileModel
{
    public required string FileName { get; set; }
    public required string ShareLink { get; set; }
}



namespace CnqsWebBackend.Features.Files;

public enum FileStoreStatus
{
    /// <summary>
    /// File record was created successfully in the database but the contents were not uploaded yet.
    /// </summary>
    Pending,
    
    /// <summary>
    /// Object storage reported that the file contents were uploaded successfully.
    /// </summary>
    Completed,
}
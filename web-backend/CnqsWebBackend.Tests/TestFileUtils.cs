using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.StaticFiles;

namespace CnqsWebBackend.Tests;

public static class TestFileUtils
{
    public static string GetFilePath(string file, [CallerFilePath] string sourceFilePath = "")
    {
        string? directoryPath = Path.GetDirectoryName(sourceFilePath);
        return Path.Join(directoryPath, file);
    }

    public static StreamContent GetFileAsHttpContent(string file, [CallerFilePath] string sourceFilePath = "")
    {
        // ReSharper disable once ExplicitCallerInfoArgument - retain the original caller
        FileStream stream = File.OpenRead(GetFilePath(file, sourceFilePath));

        StreamContent fileContent = new(stream);
        TrySetContentTypeByExtension(file, fileContent);

        return fileContent;
    }

    private static bool TrySetContentTypeByExtension(string fileName, HttpContent content)
    {
        if (ContentTypeProvider.TryGetContentType(fileName, out string? contentType))
        {
            content.Headers.ContentType = MediaTypeHeaderValue.Parse(contentType);
            return true;
        }

        return false;
    }

    private static readonly FileExtensionContentTypeProvider ContentTypeProvider = new();
}
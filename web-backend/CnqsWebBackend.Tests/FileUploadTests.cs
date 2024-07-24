using System.Net;
using CnqsWebBackend.Features.Files.CreateFile;
using FastEndpoints;
using FastEndpoints.Testing;
using FluentAssertions;

namespace CnqsWebBackend.Tests;

public class FileUploadTests(CnqsBackendApp App) : TestBase<CnqsBackendApp>
{
    [Fact]
    public async Task Create_File_Valid()
    {
        var (rsp, res) = await App.Client.POSTAsync<CreateFileEndpoint, CreateFileRequest, CreateFileResponse>(new()
        {
            ClientFileId = Guid.Parse("3874108e-fab3-4d6f-a15b-9558178491a2"),
            ContentType = "image/apng",
            FileNameWithExtension = "test.png",
            DisplayName = "test.png",
        });

        rsp.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Create_File_Valid2()
    {
        var (rsp, res) = await App.Client.POSTAsync<CreateFileEndpoint, CreateFileRequest, CreateFileResponse>(new()
        {
            ClientFileId = Guid.Parse("3874108e-fab3-4d6f-a15b-9558178491a2"),
            ContentType = "image/apng",
            FileNameWithExtension = "test.png",
            DisplayName = "test.png"
        });

        rsp.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}
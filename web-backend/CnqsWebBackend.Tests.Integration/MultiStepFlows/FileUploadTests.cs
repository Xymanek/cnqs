using System.Net;
using CnqsWebBackend.Features.Files.CreateFile;
using CnqsWebBackend.Features.Files.FinalizeCreation;
using FastEndpoints;
using FastEndpoints.Testing;
using FluentAssertions;
using JetBrains.Annotations;

namespace CnqsWebBackend.Tests.Integration.MultiStepFlows;

[TestSubject(typeof(CreateFileEndpoint))]
[TestSubject(typeof(FinalizeCreationEndpoint))]
[Collection(CnqsBackendAppCollection.Name)]
public class FileUploadTests(CnqsBackendApp App) : TestBase<CnqsBackendApp>
{
    protected override async Task TearDownAsync()
    {
        await App.ResetDb();
    }

    [Fact]
    public async Task Create_File_Valid()
    {
        StreamContent uploadContent = TestFileUtils.GetFileAsHttpContent("Space_free.png");

        var (createRsp, createRes) = await App.Client.POSTAsync<
            CreateFileEndpoint, CreateFileRequest, CreateFileResponse
        >(new()
        {
            ClientFileId = Guid.Parse("3874108e-fab3-4d6f-a15b-9558178491a2"),
            ContentType = uploadContent.Headers.ContentType!.ToString(),
            FileNameWithExtension = "Space_free.png",
            DisplayName = "Space_free.png",
        });

        createRsp.StatusCode.Should().Be(HttpStatusCode.OK);
        createRes.UploadUrl.Should().NotBeNullOrEmpty();
        createRes.FinalizationTicket.Should().NotBeNullOrEmpty();

        using (HttpClient client = new())
        {
            HttpResponseMessage uploadResponse = await client.PutAsync(
                createRes.UploadUrl, uploadContent
            );

            uploadResponse.IsSuccessStatusCode.Should().BeTrue();
        }

        var (finalizeRsp, _) = await App.Client.POSTAsync<FinalizeCreationRequest, EmptyResponse>(
            $"/api/files/{createRes.Id}/finalize-creation",
            new FinalizeCreationRequest
            {
                FinalizationTicket = createRes.FinalizationTicket,
            }
        );

        finalizeRsp.StatusCode.Should().Be(HttpStatusCode.OK);
    }
}

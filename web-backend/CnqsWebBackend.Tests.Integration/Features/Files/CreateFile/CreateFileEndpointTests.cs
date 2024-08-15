using System.Net;
using System.Net.Http.Json;
using CnqsWebBackend.Data;
using CnqsWebBackend.Features.Files;
using CnqsWebBackend.Features.Files.CreateFile;
using CnqsWebBackend.Features.Files.Data;
using FastEndpoints;
using FastEndpoints.Testing;
using FluentAssertions;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using NodaTime;

namespace CnqsWebBackend.Tests.Integration.Features.Files.CreateFile;

[TestSubject(typeof(CreateFileEndpoint))]
[Collection(CnqsBackendAppCollection.Name)]
public class CreateFileEndpointTests(CnqsBackendApp App) : TestBase<CnqsBackendApp>
{
    protected override async Task TearDownAsync()
    {
        await App.ResetDb();
    }

    [Fact]
    public async Task Idempotent()
    {
        var (createRsp1, createRes1) = await App.Client.POSTAsync<
            CreateFileEndpoint, CreateFileRequest, CreateFileResponse
        >(new()
        {
            ClientFileId = Guid.Parse("3874108e-fab3-4d6f-a15b-9558178491a2"),
            ContentType = "image/apng",
            FileNameWithExtension = "test.png",
            DisplayName = "test.png",
        });

        var (createRsp2, createRes2) = await App.Client.POSTAsync<
            CreateFileEndpoint, CreateFileRequest, CreateFileResponse
        >(new()
        {
            ClientFileId = Guid.Parse("3874108e-fab3-4d6f-a15b-9558178491a2"),
            ContentType = "image/apng",
            FileNameWithExtension = "test.png",
            DisplayName = "test.png",
        });

        createRsp1.StatusCode.Should().Be(HttpStatusCode.OK);
        createRsp2.StatusCode.Should().Be(HttpStatusCode.OK);

        createRes1.Id.Should().Be(createRes2.Id);
    }

    [Fact]
    public async Task CannotCallOnFinalizedFile()
    {
        Guid clientId = new("ADB22DB7-A1DA-4B5F-A4EC-1CDF0C87D724");
        Guid backendId = new("90530992-1756-4B43-B3F3-5083820BE6D8");
        
        // Record the file as created
        await using (AsyncServiceScope asyncScope = App.Services.CreateAsyncScope())
        {
            ApplicationDbContext dbContext = asyncScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            dbContext.Files.Add(new FileEntity
            {
                Id = backendId,
                ClientId = clientId,

                FileNameWithExtension = "test.png",
                DisplayName = "test.png",

                CreatedAt = Instant.FromUtc(2024, 1, 1, 00, 00),
                StoreStatus = FileStoreStatus.Completed,
            });
            await dbContext.SaveChangesAsync();
        }
        
        var (createRsp, _) = await App.Client.POSTAsync<
            CreateFileEndpoint, CreateFileRequest, CreateFileResponse
        >(new()
        {
            ClientFileId = clientId,
            ContentType = "image/apng",
            FileNameWithExtension = "test.png",
            DisplayName = "test.png",
        });

        createRsp.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        ValidationProblemDetails details = (await createRsp.Content.ReadFromJsonAsync<ValidationProblemDetails>())!;
        details.Errors.Should().Contain(pair =>
            pair.Key == "clientFileId" &&
            pair.Value.Contains("File is no longer pending; creation/upload cannot be repeated")
        );
    }
    
    [Fact]
    public async Task CannotChangeFileName()
    {
        Guid clientId = new("ADB22DB7-A1DA-4B5F-A4EC-1CDF0C87D724");
        Guid backendId = new("90530992-1756-4B43-B3F3-5083820BE6D8");
        
        // Record the file as created
        await using (AsyncServiceScope asyncScope = App.Services.CreateAsyncScope())
        {
            ApplicationDbContext dbContext = asyncScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            dbContext.Files.Add(new FileEntity
            {
                Id = backendId,
                ClientId = clientId,

                FileNameWithExtension = "test.png",
                DisplayName = "test.png",

                CreatedAt = Instant.FromUtc(2024, 1, 1, 00, 00),
                StoreStatus = FileStoreStatus.Pending,
            });
            await dbContext.SaveChangesAsync();
        }
        
        var (createRsp, _) = await App.Client.POSTAsync<
            CreateFileEndpoint, CreateFileRequest, CreateFileResponse
        >(new()
        {
            ClientFileId = clientId,
            ContentType = "image/apng",
            FileNameWithExtension = "test2.png",
            DisplayName = "test.png",
        });

        createRsp.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        ValidationProblemDetails details = (await createRsp.Content.ReadFromJsonAsync<ValidationProblemDetails>())!;
        details.Errors.Should().Contain(pair =>
            pair.Key == "fileNameWithExtension" &&
            pair.Value.Contains("File record was already created, filename cannot be changed")
        );
    }
}

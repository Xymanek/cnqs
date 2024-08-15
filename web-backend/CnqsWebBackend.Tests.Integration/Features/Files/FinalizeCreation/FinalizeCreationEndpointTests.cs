using System.Net;
using CnqsWebBackend.Features.Files;
using CnqsWebBackend.Features.Files.FinalizeCreation;
using FastEndpoints;
using FastEndpoints.Testing;
using FluentAssertions;
using JetBrains.Annotations;
using Microsoft.Extensions.DependencyInjection;

namespace CnqsWebBackend.Tests.Integration.Features.Files.FinalizeCreation;

[TestSubject(typeof(FinalizeCreationEndpoint))]
[Collection(CnqsBackendAppCollection.Name)]
public class FinalizeCreationEndpointTests(CnqsBackendApp App) : TestBase<CnqsBackendApp>
{
    [Fact]
    public async Task NotFound()
    {
        Guid fileId = new("ffadb3b8-90a6-46c6-b3da-df10c6d2202f");

        // Ticket is validated before file ID, so we need to provide a valid one
        string ticket = App.Services.GetRequiredService<IFinalizationTicketProtector>()
            .ProtectForFileId(fileId);

        var (finalizeRsp, _) = await App.Client.POSTAsync<FinalizeCreationRequest, EmptyResponse>(
            $"/api/files/{fileId}/finalize-creation",
            new FinalizeCreationRequest
            {
                FinalizationTicket = ticket,
            }
        );

        finalizeRsp.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
}

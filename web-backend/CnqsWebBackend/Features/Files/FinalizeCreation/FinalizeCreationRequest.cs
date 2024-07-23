using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.FinalizeCreation;

[UsedImplicitly]
public class FinalizeCreationRequest
{
    public required string FinalizationTicket { get; set; }
}
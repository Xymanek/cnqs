using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.MyEndpoint;

[UsedImplicitly]
public class MyRequest
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required int Age { get; set; }
}

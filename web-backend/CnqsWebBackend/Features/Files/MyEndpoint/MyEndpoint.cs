using FastEndpoints;
using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.MyEndpoint;

[UsedImplicitly]
public class MyEndpoint : Endpoint<MyRequest, MyResponse>
{
    public override void Configure()
    {
        Post("/api/user/create");
        AllowAnonymous();
    }

    public override Task HandleAsync(MyRequest req, CancellationToken ct)
    {
        Response = new MyResponse
        {
            FullName = req.FirstName + " " + req.LastName,
            IsOver18 = req.Age > 18,
        };

        return Task.CompletedTask;
    }
}

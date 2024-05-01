using FastEndpoints;

namespace CnqsWebBackend.Features.Files.MyEndpoint;

public class MyEndpoint : Endpoint<MyRequest, MyResponse>
{
    public override void Configure()
    {
        Post("/api/user/create");
        AllowAnonymous();
    }

    public override async Task HandleAsync(MyRequest req, CancellationToken ct)
    {
        await SendAsync(new MyResponse
        {
            FullName = req.FirstName + " " + req.LastName,
            IsOver18 = req.Age > 18,
        });
    }
}

using FastEndpoints;
using FastEndpoints.Swagger;

WebApplicationBuilder builder = WebApplication.CreateBuilder();

builder.Services
    .AddFastEndpoints()
    .SwaggerDocument(o =>
    {
        o.AutoTagPathSegmentIndex = 2;
        o.ShortSchemaNames = true;

        o.DocumentSettings = s =>
        {
            s.Title = "CloudNativeQuickShare API";
        };
    });

builder.Services.AutoRegister();

WebApplication app = builder.Build();

app
    .UseFastEndpoints()
    .UseSwaggerGen();

app.Run();

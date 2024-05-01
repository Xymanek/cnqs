using FastEndpoints;
using FastEndpoints.Swagger;

WebApplicationBuilder builder = WebApplication.CreateBuilder();

builder.Services
    .AddFastEndpoints()
    .SwaggerDocument(o => o.AutoTagPathSegmentIndex = 2);

WebApplication app = builder.Build();

app
    .UseFastEndpoints()
    .UseSwaggerGen();

app.Run();

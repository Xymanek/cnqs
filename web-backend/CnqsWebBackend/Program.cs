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

// TODO
builder.Services.AddCors(cors => cors.AddDefaultPolicy(corsPolicy =>
{
    corsPolicy.AllowAnyHeader();
    corsPolicy.AllowAnyMethod();
    corsPolicy.AllowAnyOrigin();
}));

WebApplication app = builder.Build();

// TODO: temp
app.UseCors();

app
    .UseFastEndpoints(c =>
    {
        c.Endpoints.ShortNames = true;
    })
    .UseSwaggerGen();

app.Run();

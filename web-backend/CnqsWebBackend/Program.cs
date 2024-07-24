using CnqsWebBackend.Data;
using CnqsWebBackend.DiExtensions;
using FastEndpoints;
using FastEndpoints.Swagger;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using NodaTime;

WebApplicationBuilder builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    // TODO: for some reason this is required for EF CLI (to load user secrets)
    ApplicationName = typeof(ApplicationDbContext).Assembly.GetName().Name,
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Default"),
        npgsql => npgsql.UseNodaTime()
    );
});

builder.Services.AddDataProtection();
builder.Services.AddCnqsFileStorage();

builder.Services
    .AddFastEndpoints()
    .SwaggerDocument(o =>
    {
        o.AutoTagPathSegmentIndex = 2;
        o.ShortSchemaNames = true;

        o.DocumentSettings = s => { s.Title = "CloudNativeQuickShare API"; };
    });

builder.Services.AddSingleton<IClock>(SystemClock.Instance);

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
    .UseFastEndpoints(c => { c.Endpoints.ShortNames = true; })
    .UseSwaggerGen();

app.Run();

[UsedImplicitly]
public partial class Program;
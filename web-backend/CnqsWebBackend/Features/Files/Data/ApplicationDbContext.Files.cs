using CnqsWebBackend.Features.Files.Data;
using Microsoft.EntityFrameworkCore;

// ReSharper disable once CheckNamespace
namespace CnqsWebBackend.Data;

public partial class ApplicationDbContext
{
    public DbSet<FileEntity> Files { get; set; } = null!;
}

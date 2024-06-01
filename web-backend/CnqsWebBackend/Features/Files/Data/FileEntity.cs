using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NodaTime;

namespace CnqsWebBackend.Features.Files.Data;

[Index(nameof(ClientId), IsUnique = true)]
public class FileEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public Guid Id { get; set; } = Guid.NewGuid();

    public required Guid ClientId { get; init; }

    [MaxLength(250)] public required string DisplayName { get; set; }

    public required FileStoreStatus StoreStatus { get; set; }

    public required Instant CreatedAt { get; init; }
    public Instant? StoreCompletedAt { get; set; }
}
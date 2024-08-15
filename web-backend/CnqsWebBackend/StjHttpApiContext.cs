using System.Text.Json;
using System.Text.Json.Serialization;
using CnqsWebBackend.Features.Files.CreateFile;
using CnqsWebBackend.Features.Files.ListFiles;
using CnqsWebBackend.Features.Files.UpdateDisplayName;
using CnqsWebBackend.Features.Files.UploadFile;
using FastEndpoints;

namespace CnqsWebBackend;

[JsonSourceGenerationOptions(
    JsonSerializerDefaults.Web,
    UseStringEnumConverter = true
)]
[JsonSerializable(typeof(CreateFileRequest))]
[JsonSerializable(typeof(CreateFileResponse))]
[JsonSerializable(typeof(ListFilesResponse))]
[JsonSerializable(typeof(UpdateDisplayNameRequest))]
[JsonSerializable(typeof(UploadFileResponse))]
[JsonSerializable(typeof(ErrorResponse))]
internal partial class StjHttpApiContext : JsonSerializerContext;

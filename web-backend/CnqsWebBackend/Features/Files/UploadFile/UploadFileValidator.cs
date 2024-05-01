using FastEndpoints;
using FluentValidation;
using JetBrains.Annotations;

namespace CnqsWebBackend.Features.Files.UploadFile;

[UsedImplicitly]
public class UploadFileValidator : Validator<UploadFileRequest>
{
    public UploadFileValidator()
    {
        RuleFor(r => r.File.Length)
            .LessThanOrEqualTo(100 * 1000)
            .WithMessage("File size is larger than allowed (max size is 100KB)")
            ;
    }
}

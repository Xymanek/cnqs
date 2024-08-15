using CnqsWebBackend.Features.Files;
using FluentAssertions;

namespace CnqsWebBackend.Tests.Unit;

public class FileObjectKeyGeneratorTests
{
    [Fact]
    public void ValidateGetRawFileKey()
    {
        FileObjectKeyGenerator generator = new();

        string rawFileKey = generator.GetRawFileKey(new Guid("DFFAD231-C523-4478-AAAE-D0168AB59E79"), "test.jpg");
        rawFileKey.Should().Be("dffad231-c523-4478-aaae-d0168ab59e79/test.jpg");
    }
}

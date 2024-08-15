using System.Security.Cryptography;
using CnqsWebBackend.Features.Files;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.WebUtilities;

namespace CnqsWebBackend.Tests.Unit;

public class FinalizationTicketProtectorTests
{
    private readonly IDataProtector _dataProtector;
    private readonly FinalizationTicketProtector _finalizationProtector;

    public FinalizationTicketProtectorTests()
    {
        _dataProtector = A.Fake<IDataProtector>();

        IDataProtectionProvider protectionProvider = A.Fake<IDataProtectionProvider>();
        A.CallTo(() => protectionProvider.CreateProtector(A<string>.Ignored))
            .Returns(_dataProtector);

        _finalizationProtector = new FinalizationTicketProtector(protectionProvider);
    }

    [Fact]
    public void ProtectForFileId_Success()
    {
        Guid fileId = new("92AB8C40-ED89-472D-9786-C71F837E2513");
        byte[] fileIdBytes = fileId.ToByteArray();

        byte[] protectedBytes = [0x00, 0x01, 0x02, 0x03];
        A.CallTo(() => _dataProtector.Protect(fileIdBytes)).Returns(protectedBytes);

        _finalizationProtector.ProtectForFileId(fileId)
            .Should().Be(Base64UrlTextEncoder.Encode(protectedBytes));
    }

    [Fact]
    public void UnprotectTicket_Success()
    {
        Guid fileId = new("92AB8C40-ED89-472D-9786-C71F837E2513");
        byte[] fileIdBytes = fileId.ToByteArray();

        byte[] protectedBytes = [0x00, 0x01, 0x02, 0x03];
        string protectedString = Base64UrlTextEncoder.Encode(protectedBytes);

        A.CallTo(() => _dataProtector.Unprotect(A<byte[]>.That.IsSameSequenceAs(protectedBytes)))
            .Returns(fileIdBytes);

        Guid unprotectTicket = _finalizationProtector.UnprotectTicket(protectedString);
        unprotectTicket.Should().Be(fileId);
    }

    [Fact]
    public void UnprotectTicket_BadBase64()
    {
        Action act = () => _finalizationProtector.UnprotectTicket("🙂");
        act.Should().Throw<ConfirmationTicketUnprotectionFailedException>()
            .WithMessage("Failed to base64 decode the ticket")
            .WithInnerException<FormatException>();
    }

    [Fact]
    public void UnprotectTicket_BadTicket()
    {
        byte[] protectedBytes = [0x00, 0x01, 0x02, 0x03];
        string protectedString = Base64UrlTextEncoder.Encode(protectedBytes);

        A.CallTo(() => _dataProtector.Unprotect(A<byte[]>.That.IsSameSequenceAs(protectedBytes)))
            .Throws(() => new CryptographicException());

        Action act = () => _finalizationProtector.UnprotectTicket(protectedString);
        act.Should().Throw<ConfirmationTicketUnprotectionFailedException>()
            .WithMessage("Failed to unprotect the ticket")
            .WithInnerException<CryptographicException>();
    }

    [Fact]
    public void UnprotectTicket_BadTicketValue()
    {
        byte[] fileIdBytes = [0x00, 0x01, 0x02, 0x03, 0x04];

        byte[] protectedBytes = [0x00, 0x01, 0x02, 0x03];
        string protectedString = Base64UrlTextEncoder.Encode(protectedBytes);

        A.CallTo(() => _dataProtector.Unprotect(A<byte[]>.That.IsSameSequenceAs(protectedBytes)))
            .Returns(fileIdBytes);

        Action act = () => _finalizationProtector.UnprotectTicket(protectedString);
        act.Should().Throw<ConfirmationTicketUnprotectionFailedException>()
            .WithMessage("Ticket value is malformed")
            .WithInnerException<ArgumentException>();
    }
}

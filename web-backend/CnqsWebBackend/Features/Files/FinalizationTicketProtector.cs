using System.Security.Cryptography;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.WebUtilities;

namespace CnqsWebBackend.Features.Files;

public interface IFinalizationTicketProtector
{
    string ProtectForFileId(Guid fileId);

    /// <exception cref="ConfirmationTicketUnprotectionFailedException"></exception>
    Guid UnprotectTicket(string protectedTicket);
}

[RegisterSingleton]
internal class FinalizationTicketProtector(IDataProtectionProvider protectionProvider) : IFinalizationTicketProtector
{
    private readonly IDataProtector _protector =
        protectionProvider.CreateProtector(typeof(FinalizationTicketProtector).AssemblyQualifiedName!);

    public string ProtectForFileId(Guid fileId)
    {
        byte[] protectedBytes = _protector.Protect(fileId.ToByteArray());

        return Base64UrlTextEncoder.Encode(protectedBytes);
    }

    /// <exception cref="ConfirmationTicketUnprotectionFailedException"></exception>
    public Guid UnprotectTicket(string protectedTicket)
    {
        byte[] protectedData;

        try
        {
            protectedData = Base64UrlTextEncoder.Decode(protectedTicket);
        }
        catch (FormatException e)
        {
            throw new ConfirmationTicketUnprotectionFailedException("Failed to base64 decode the ticket", e);
        }

        byte[] unprotectedBytes;
        try
        {
            unprotectedBytes = _protector.Unprotect(protectedData);
        }
        catch (CryptographicException e)
        {
            throw new ConfirmationTicketUnprotectionFailedException("Failed to unprotect the ticket", e);
        }

        try
        {
            return new Guid(unprotectedBytes);
        }
        catch (ArgumentException e)
        {
            throw new ConfirmationTicketUnprotectionFailedException("Ticket value is malformed", e);
        }
    }
}

public class ConfirmationTicketUnprotectionFailedException : Exception
{
    public ConfirmationTicketUnprotectionFailedException()
    {
    }

    public ConfirmationTicketUnprotectionFailedException(string? message) : base(message)
    {
    }

    public ConfirmationTicketUnprotectionFailedException(
        string? message, Exception? innerException
    ) : base(message, innerException)
    {
    }
}
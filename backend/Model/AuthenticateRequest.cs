using System.Diagnostics.CodeAnalysis;
using Backend.Model.Enum;

namespace Backend.Model;

using System.ComponentModel.DataAnnotations;
[ExcludeFromCodeCoverage]
public class AuthenticateRequest
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
    
}
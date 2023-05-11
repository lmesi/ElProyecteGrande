using System.Diagnostics.CodeAnalysis;
using Backend.Model.Enum;

namespace Backend.Model;

using Model.Entities;
[ExcludeFromCodeCoverage]
public class AuthenticateResponse
{
    public long Id { get; set; }
    public string Username { get; set; }
    public Role Role { get; set; }
    public string Token { get; set; }


    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        Username = user.Name;
        Role = user.Role;
        Token = token;
    }
}
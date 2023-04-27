namespace Backend.Model;

using Model.Entities;

public class AuthenticateResponse
{
    public long Id { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }


    public AuthenticateResponse(User user, string token)
    {
        Id = user.Id;
        Username = user.Name;
        Token = token;
    }
}
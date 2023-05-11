using System.Diagnostics.CodeAnalysis;
using Backend.Service;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;

namespace Backend._JWTAuth;
[ExcludeFromCodeCoverage]
public class Middleware
{
    private readonly RequestDelegate _next;
    private readonly AppSettings _appSettings;

    public Middleware(RequestDelegate next, IOptions<AppSettings> appSettings)
    {
        _next = next;
        _appSettings = appSettings.Value;
    }

    public async Task Invoke(HttpContext context, IUserService userService)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token != null)
          await AttachUserToContext(context, userService, token);

        await _next(context);
    }

    private async Task AttachUserToContext(HttpContext context, IUserService userService, string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

            var user = await userService.GetUserForAuth(userId);
            if (user != null)
            {
                context.Items["User"] = user;
            }
            else
            {
                // Handle the case when the user is not found
                // For example, you can return an unauthorized response
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return;
            }
        }
        catch (SecurityTokenValidationException)
        {
            // Handle JWT validation failure
            // For example, you can return an unauthorized response
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return;
        }
    }
}
using System.Diagnostics.CodeAnalysis;

namespace Backend.Controllers;

using Backend._JWTAuth;
using Backend.Model;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;
[ExcludeFromCodeCoverage]
[ApiController, Route("[controller]")]
public class LoginController : ControllerBase
{
    private IUserService _userService;

    public LoginController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate(AuthenticateRequest model)
    {
        var response = await _userService.Authenticate(model);

        if (response == null)
            return BadRequest(new { message = "Username or password is incorrect" });

        return Ok(response);
    }

    [Authorize]
    [HttpGet]
    public IActionResult LoginTest()
    {
        return Ok("Auth success");
    }
}
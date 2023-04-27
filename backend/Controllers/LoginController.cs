namespace Backend.Controllers;

using Backend._JWTAuth;
using Backend.Model;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

[ApiController, Route("[controller]")]
public class LoginController : ControllerBase
{
    private IUserService _userService;

    public LoginController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);

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
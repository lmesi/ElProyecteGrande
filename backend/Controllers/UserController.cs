using System.Diagnostics.CodeAnalysis;
using Backend.Model.Entities;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;
using Backend.Model.DTO;

namespace Backend.Controllers;
[ExcludeFromCodeCoverage]
[_JWTAuth.Authorize]
[ApiController, Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] UserDto userDto)
    {
        try
        {
            await _userService.AddUser(userDto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(long id)
    {
        try
        {
            var user = await _userService.GetUser(id);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("/admin")]
    public async Task<IActionResult> GetAllAdmin()
    {
        try
        {
            var users = await _userService.GetAllAdmin();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("/driver")]
    public async Task<IActionResult> GetAllDriver()
    {
        try
        {
            var users = await _userService.GetAllDriver();
            return Ok(users);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser([FromBody] User user, long id)
    {
        try
        {
            await _userService.UpdateUser(user, id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(long id)
    {
        try
        {
            await _userService.DeleteUser(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
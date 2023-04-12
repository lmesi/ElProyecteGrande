using Backend.Model.Entities;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;
using Backend.Model.DTO;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("admin")]
        public async Task<IActionResult> AddAdmin([FromBody] Admin admin)
        {
            try
            {
                await _userService.AddAdmin(admin);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("driver")]
        public async Task<IActionResult> AddDriver([FromBody] DriverDto driverDto)
        {
            try
            {
                await _userService.AddDriver(driverDto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetAdmin(long id)
        {
            try
            {
                var admin = await _userService.GetAdmin(id);
                return Ok(admin);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("driver/{id}")]
        public async Task<IActionResult> GetDriver(long id)
        {
            try
            {
                var driver = await _userService.GetDriver(id);
                return Ok(driver);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("admin")]
        public async Task<IActionResult> GetAllAdmins()
        {
            try
            {
                var admins = await _userService.GetAllAdmins();
                return Ok(admins);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("driver")]
        public async Task<IActionResult> GetAllDrivers()
        {
            try
            {
                var drivers = await _userService.GetAllDrivers();
                return Ok(drivers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("admin")]
        public async Task<IActionResult> UpdateAdmin([FromBody] Admin admin)
        {
            try
            {
                await _userService.UpdateAdmin(admin);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("driver")]
        public async Task<IActionResult> UpdateDriver([FromBody] Driver driver)
        {
            try
            {
                await _userService.UpdateDriver(driver);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("admin/{id}")]
        public async Task<IActionResult> DeleteAdmin(long id)
        {
            try
            {
                await _userService.DeleteAdmin(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("driver/{id}")]
        public async Task<IActionResult> DeleteDriver(long id)
        {
            try
            {
                await _userService.DeleteDriver(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
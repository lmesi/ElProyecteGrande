using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController, Route("/Driver")]
public class DriverController : ControllerBase
{
    private readonly IDriverService _driverService;

    public DriverController(IDriverService driverService)
    {
        _driverService = driverService;
    }

    [HttpGet("{driverId}")]
    public async Task<IActionResult> GetOrdersByDriverId(long driverId)
    {
        var orders = await _driverService.GetOrdersByDriverId(driverId);
        return Ok(orders);
    }
}
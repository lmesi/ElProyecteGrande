using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Backend.Controllers;

[ApiController, Route("/Driver")]
public class DriverController : ControllerBase
{
    private readonly IDriverService _driverService;
    private const string ErrorMessage = "Not found or bad request!";

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
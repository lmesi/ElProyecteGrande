using Backend.Model.DTO;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[_JWTAuth.Authorize]
[ApiController, Route("/Orders")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private const string ErrorMessage = "Not found or bad request.";

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _orderService.GetAllOrders();
        return Ok(orders);
    }

    [HttpPost]
    public async Task<IActionResult> AddOrder([FromBody] OrderDto orderDto)
    {
        bool success = await _orderService.AddOrder(orderDto);
        return success ? Ok("New order added") : StatusCode(400, ErrorMessage);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(long id)
    {
        var order = await _orderService.GetOrder(id);
        return order.Id == 0 ? NotFound() : Ok(order);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrderById(long id, [FromBody] OrderDto orderDto)
    {
        bool success = await _orderService.UpdateOrder(id, orderDto);
        return success ? Ok("Order updated") : StatusCode(400, ErrorMessage);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(long id)
    {
        bool success = await _orderService.DeleteOrder(id);
        return success ? Ok("Order deleted") : StatusCode(400, ErrorMessage);
    }

    [HttpGet("/Driver/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(long userId)
    {
        var orders = await _orderService.GetOrdersByUserId(userId);
        return Ok(orders);
    }
}
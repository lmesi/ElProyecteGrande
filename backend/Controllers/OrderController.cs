using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;
[ApiController, Route("/Orders")]
public class OrderController: ControllerBase
{
    private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders=await _orderService.GetAllOrders();
            return orders.Count == 0 ? NotFound() : Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] OrderDto orderDto)
        {
            bool success=await _orderService.AddOrder(orderDto);
            return success ? Ok("New order added") : Content("An error occured");
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(long id)
        {
            var order=await _orderService.GetOrder(id);
            return order.Id==0? NotFound() : Ok(order);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderById(long id, [FromBody] OrderDto orderDto)
        {
           bool success= await _orderService.UpdateOrder(id, orderDto);
           return success ? Ok("Order updated") : Content("An error occured");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(long id)
        {
            bool success = await _orderService.DeleteOrder(id);
            return success ? Ok("Order deleted") : Content("An error occured");
        }

}
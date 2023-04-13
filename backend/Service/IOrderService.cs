using Backend.Model.DTO;
using Backend.Model.Entities;

namespace Backend.Service;

public interface IOrderService
{
    Task<bool> AddOrder(OrderDto orderDto);
    Task<OrderDto> GetOrder(long id);
    Task<List<OrderDto>> GetAllOrders();
    Task<bool> UpdateOrder(long id, OrderDto orderDto);
    Task<bool> DeleteOrder(long id);
}
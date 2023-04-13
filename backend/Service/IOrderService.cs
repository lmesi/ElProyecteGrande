using Backend.Model.DTO;
using Backend.Model.dtoToShow;
using Backend.Model.Entities;

namespace Backend.Service;

public interface IOrderService
{
    Task<bool> AddOrder(OrderDto orderDto);
    Task<OrderToShow> GetOrder(long id);
    Task<List<OrderToShow>> GetAllOrders();
    Task<bool> UpdateOrder(long id, OrderDto orderDto);
    Task<bool> DeleteOrder(long id);
    Task<List<OrderToShow>> GetOrdersByDriverId(long driverId);
}
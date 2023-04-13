using Backend.Model.DTO;
using Backend.Model.Entities;

namespace Backend.Service;

public interface IDriverService
{
    Task<List<OrderDto>> GetOrdersByDriverId(long driverId);
}
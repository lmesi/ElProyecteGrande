using Backend.Model;
using Backend.Model.DTO;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service;

public class DriverService : IDriverService
{
    private readonly SpeedyContext _context;

    public DriverService(SpeedyContext speedyContext)
    {
        _context = speedyContext;
    }

    public async Task<List<OrderDto>> GetOrdersByDriverId(long driverId)
    {
        try
        {
            var uncompletedOrdersByDriver = await _context.Orders
                .Include(order => order.Driver)
                .Include(order => order.Company)
                .Where(order => order.Driver.Id.Equals(driverId))
                .Where(order => order.UnloadingDate == null)
                .ToListAsync();
        
            var completedOrdersByDriver = await _context.Orders.Include(order => order.Driver)
                .Where(order => order.Driver.Id.Equals(driverId))
                .OrderByDescending(order => order.UnloadingDate)
                .Take(2)
                .ToListAsync();

            var orders = uncompletedOrdersByDriver.Concat(completedOrdersByDriver).Select(order => new OrderDto
            {
                Id = order.Id,
                CompanyId = order.Company.Id,
                LoadingAddress = order.LoadingAddress,
                UnloadingAddress = order.UnloadingAddress,
                UnloadingDate = order.UnloadingDate,
                DriverId = order.Driver.Id,
                Goods = order.Goods
            }).ToList();
        
            return orders;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new List<OrderDto>();
        }
    }
}
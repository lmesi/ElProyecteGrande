using System.Data;
using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service;

public class OrderService : IOrderService
{
    private readonly SpeedyContext _speedyContext;

    public OrderService(SpeedyContext speedyContext)
    {
        _speedyContext = speedyContext;
    }

    public async Task<bool> AddOrder(OrderDto orderDto)
    {
        try
        {
            Order order = new Order()
            {
                Company = await _speedyContext.Companies.FirstAsync(c => c.Id == orderDto.CompanyId),
                Driver = await _speedyContext.Drivers.FirstAsync(d => d.Id == orderDto.DriverId),
                Id = orderDto.Id,
                Goods = orderDto.Goods,
                LoadingAddress = orderDto.LoadingAddress,
                UnloadingAddress = orderDto.UnloadingAddress
            };
            _speedyContext.Orders.Add(order);
            await _speedyContext.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<OrderDto> GetOrder(long id)
    {
        List<Order> orders =
            await _speedyContext.Orders.Include(o => o.Company).Include(o => o.Driver).ToListAsync();
        var order = orders.FirstOrDefault(o => o.Id == id);
        if (order != null)
            return OrderDto(order);
        return new OrderDto();
    }


    public async Task<List<OrderDto>> GetAllOrders()
    {
        List<OrderDto> orders =
            (await _speedyContext.Orders.Include(o => o.Company).Include(o => o.Driver).ToListAsync())
            .Select(order => OrderDto(order)).ToList();
        return orders;
    }

    public async Task<bool> UpdateOrder(long id, OrderDto orderDto)
    {
        try
        {
            var order = await _speedyContext.Orders.FirstOrDefaultAsync(o => o.Id == id);
            if (order != null)
            {
                order.Company = await _speedyContext.Companies.FirstAsync(c => c.Id == orderDto.CompanyId);
                order.Driver = await _speedyContext.Drivers.FirstAsync(d => d.Id == orderDto.DriverId);
                order.Goods = orderDto.Goods;
                order.LoadingAddress = orderDto.LoadingAddress;
                order.UnloadingAddress = orderDto.UnloadingAddress;
                order.UnloadingDate = orderDto.UnloadingDate;
                _speedyContext.Orders.Update(order);
                await _speedyContext.SaveChangesAsync();
                return true;
            }

            return false;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<bool> DeleteOrder(long id)
    {
        try
        {
            var order = await _speedyContext.Orders.FindAsync(id);
            if (order != null)
            {
                _speedyContext.Orders.Remove(order);
                await _speedyContext.SaveChangesAsync();
                return true;
            }

            return false;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    private OrderDto OrderDto(Order order)
    {
        return new OrderDto()
        {
            Id = order.Id,
            CompanyId = order.Company.Id,
            DriverId = order.Driver.Id,
            Goods = order.Goods,
            LoadingAddress = order.LoadingAddress,
            UnloadingAddress = order.UnloadingAddress,
            UnloadingDate = order.UnloadingDate
        };
    }
}
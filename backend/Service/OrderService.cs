using System.Data;
using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.dtoToShow;
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
                Goods = await _speedyContext.Goods.FirstAsync(g => g.Id == orderDto.GoodsId),
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

    public async Task<OrderToShow> GetOrder(long id)
    {
        List<Order> orders =
            await _speedyContext.Orders.Include(o => o.Company).Include(o => o.Driver).Include(o => o.Goods)
                .ToListAsync();
        var order = orders.FirstOrDefault(o => o.Id == id);
        if (order != null)
            return OrderToShow(order);
        return new OrderToShow();
    }


    public async Task<List<OrderToShow>> GetAllOrders()
    {
        List<OrderToShow> orders =
            (await _speedyContext.Orders.Include(o => o.Company).Include(o => o.Driver).Include(o => o.Goods)
                .ToListAsync())
            .Select(order => OrderToShow(order)).ToList();
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
                order.Goods = await _speedyContext.Goods.FirstAsync(g => g.Id == orderDto.GoodsId);
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

    public async Task<List<OrderToShow>> GetOrdersByDriverId(long driverId)
    {
        try
        {
            var uncompletedOrdersByDriver = await _speedyContext.Orders
                .Include(order => order.Driver)
                .Include(order => order.Company)
                .Where(order => order.Driver.Id.Equals(driverId))
                .Where(order => order.UnloadingDate == null)
                .ToListAsync();

            var completedOrdersByDriver = await _speedyContext.Orders.Include(order => order.Driver)
                .Where(order => order.Driver.Id.Equals(driverId))
                .Where(order => order.UnloadingDate != null)
                .OrderByDescending(order => order.UnloadingDate)
                .Take(2)
                .ToListAsync();

            var orders = uncompletedOrdersByDriver.Concat(completedOrdersByDriver).Select(order => OrderToShow(order))
                .ToList();

            return orders;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new List<OrderToShow>();
        }
    }

    private OrderToShow OrderToShow(Order order)
    {
        return new OrderToShow()
        {
            Id = order.Id,
            CompanyName = order.Company.Name,
            DriverName = order.Driver.Name,
            GoodsName = order.Goods.Name,
            LoadingAddress = order.LoadingAddress,
            UnloadingAddress = order.UnloadingAddress,
            UnloadingDate = order.UnloadingDate
        };
    }
}
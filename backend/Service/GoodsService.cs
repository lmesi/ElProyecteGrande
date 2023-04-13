using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service;

public class GoodsService : IGoodsService
{
    private readonly SpeedyContext _speedyContext;

    public GoodsService(SpeedyContext speedyContext)
    {
        _speedyContext = speedyContext;
    }
    public async Task<List<GoodsDto>> GetAllGoods()
    {
        return (await _speedyContext.Goods.ToListAsync())
            .Select(goods => new GoodsDto
            {
                Id = goods.Id,
                Name = goods.Name
            }).ToList();
    }

    public async Task<bool> AddGoods(GoodsDto goods)
    {
        try
        {
            _speedyContext.Goods.Add(new Goods
            {
                Name = goods.Name,
                Orders = new List<Order>()
            });
            await _speedyContext.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }

    public async Task<bool> DeleteGoods(long id)
    {
        try
        {
            var goods = await _speedyContext.Goods.FindAsync(id);
            if (goods is not null)
            {
                _speedyContext.Goods.Remove(goods);
                await _speedyContext.SaveChangesAsync();
                return true;
            }

            return false;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }
}
using Backend.Model.DTO;
using Backend.Model.Entities;

namespace Backend.Service;

public interface IGoodsService
{
    Task<List<GoodsDto>> GetAllGoods();
    Task<bool> AddGoods(GoodsDto goods);
    Task<bool> DeleteGoods(long id);
}
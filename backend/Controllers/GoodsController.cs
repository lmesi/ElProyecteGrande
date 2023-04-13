using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController, Route("/Goods")]
public class GoodsController : ControllerBase
{
    private readonly IGoodsService _goodsService;
    private const string ErrorMessage = "Not found or bad request!";

    public GoodsController(IGoodsService goodsService)
    {
        _goodsService = goodsService;
    }

    [HttpGet]
    public async Task<List<GoodsDto>> GetAllGoods()
    {
        return await _goodsService.GetAllGoods();
    }

    [HttpPost]
    public async Task<IActionResult> AddGoods([FromBody] GoodsDto goodsEntity)
    {
        var success = await _goodsService.AddGoods(goodsEntity);
        return success ? Ok("Goods added") : StatusCode(400, ErrorMessage);
    }

    [HttpDelete("{goodsId}")]
    public async Task<IActionResult> DeleteGoods(long goodsId)
    {
        var success = await _goodsService.DeleteGoods(goodsId);
        return success ? Ok($"Goods with id {goodsId} deleted") : StatusCode(400, ErrorMessage);
    }
}
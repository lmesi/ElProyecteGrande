using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Service;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace BackendTests;

public class GoodsServiceTest
{
    private IGoodsService _goodsService;
    private SpeedyContext _dbContext;

    private SpeedyContext GetMemoryContext()
    {
        var options = new DbContextOptionsBuilder<SpeedyContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;
        return new SpeedyContext(options);
    }


    [SetUp]
    public void Setup()
    {
        _dbContext = GetMemoryContext();
        if (_dbContext.Database.IsInMemory())
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Goods.Add(new Goods()
            {
                Name = "Salt",
                Orders = new List<Order>(),
            });
            _dbContext.Goods.Add(new Goods()
            {
                Name = "Pepper",
                Orders = new List<Order>(),
            });
            _dbContext.Goods.Add(new Goods()
            {
                Name = "Wheat",
                Orders = new List<Order>(),
            });
            _dbContext.Goods.Add(new Goods()
            {
                Name = "Coal",
                Orders = new List<Order>(),
            });
        }

        _dbContext.SaveChanges();
        _goodsService = new GoodsService(_dbContext);
    }

    [Test]
    public async Task GetAllGoodsTest()
    {
        var goods = await _goodsService.GetAllGoods();

        Assert.That(goods.Count, Is.EqualTo(4));
    }

    [Test]
    public async Task DeleteGoodsSuccessTest()
    {
        var result = await _goodsService.DeleteGoods(1);
        var goods = await _goodsService.GetAllGoods();

        Assert.True(result);
        Assert.That(goods.Count, Is.EqualTo(3));
    }

    [Test]
    public async Task DeleteGoodsFailsTest()
    {
        var result = await _goodsService.DeleteGoods(0);
        var companies = await _goodsService.GetAllGoods();
        Assert.False(result);
        Assert.That(companies.Count, Is.EqualTo(4));
    }

    [Test]
    public async Task AddGoodsSuccessTest()
    {
        var goodsToAddDto = new GoodsDto()
        {
            Name = "Rice"
        };
        var result = await _goodsService.AddGoods(goodsToAddDto);
        var companies = await _goodsService.GetAllGoods();

        Assert.True(result);
        Assert.That(companies.Count, Is.EqualTo(5));
    }

    [Test]
    public async Task AddGoodsFailsTest()
    {
        var goodsToAddDto = new GoodsDto()
        {
        };
        var result = await _goodsService.AddGoods(goodsToAddDto);
        var companies = await _goodsService.GetAllGoods();

        Assert.False(result);
        Assert.That(companies.Count, Is.EqualTo(4));
    }
}
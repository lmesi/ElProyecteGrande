using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Service;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace BackendTests;

public class Tests
{
    [SetUp]
    public void Setup()
    {
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
            db.Users.Add(new User
            {
                LicensePlate = "123-ASD",
                Name = "Driver1",
                Orders = new List<Order>(),
                Password = "password1",
                Role = 0
            });
            db.Users.Add(new User
            {
                LicensePlate = "456-FGH",
                Name = "Driver2",
                Orders = new List<Order>(),
                Password = "password2",
                Role = 0
            });
            db.Companies.Add(new Company
            {
                Address = "address1",
                Name = "company1",
                Orders = new List<Order>()
            });
            db.Companies.Add(new Company
            {
                Address = "address2",
                Name = "company2",
                Orders = new List<Order>()
            });
            db.Goods.Add(new Goods
            {
                Name = "Salt",
                Orders = new List<Order>()
            });
            db.Goods.Add(new Goods
            {
                Name = "Sand",
                Orders = new List<Order>()
            });
            
            db.SaveChanges();
        }
    }

    [Test]
    public async Task AddOrderTest()
    {
        var orderDto = new OrderDto
        {
            CompanyId = 1,
            LoadingAddress = "loadingAddress",
            UnloadingAddress = "unloadingAddress",
            GoodsId = 1,
            UserId = 1,
        };
        
        var db = GetMemoryContext();
        var service = new OrderService(db);
        var result = await service.AddOrder(orderDto);
        
        Assert.True(result);
    }
    
    [Test]
    public async Task AddOrderFailsOnMissingCompanyIdTest()
    {
        var orderDto = new OrderDto
        {
            LoadingAddress = "loadingAddress",
            UnloadingAddress = "unloadingAddress",
            GoodsId = 1,
            UserId = 1,
        };
        
        var db = GetMemoryContext();
        var service = new OrderService(db);
        var result = await service.AddOrder(orderDto);
        
        Assert.False(result);
    }

    [Test]
    public async Task GetOrderByIdTest()
    {
        var orderDto = new OrderDto
        {
            CompanyId = 1,
            LoadingAddress = "loadingAddress",
            UnloadingAddress = "unloadingAddress",
            GoodsId = 1,
            UserId = 1,
        };
        var db = GetMemoryContext();
        var service = new OrderService(db);
        await service.AddOrder(orderDto);
        var result = await service.GetOrder(1);
        
        Assert.That(result.LoadingAddress, Is.EqualTo(orderDto.LoadingAddress));
    }

    [Test]
    public async Task GetAllOrdersTest()
    {
        var orderDto1 = new OrderDto
        {
            CompanyId = 1,
            LoadingAddress = "loadingAddress1",
            UnloadingAddress = "unloadingAddress1",
            GoodsId = 1,
            UserId = 1,
        };
        
        var orderDto2 = new OrderDto
        {
            CompanyId = 2,
            LoadingAddress = "loadingAddress2",
            UnloadingAddress = "unloadingAddress2",
            GoodsId = 2,
            UserId = 2,
        };
        
        var orderDto3 = new OrderDto
        {
            CompanyId = 2,
            LoadingAddress = "loadingAddress3",
            UnloadingAddress = "unloadingAddress3",
            GoodsId = 1,
            UserId = 1,
        };
        
        var db = GetMemoryContext();
        var service = new OrderService(db);
        await service.AddOrder(orderDto1);
        await service.AddOrder(orderDto2);
        await service.AddOrder(orderDto3);
        var result = await service.GetAllOrders();
        
        Assert.That(result.Count, Is.EqualTo(3));
    }
    
    private SpeedyContext GetMemoryContext()
    {
        var options = new DbContextOptionsBuilder<SpeedyContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;
        return new SpeedyContext(options);
    }
}
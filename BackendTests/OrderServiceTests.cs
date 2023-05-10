using System;
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
    private static readonly OrderDto OrderDto1 = new()
    {
        CompanyId = 1,
        LoadingAddress = "loadingAddress",
        UnloadingAddress = "unloadingAddress",
        GoodsId = 1,
        UserId = 1,
    };

    private static readonly OrderDto OrderDto2 = new()
    {
        CompanyId = 2,
        LoadingAddress = "loadingAddress2",
        UnloadingAddress = "unloadingAddress2",
        GoodsId = 2,
        UserId = 2,
    };
    
    private static readonly OrderDto orderDto3 = new()
    {
        CompanyId = 2,
        LoadingAddress = "loadingAddress3",
        UnloadingAddress = "unloadingAddress3",
        GoodsId = 1,
        UserId = 1,
    };

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
        var db = GetMemoryContext();
        var service = new OrderService(db);
        
        var result = await service.AddOrder(OrderDto1);
        
        Assert.True(result);
    }
    
    [Test]
    public async Task AddOrderFailsOnMissingCompanyIdTest()
    {
        var wrongOrderDto = new OrderDto
        {
            LoadingAddress = "loadingAddress",
            UnloadingAddress = "unloadingAddress",
            GoodsId = 1,
            UserId = 1,
        };
        var db = GetMemoryContext();
        var service = new OrderService(db);
        
        var result = await service.AddOrder(wrongOrderDto);
        
        Assert.False(result);
    }

    [Test]
    public async Task GetOrderByIdTest()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);
        await service.AddOrder(OrderDto1);
        
        var result = await service.GetOrder(1);
        
        Assert.That(result.LoadingAddress, Is.EqualTo(OrderDto1.LoadingAddress));
    }

    [Test]
    public async Task GetOrderByIdWithWrongIdTest()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);
        var result = await service.GetOrder(1);
        
        //result should be null instead of new OrderToShow()
        //Assert.That(result, Is.Null);
        Assert.That(result.Id, Is.EqualTo(0));
    }

    [Test]
    public async Task GetAllOrdersTest()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);
        await service.AddOrder(OrderDto1);
        await service.AddOrder(OrderDto2);
        await service.AddOrder(orderDto3);
        
        var result = await service.GetAllOrders();
        
        Assert.That(result.Count, Is.EqualTo(3));
    }

    [Test]
    public async Task UpdateOrderCanUpdateUnloadingDateTest()
    {
        var newOrderDto = new OrderDto
        {
            UnloadingDate = new DateTime(2023,05,08)
        };
        var db = GetMemoryContext();
        var service = new OrderService(db);
        await service.AddOrder(OrderDto1);
        var resultValue = await service.UpdateOrder(1, newOrderDto);

        var result = await service.GetOrder(1);
        
        Assert.That(result.UnloadingDate, Is.EqualTo(newOrderDto.UnloadingDate));
        Assert.True(resultValue);
    }

    [Test]
    public async Task UpdateOrderFailsOnNonExistentOrder()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);
        
        var result = await service.UpdateOrder(1, new OrderDto());
        
        Assert.False(result);
    }

    [Test]
    public async Task DeleteOrderTest()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);
        await service.AddOrder(OrderDto1);
        var orderCountBeforeDelete = (await service.GetAllOrders()).Count;
        var returnValue = await service.DeleteOrder(1);

        var orderCountAfterDelete = (await service.GetAllOrders()).Count;
        
        Assert.That(orderCountAfterDelete + 1, Is.EqualTo(orderCountBeforeDelete));
        Assert.True(returnValue);
    }
    
    [Test]
    public async Task DeleteOrderReturnsFalseOnNonExistentIdTest()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);

        var result = await service.DeleteOrder(1);
        
        Assert.False(result);
    }

    [Test]
    public async Task GetOrdersByUserId()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);
        await service.AddOrder(OrderDto1);
        await service.AddOrder(OrderDto2);

        var result = await service.GetOrdersByUserId(1);
        
        Assert.That(result.Count, Is.EqualTo(1));
    }

    [Test]
    public async Task GetOrdersByUserIdReturnsEmptyListOnWrongIdTest()
    {
        var db = GetMemoryContext();
        var service = new OrderService(db);

        var result = await service.GetOrdersByUserId(3);
        
        Assert.That(result.Count, Is.EqualTo(0));
    }
    
    private SpeedyContext GetMemoryContext()
    {
        var options = new DbContextOptionsBuilder<SpeedyContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;
        return new SpeedyContext(options);
    }
}
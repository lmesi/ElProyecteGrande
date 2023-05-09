using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend._JWTAuth;
using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Model.Enum;
using Backend.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NUnit.Framework;

namespace BackendTests;

public class UserServiceTests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public async Task AddUserTest()
    {
        var userDto = new UserDto
        {
            Name = "John Doe",
            Password = "asd",
            LicensePlate = "asd-123",
            Role = Role.Driver
        };
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var userService = CreateUserService(db);
        await userService.AddUser(userDto);

        var addedUser = db.Users.FirstOrDefault(u => u.Name == userDto.Name);
        Assert.NotNull(addedUser);
        Assert.AreEqual(userDto.Name, addedUser.Name);
        Assert.AreEqual(userDto.Password, addedUser.Password);
        Assert.AreEqual(userDto.LicensePlate, addedUser.LicensePlate);
        Assert.AreEqual(userDto.Role, addedUser.Role);
    }

    [Test]
    public async Task GetUserByIdTest()
    {
        var userDto = new UserDto
        {
            Name = "John Doe",
            Password = "asd",
            LicensePlate = "asd-123",
            Role = Role.Driver
        };
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var userService = CreateUserService(db);
        await userService.AddUser(userDto);
        var addedUser = db.Users.FirstOrDefault(u => u.Name == userDto.Name);

        var result = await userService.GetUser(addedUser.Id);

        Assert.NotNull(result);
        Assert.AreEqual(addedUser.Id, result.Id);
        Assert.AreEqual(addedUser.Name, result.Name);
        Assert.AreEqual(addedUser.LicensePlate, result.LicensePlate);
        Assert.AreEqual(addedUser.Role, result.Role);
    }


    [Test]
    public async Task GetUserNonExistingTest()
    {
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var userService = CreateUserService(db);

        Assert.ThrowsAsync<ArgumentException>(async () => { await userService.GetUser(-1); });
    }

    [Test]
    public async Task GetUserForAuthTest()
    {
        var userDto = new UserDto
        {
            Name = "John Doe",
            Password = "asd",
            LicensePlate = "asd-123",
            Role = Role.Driver
        };
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var userService = CreateUserService(db);
        await userService.AddUser(userDto);
        var addedUser = db.Users.FirstOrDefault(u => u.Name == userDto.Name);

        var result = await userService.GetUserForAuth(addedUser.Id);

        Assert.NotNull(result);
        Assert.AreEqual(addedUser.Id, result.Id);
        Assert.AreEqual(addedUser.Name, result.Name);
        Assert.AreEqual(addedUser.Password, result.Password);
        Assert.AreEqual(addedUser.LicensePlate, result.LicensePlate);
        Assert.AreEqual(addedUser.Role, result.Role);
    }


    [Test]
    public async Task GetUserForAuthNonExistingTest()
    {
        var db = GetMemoryContext();
        var userService = CreateUserService(db);

        Assert.ThrowsAsync<ArgumentException>(async () => { await userService.GetUserForAuth(-1); });
    }

    [Test]
    public async Task GetAllUserTest()
    {
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var userService = CreateUserService(db);
        var users = new List<User>
        {
            new User { Id = 1, Name = "John", Password = "123", LicensePlate = "", Role = Role.Admin },
            new User { Id = 2, Name = "Jane", Password = "asd", LicensePlate = "XYZ789", Role = Role.Driver }
        };
        db.Users.AddRange(users);
        await db.SaveChangesAsync();

        var result = await userService.GetAllUsers();

        Assert.AreEqual(2, result.Count);

        var user1 = result[0];
        Assert.AreEqual(1, user1.Id);
        Assert.AreEqual("John", user1.Name);
        Assert.AreEqual("", user1.LicensePlate);
        Assert.AreEqual(Role.Admin, user1.Role);

        var user2 = result[1];
        Assert.AreEqual(2, user2.Id);
        Assert.AreEqual("Jane", user2.Name);
        Assert.AreEqual("XYZ789", user2.LicensePlate);
        Assert.AreEqual(Role.Driver, user2.Role);
    }

    [Test]
    public async Task GetAllUserForAuthTest()
    {
        var db = GetMemoryContext();
        var userService = CreateUserService(db);
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var users = new List<User>
        {
            new User { Id = 1, Name = "John", Password = "123", LicensePlate = "", Role = Role.Admin },
            new User { Id = 2, Name = "Jane", Password = "asd", LicensePlate = "XYZ789", Role = Role.Driver }
        };
        db.Users.AddRange(users);
        await db.SaveChangesAsync();

        var result = await userService.GetAllUsersForAuth();

        Assert.AreEqual(2, result.Count);

        var user1 = result[0];
        Assert.AreEqual(1, user1.Id);
        Assert.AreEqual("John", user1.Name);
        Assert.AreEqual("", user1.LicensePlate);
        Assert.AreEqual("123", user1.Password);
        Assert.AreEqual(Role.Admin, user1.Role);

        var user2 = result[1];
        Assert.AreEqual(2, user2.Id);
        Assert.AreEqual("Jane", user2.Name);
        Assert.AreEqual("XYZ789", user2.LicensePlate);
        Assert.AreEqual("asd", user2.Password);
        Assert.AreEqual(Role.Driver, user2.Role);
    }

    [Test]
    public async Task GetAllAdminTest()
    {
        var db = GetMemoryContext();
        var userService = CreateUserService(db);
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var users = new List<User>
        {
            new User { Id = 1, Name = "John", Password = "123", LicensePlate = "", Role = Role.Admin },
            new User { Id = 2, Name = "Jane", Password = "asd", LicensePlate = "XYZ789", Role = Role.Driver }
        };
        db.Users.AddRange(users);
        await db.SaveChangesAsync();

        var result = await userService.GetAllAdmin();

        Assert.AreEqual(1, result.Count);

        var user1 = result[0];
        Assert.AreEqual(1, user1.Id);
        Assert.AreEqual("John", user1.Name);
        Assert.AreEqual("", user1.LicensePlate);
        Assert.AreEqual(Role.Admin, user1.Role);
    }

    [Test]
    public async Task GetAllDriverTest()
    {
        var db = GetMemoryContext();
        var userService = CreateUserService(db);
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var users = new List<User>
        {
            new User { Id = 1, Name = "John", Password = "123", LicensePlate = "", Role = Role.Admin },
            new User { Id = 2, Name = "Jane", Password = "asd", LicensePlate = "XYZ789", Role = Role.Driver }
        };
        db.Users.AddRange(users);
        await db.SaveChangesAsync();

        var result = await userService.GetAllDriver();

        Assert.AreEqual(1, result.Count);

        var user2 = result[0];
        Assert.AreEqual(2, user2.Id);
        Assert.AreEqual("Jane", user2.Name);
        Assert.AreEqual("XYZ789", user2.LicensePlate);
        Assert.AreEqual(Role.Driver, user2.Role);
    }

    [Test]
    public async Task UpdateUserTest()
    {
        var db = GetMemoryContext();
        var userService = CreateUserService(db);
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var userToUpdate = new User
        {
            Id = 1,
            Name = "John Doe",
            Password = "123",
            LicensePlate = "ABC123",
            Role = Role.Driver
        };

        await db.Users.AddAsync(userToUpdate);
        await db.SaveChangesAsync();

        var updatedUser = new User
        {
            Id = 1,
            Name = "Jane Doe",
            LicensePlate = "DEF456",
            Role = Role.Driver
        };

        await userService.UpdateUser(updatedUser, 1);

        var userInDatabase = await userService.GetUser(1);

        Assert.AreEqual(updatedUser.Name, userInDatabase.Name);
        Assert.AreEqual(updatedUser.LicensePlate, userInDatabase.LicensePlate);
        Assert.AreEqual(updatedUser.Role, userInDatabase.Role);
    }

    [Test]
    public async Task DeleteUserTest()
    {
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
        }

        var userService = CreateUserService(db);
        var users = new List<User>
        {
            new User { Id = 1, Name = "John", Password = "123", LicensePlate = "", Role = Role.Admin },
            new User { Id = 2, Name = "Jane", Password = "asd", LicensePlate = "XYZ789", Role = Role.Driver }
        };

        foreach (var user in users)
        {
            var userToAdd = new UserDto()
            {
                Id = user.Id,
                Name = user.Name,
                LicensePlate = user.LicensePlate,
                Role = user.Role,
                Password = user.Password
            };
            await userService.AddUser(userToAdd);
        }

        await userService.DeleteUser(1);

        var result = await userService.GetAllUsers();

        Assert.AreEqual(1, result.Count);
        Assert.ThrowsAsync<ArgumentException>(async () => { await userService.GetUserForAuth(1); });
    }

    private SpeedyContext GetMemoryContext()
    {
        var options = new DbContextOptionsBuilder<SpeedyContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;
        return new SpeedyContext(options);
    }

    private UserService CreateUserService(SpeedyContext db)
    {
        var appset = new AppSettings
        {
            Secret = "test"
        };
        var options = Options.Create(appset);
        var userService = new UserService(db, options);
        return userService;
    }
}
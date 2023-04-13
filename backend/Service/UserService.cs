using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Model.Enum;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service;

public class UserService : IUserService
{
    private readonly SpeedyContext _context;

    public UserService(SpeedyContext context)
    {
        _context = context;
    }


    public async Task AddAdmin(Admin admin)
    {
        _context.Admins.Add(admin);
        await _context.SaveChangesAsync();
    }

    public async Task AddDriver(DriverDto driverDto)
    {
        var driver = new Driver
        {
            Name = driverDto.Name,
            LicensePlate = driverDto.LicensePlate,
            Role = Role.Driver
        };
        _context.Drivers.Add(driver);
        await _context.SaveChangesAsync();
    }


    public async Task<Admin> GetAdmin(long userId)
    {
        var admin = await _context.Admins
            .Where(r => r.Id == userId)
            .FirstOrDefaultAsync();

        if (admin == null)
        {
            throw new ArgumentException($"User with Id {admin.Id} does not exist");
        }

        return admin;
    }

    public async Task<DriverDto> GetDriver(long userId)
    {
     var driver = await _context.Drivers
            .Where(d => d.Id == userId)
            .Select(d => new DriverDto
            {
                Id = d.Id,
                Name = d.Name,
                LicensePlate = d.LicensePlate,
                OrderIds = d.Orders.Select(o => o.Id).ToList(),
                Role = Role.Driver
            })
            .FirstOrDefaultAsync();

        if (driver == null)
        {
            throw new ArgumentException($"User with Id {userId} does not exist");
        }
        
        return new DriverDto()
        {
            Id = driver.Id,
            Name = driver.Name,
            LicensePlate = driver.LicensePlate,
            OrderIds = driver.OrderIds,
            Role = Role.Driver
        };
    }

    public async Task<List<Admin>> GetAllAdmins()
    {
        var admins = await _context.Admins.ToListAsync();
        return admins;
    }

    public async Task<List<DriverDto>> GetAllDrivers()
    {
        var drivers = await _context.Drivers.Include(driver => driver.Orders).ToListAsync();
    
        return drivers.Select(driver => new DriverDto()
        {
            Id = driver.Id,
            Name = driver.Name,
            LicensePlate = driver.LicensePlate, 
            OrderIds = driver.Orders.Select(o => o.Id).ToList()
        }).ToList();
    }


    public async Task UpdateAdmin(Admin admin, long id)
    {
        var existingUser = await GetAdmin(id);
        if (existingUser == null)
        {
            throw new ArgumentException($"User with Id {admin.Id} does not exist");
        }

        admin.Id = id;
        _context.Entry(existingUser).State = EntityState.Detached;
        _context.Entry(admin).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task UpdateDriver(Driver driver, long id)
    {
        var existingUser = await GetAdmin(id);
        if (existingUser == null)
        {
            throw new ArgumentException($"User with Id {driver.Id} does not exist");
        }

        driver.Id = id;
        _context.Entry(existingUser).State = EntityState.Detached;
        _context.Entry(driver).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }


    public async Task DeleteAdmin(long id)
    {
        var admin = await GetAdmin(id);
        if (admin == null)
        {
            throw new ArgumentException($"User with Id {id} does not exist");
        }

        _context.Admins.Remove(admin);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteDriver(long id)
    {
        var driver = await GetDriver(id);
        if (driver == null)
        {
            throw new ArgumentException($"User with Id {id} does not exist");
        }

        var driverEntity = new Driver
        {
            Id = driver.Id,
            Name = driver.Name,
            LicensePlate = driver.LicensePlate,
            Orders = driver.OrderIds?.Select(id => new Order { Id = id }).ToList()
        };

        _context.Entry(driverEntity).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
    }
}
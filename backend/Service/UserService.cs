using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.dtoToShow;
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
   
    public async Task AddUser(UserDto userDto)
    {
        var user = new User
        {
            Name = userDto.Name,
            Password = userDto.Password,
            LicensePlate = userDto.LicensePlate,
            Role = userDto.Role
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
   

    public async Task<UserToShow> GetUser(long userId)
    {
     var user = await _context.Users
            .Where(d => d.Id == userId)
            .Select(d => new UserDto
            {
                Id = d.Id,
                Name = d.Name,
                LicensePlate = d.LicensePlate,
                Role = d.Role
            })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            throw new ArgumentException($"User with Id {userId} does not exist");
        }
        
        return new UserToShow()
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate,
            Role = user.Role
        };
    }
   
    public async Task<List<UserToShow>> GetAllUsers()
    {
        var users = await _context.Users.Include(user => user.Orders).ToListAsync();
    
        return users.Select(user => new UserToShow()
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate, 
            Role = user.Role,
            OrderIds = user.Orders.Select(o => o.Id).ToList()
        }).ToList();
    }
    
    public async Task<List<UserToShow>> GetAllAdmin()
    {
        var users = await _context.Users.Include(user => user.Orders).ToListAsync();
    
        return users.Where(user => user.Role == Role.Admin).Select(user => new UserToShow()
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate, 
            Role = user.Role,
            OrderIds = user.Orders.Select(o => o.Id).ToList()
        }).ToList();
    }
    
    public async Task<List<UserToShow>> GetAllDriver()
    {
        var users = await _context.Users.Include(user => user.Orders).ToListAsync();
    
        return users.Where(user => user.Role == Role.Driver).Select(user => new UserToShow()
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate, 
            Role = user.Role,
            OrderIds = user.Orders.Select(o => o.Id).ToList()
        }).ToList();
    }
    
    public async Task UpdateUser(User user, long id)
    {
        var userToUpdate = await _context.Users.Include(user => user.Orders)
                .FirstAsync(user => user.Id == id);

            userToUpdate.Name = user.Name;
            userToUpdate.LicensePlate = user.LicensePlate;
            userToUpdate.Role = user.Role;
            
            await _context.SaveChangesAsync();
    }

    public async Task DeleteUser(long id)
    {
        var user = await GetUser(id);
        if (user == null)
        {
            throw new ArgumentException($"User with Id {id} does not exist");
        }

        var userEntity = new User
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate,
            Orders = user.OrderIds?.Select(id => new Order { Id = id }).ToList()
        };

        _context.Entry(userEntity).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
    }
}
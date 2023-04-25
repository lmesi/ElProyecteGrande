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
   
    public async Task AddUser(UserDto userDto)
    {
        var user = new User
        {
            Name = userDto.Name,
            LicensePlate = userDto.LicensePlate,
            Role = userDto.Role
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
   

    public async Task<UserDto> GetUser(long userId)
    {
     var user = await _context.Users
            .Where(d => d.Id == userId)
            .Select(d => new UserDto
            {
                Id = d.Id,
                Name = d.Name,
                LicensePlate = d.LicensePlate,
                OrderIds = d.Orders.Select(o => o.Id).ToList(),
                Role = d.Role
            })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            throw new ArgumentException($"User with Id {userId} does not exist");
        }
        
        return new UserDto()
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate,
            OrderIds = user.OrderIds,
            Role = user.Role
        };
    }
   
    public async Task<List<UserDto>> GetAllUsers()
    {
        var users = await _context.Users.Include(user => user.Orders).ToListAsync();
    
        return users.Select(user => new UserDto()
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate, 
            Password = user.Password,
            OrderIds = user.Orders.Select(o => o.Id).ToList()
        }).ToList();
    }
    
    public async Task UpdateUser(User user, long id)
    {
        var existingUser = await GetUser(id);
        if (existingUser == null)
        {
            throw new ArgumentException($"User with Id {user.Id} does not exist");
        }
        
        user.Id = id;
        _context.Entry(existingUser).State = EntityState.Detached;
        _context.Entry(user).State = EntityState.Modified;
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
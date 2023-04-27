using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend._JWTAuth;
using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.dtoToShow;
using Backend.Model.Entities;
using Backend.Model.Enum;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Service;

public class UserService : IUserService
{
    private readonly SpeedyContext _context;
    private readonly AppSettings _appSettings;
    public UserService(SpeedyContext context, IOptions<AppSettings> appSettings)
    {
        _appSettings = appSettings.Value;
        _context = context;
    }
    
    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
    {
        var users = await GetAllUsersForAuth();
        var user = users.SingleOrDefault(x => x.Name == model.Username && x.Password == model.Password);
        
        // return null if user not found
        if (user == null) return null;

        // authentication successful so generate jwt token
        var token = generateJwtToken(user);
        
        var userRole = users.SingleOrDefault(u => u.Name == model.Username).Role;
        user.Role = userRole;

        return new AuthenticateResponse(user, token);
    }
    
    private string generateJwtToken(User user)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
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
   
    public async Task<User> GetUserForAuth(long userId)
    {
        var user = await _context.Users
            .Where(d => d.Id == userId)
            .Select(d => new User
            {
                Id = d.Id,
                Name = d.Name,
                Password = d.Password,
                Role = d.Role,
                LicensePlate = d.LicensePlate
            })
            .FirstOrDefaultAsync();

        if (user == null)
        {
            throw new ArgumentException($"User with Id {userId} does not exist");
        }
        
        return new User()
        {
            Id = user.Id,
            Name = user.Name,
            Password = user.Password,
            Role = user.Role,
            LicensePlate = user.LicensePlate

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
    
    public async Task<List<User>> GetAllUsersForAuth()
    {
        var users = await _context.Users.Include(user => user.Orders).ToListAsync();
    
        return users.Select(user => new User()
        {
            Id = user.Id,
            Name = user.Name,
            LicensePlate = user.LicensePlate,
            Role = user.Role,
            Password = user.Password,
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
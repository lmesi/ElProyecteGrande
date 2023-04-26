using Backend.Model.DTO;
using Backend.Model.Entities;

namespace Backend.Service;

public interface IUserService
{
    Task AddUser(UserDto driverDto);
    Task<UserDto> GetUser(long userId);
    Task<List<UserDto>> GetAllUsers();
    Task<List<UserDto>> GetAllAdmin();
    Task<List<UserDto>> GetAllDriver();
    
    Task UpdateUser(User driver, long id);
    Task DeleteUser(long id);

}
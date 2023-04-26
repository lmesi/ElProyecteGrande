using Backend.Model.DTO;
using Backend.Model.dtoToShow;
using Backend.Model.Entities;

namespace Backend.Service;

public interface IUserService
{
    Task AddUser(UserDto driverDto);
    Task<UserToShow> GetUser(long userId);
    Task<List<UserToShow>> GetAllUsers();
    Task<List<UserToShow>> GetAllAdmin();
    Task<List<UserToShow>> GetAllDriver();
    
    Task UpdateUser(User driver, long id);
    Task DeleteUser(long id);

}
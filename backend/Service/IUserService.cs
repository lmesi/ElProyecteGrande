using Backend.Model.DTO;
using Backend.Model.Entities;

namespace Backend.Service;

public interface IUserService
{
    Task AddAdmin(Admin admin);
    Task AddDriver(DriverDto driverDto);

    Task<DriverDto> GetDriver(long userId);
    Task<Admin> GetAdmin(long userId);


    Task<List<DriverDto>> GetAllDrivers();
    Task<List<Admin>> GetAllAdmins();
    Task UpdateDriver(Driver driver, long id);
    Task UpdateAdmin(Admin admin, long id);

    Task DeleteDriver(long id);
    Task DeleteAdmin(long id);

}
using Backend.Model.Enum;

namespace Backend.Model.Entities;

public class Driver : User
{
    public string LicensePlate { get; set; }
    public List<Order> Orders { get; set; }

    public override Role Role { get; set; } = Role.Driver;
}
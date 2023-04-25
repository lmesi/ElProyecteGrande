using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;

namespace Backend.Model.DTO;

public class UserDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string LicensePlate { get; set; }
    public List<long> OrderIds { get; set; }
    public Role Role { get; set; } = Role.Driver;
}
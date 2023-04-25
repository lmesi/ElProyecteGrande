using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;

namespace Backend.Model.Entities;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    
    public string Password { get; set; }
    
    public Role Role { get; set; }

    public string LicensePlate { get; set; }
    
    public List<Order> Orders { get; set; }
}
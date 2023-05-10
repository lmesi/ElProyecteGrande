using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;
using Newtonsoft.Json;

namespace Backend.Model.Entities;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    
    public string Password { get; set; }
    
    public Role Role { get; set; }

    public string LicensePlate { get; set; }
    [JsonIgnore]
    public List<Order> Orders { get; set; } = new();
}
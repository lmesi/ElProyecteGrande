using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;
using Newtonsoft.Json;

namespace Backend.Model.DTO;

public class UserDto
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    [JsonIgnore]
    public string LicensePlate { get; set; }
    public Role Role { get; set; }
}
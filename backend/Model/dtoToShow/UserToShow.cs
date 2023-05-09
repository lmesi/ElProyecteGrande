using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;
using Newtonsoft.Json;

namespace Backend.Model.dtoToShow;

public class UserToShow
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    
    public string LicensePlate { get; set; }
    
    [JsonIgnore]
    public List<long> OrderIds { get; set; }
    
    public Role Role { get; set; }
}
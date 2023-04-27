using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;

namespace Backend.Model.dtoToShow;

public class UserToShow
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    
    public string LicensePlate { get; set; }
    
    public List<long> OrderIds { get; set; }
    
    public Role Role { get; set; }
}
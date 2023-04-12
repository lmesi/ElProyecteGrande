using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.DTO;

public class CompanyDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public List<long> OrderIds { get; set; }
}
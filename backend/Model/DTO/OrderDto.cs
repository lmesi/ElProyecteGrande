using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;

namespace Backend.Model.DTO;

public class OrderDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public long CompanyId { get; set; }
    public string LoadingAddress { get; set; }
    public string UnloadingAddress { get; set; }
    public DateTime UnloadingDate { get; set; }
    public long DriverId { get; set; }
    public Goods Goods { get; set; }
}
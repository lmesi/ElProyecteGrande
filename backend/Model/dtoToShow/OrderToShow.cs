using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.dtoToShow;

public class OrderToShow
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string CompanyName { get; set; }
    public string LoadingAddress { get; set; }
    public string UnloadingAddress { get; set; }
    public DateTime? UnloadingDate { get; set; } = null;
    public string DriverName { get; set; }
    public string GoodsName { get; set; }
}
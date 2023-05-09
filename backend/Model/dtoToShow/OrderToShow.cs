using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.dtoToShow;

public class OrderToShow
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string CompanyName { get; set; }
    public string LoadingAddress { get; set; }
    public string UnloadingAddress { get; set; }
    public DateTime? UnloadingDate { get; set; } = null;
    public string UserName { get; set; }
    public string GoodsName { get; set; }
}
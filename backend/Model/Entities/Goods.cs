using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.Entities;

public class Goods
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    public List<Order> Orders { get; set; }
}
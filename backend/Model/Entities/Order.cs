using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;

namespace Backend.Model.Entities;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public Company Company { get; set; }
    public string LoadingAddress { get; set; }
    public string UnloadingAddress { get; set; }
    public DateTime? UnloadingDate { get; set; } = null;
    public User User { get; set; }
    public Goods Goods { get; set; }
}
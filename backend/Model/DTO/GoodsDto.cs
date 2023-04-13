using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model.DTO;

public class GoodsDto
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
}
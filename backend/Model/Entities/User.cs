using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model.Enum;

namespace Backend.Model.Entities;

public abstract class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    public abstract Role Role { get; set; }
}
using Backend.Model.Enum;

namespace Backend.Model.Entities;

public class Admin : User
{
    public override Role Role { get; set; } = Role.Admin;
}
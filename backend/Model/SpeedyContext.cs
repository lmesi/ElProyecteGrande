using Backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Model;

public class SpeedyContext : DbContext
{
    public SpeedyContext(DbContextOptions<SpeedyContext> options) : base(options)
    {
        Database.SetCommandTimeout(60);
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Goods> Goods { get; set; }
}
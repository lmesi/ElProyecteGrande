using Backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Model;

public class SpeedyContext : DbContext
{
    public SpeedyContext(DbContextOptions<SpeedyContext> options) : base(options)
    {
        Database.SetCommandTimeout(60);
    }

    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     // Set the query timeout to 60 seconds
    // }

    public DbSet<User> Users { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Goods> Goods { get; set; }
}
using Backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Model;

public class SpeedyContext : DbContext
{
    public SpeedyContext(DbContextOptions<SpeedyContext> options) : base(options)
    {
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(@"DataSource=db/database.db;");
    }

    public DbSet<Admin> Admins { get; set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<GoodsEntity> Goods { get; set; }
}
using Backend.Model;
using Backend.Model.Entities;

namespace Backend.Data;

public static class DbInitializer
{
    public static void Initialize(SpeedyContext context)
    {
        context.Database.EnsureCreated();

        // Look for any students.
        if (context.Admins.Any())
        {
            return; // DB has been seeded
        }

        var admins = new Admin[]
        {
            new Admin { Name = "Admin1" },
            new Admin { Name = "Admin2" },
            new Admin { Name = "Admin3" }
        };

        var drivers = new Driver[]
        {
            new Driver{LicensePlate = "AABB123", Name = "Driver1", Orders = null},
            new Driver{LicensePlate = "AABB124", Name = "Driver2", Orders = null}
        };

        var companies = new Company[]
        {
            new Company { Address = "Oslo(N)", Name = "Company1", Orders = null },
            new Company { Address = "Budapest(H)", Name = "Company2", Orders = null }
        };

        foreach (var admin in admins)
        {
            context.Admins.Add(admin);
        }
        
        foreach (var driver in drivers)
        {
            context.Drivers.Add(driver);
        }
        
        foreach (var company in companies)
        {
            context.Companies.Add(company);
        }

        context.SaveChanges();
    }
}
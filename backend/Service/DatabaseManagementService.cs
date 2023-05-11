using Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service;

public class DatabaseManagementService
{
    public static void MigrationInitialisation(IApplicationBuilder app)
    {
        using (var serviceScope = app.ApplicationServices.CreateScope())
        {
            serviceScope.ServiceProvider.GetService<SpeedyContext>().Database.Migrate();
        }
    }

}
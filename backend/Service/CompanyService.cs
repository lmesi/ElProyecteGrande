using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Service;

public class CompanyService : ICompanyService
{
    private readonly SpeedyContext _context;

    public CompanyService(SpeedyContext context)
    {
        _context = context;
    }
    
    public async Task<bool> AddCompany(CompanyDto companyDto)
    {
        try
        {
            var companyToAdd = new Company
            {
                Name = companyDto.Name,
                Address = companyDto.Address,
                Orders = new List<Order>()
            };
        
            await _context.Companies.AddAsync(companyToAdd);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
    
    public async Task<List<Company>> GetAllCompanies()
    {
        
        return await _context.Companies.Include(company => company.Orders).ToListAsync();
        
    }

    public async Task<bool> UpdateCompany(CompanyDto companyDto, long id)
    {
        try
        {
            var companyToUpdate = await _context.Companies.Include(company => company.Orders)
                .FirstAsync(company => company.Id == id);
        
            companyToUpdate.Address = companyDto.Address;
            companyToUpdate.Name = companyDto.Name;

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public async Task<bool> DeleteCompany(long id)
    {
        try
        {
            var companyToDelete = await _context.Companies.FirstAsync(company => company.Id == id);
            _context.Companies.Remove(companyToDelete);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}
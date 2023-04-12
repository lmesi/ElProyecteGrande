using Backend.Model.DTO;
using Backend.Model.Entities;

namespace Backend.Service;

public interface ICompanyService
{
    Task<bool> AddCompany(CompanyDto companyDto);
    Task<List<Company>> GetAllCompanies();
    Task<bool> UpdateCompany(CompanyDto companyDto, long id);
    Task<bool> DeleteCompany(long id);
}
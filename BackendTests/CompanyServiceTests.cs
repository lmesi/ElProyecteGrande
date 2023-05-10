using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Model;
using Backend.Model.DTO;
using Backend.Model.Entities;
using Backend.Service;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace BackendTests;

public class CompanyServiceTests
{
    [SetUp]
    public void Setup()
    {
        var db = GetMemoryContext();
        if (db.Database.IsInMemory())
        {
            db.Database.EnsureDeleted();
            
            db.Companies.Add(new Company
            {
                Address = "address1",
                Name = "company1",
                Orders = new List<Order>()
            });
            db.Companies.Add(new Company
            {
                Address = "address2",
                Name = "company2",
                Orders = new List<Order>()
            });
            db.Companies.Add(new Company
            {
                Address = "address3",
                Name = "company3",
                Orders = new List<Order>()
            });
            db.Companies.Add(new Company
            {
                Address = "address4",
                Name = "company4",
                Orders = new List<Order>()
            });
            db.Companies.Add(new Company
            {
                Address = "address5",
                Name = "company5",
                Orders = new List<Order>()
            });
            
            db.SaveChanges();
        }
    }

    [Test]
    public async Task GetAllCompaniesTest()
    {
        var db = GetMemoryContext();
        var service = new CompanyService(db);
        var companies = await service.GetAllCompanies();
        
        Assert.That(companies.Count, Is.EqualTo(5));
    }

    [Test]
    public async Task UpdateCompanySuccessTest()
    {
        var db = GetMemoryContext();
        var service = new CompanyService(db);

        var companyToUpdateDto = new CompanyDto
        {
            Name = "company1",
            Address = "addressUpdated"
        };

        var result = await service.UpdateCompany(companyToUpdateDto, 1);
        
        Assert.True(result);
    }
    
    [Test]
    public async Task UpdateCompanyFailTest()
    {
        var db = GetMemoryContext();
        var service = new CompanyService(db);

        var companyToUpdateDto = new CompanyDto
        {
            Name = "company1",
            Address = "addressUpdated"
        };

        var result = await service.UpdateCompany(companyToUpdateDto, 888);
        
        Assert.False(result);
    }

    [Test]
    public async Task DeleteCompanySuccessTest()
    {
        var db = GetMemoryContext();
        var service = new CompanyService(db);

        var result = await service.DeleteCompany(2);

        var companies = await service.GetAllCompanies();
        
        Assert.True(result);
        Assert.That(companies.Count, Is.EqualTo(4));
    }
    
    [Test]
    public async Task DeleteCompanyFailTest()
    {
        var db = GetMemoryContext();
        var service = new CompanyService(db);

        var result = await service.DeleteCompany(888);

        var companies = await service.GetAllCompanies();
        
        Assert.False(result);
        Assert.That(companies.Count, Is.EqualTo(5));
    }

    [Test]
    public async Task AddCompanySuccessTest()
    {
        var db = GetMemoryContext();
        var service = new CompanyService(db);

        var companyToAddDto = new CompanyDto
        {
           Name = "newCompany",
           Address = "newAddress"
        };
        var result = await service.AddCompany(companyToAddDto);
        var companies = await service.GetAllCompanies();
        
        Assert.True(result);
        Assert.That(companies.Count, Is.EqualTo(6));
    }
    
    [Test]
    public async Task AddCompanyFailTest()
    {
        var db = GetMemoryContext();
        var service = new CompanyService(db);

        var companyToAddDto = new CompanyDto
        {
            Name = "newCompany"
        };
        
        var result = await service.AddCompany(companyToAddDto);
        var companies = await service.GetAllCompanies();
        
        Assert.False(result);
        Assert.That(companies.Count, Is.EqualTo(5));
    }
    private SpeedyContext GetMemoryContext()
    {
        var options = new DbContextOptionsBuilder<SpeedyContext>()
            .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
            .Options;
        return new SpeedyContext(options);
    }
}
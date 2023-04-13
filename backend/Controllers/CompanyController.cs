using Backend.Model.DTO;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


 [ApiController, Route("/Companies")]
 public class CompanyController : ControllerBase
    { 
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        private const string ErrorMessage = "Not found or bad request!";
        
        [HttpGet]
        public async Task<IActionResult> GetAllCompanies()
        {
            var companies= await _companyService.GetAllCompanies();
            return companies.Count == 0 ? NotFound() : Ok(companies);
        }
        
        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] CompanyDto companyDto)
        {
            var success = await _companyService.AddCompany(companyDto);
            return success ? Ok("New company added") : Content(ErrorMessage);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany([FromBody] CompanyDto companyDto, long id)
        {
            var success = await _companyService.UpdateCompany(companyDto, id);
            return success ? Ok("Company updated") : Content(ErrorMessage);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(long id)
        {
            var success = await _companyService.DeleteCompany(id);
            return success ? Ok("Company deleted") : Content(ErrorMessage);
        }
    }

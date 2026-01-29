using Microsoft.AspNetCore.Mvc;
using Admin.Models;

namespace Admin.Controllers
{
    [Route("api/admin/hospitals")]
    [ApiController]
    public class AdminHospitalController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        public AdminHospitalController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ✅ Get All Registered Hospitals/BloodBanks
        [HttpGet("all")]
        public IActionResult GetAllHospitals()
        {
            var hospitals = _context.HbDetails.ToList();
            return Ok(hospitals);
        }
    }
}

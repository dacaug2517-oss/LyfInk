using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Admin.Models;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        public ReportController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ✅ Report for Hospitals Registered by Admin
        [HttpGet("admin/{adminId}")]
        public async Task<IActionResult> GetAdminHospitalReport(int adminId)
        {
            // ✅ Step 1: Get Hospitals Registered by Admin
            var hospitals = await _context.HbDetails
                .Where(h => h.Uid == adminId)
                .ToListAsync();

            // ✅ Step 2: Build Report Data
            var report = hospitals.Select(h => new
            {
                HospitalId = h.Hbid,
                HospitalName = h.HbName,
                Type = h.Type,

                // ✅ Total Stock Units
                TotalStock = _context.BloodStocks
                    .Where(s => s.Hbid == h.Hbid)
                    .Sum(s => (int?)s.Ml) ?? 0,

                // ✅ Total Donations Received
                TotalDonations = _context.DonorDonations
                    .Where(d => d.Hbid == h.Hbid)
                    .Count(),

                // ✅ Total Camps Conducted
                TotalCamps = _context.DonationCamps
                    .Where(c => c.Hbid == h.Hbid)
                    .Count()
            });

            return Ok(report);
        }
    }
}

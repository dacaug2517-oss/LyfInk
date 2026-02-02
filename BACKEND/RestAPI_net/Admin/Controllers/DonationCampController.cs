using Admin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationCampController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        public DonationCampController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ============================================================
        // ✅ Get Donation Camps Created by Hospitals Registered by Admin
        // ============================================================

        [HttpGet("admin/{uid}")]
        public async Task<IActionResult> GetCampsByAdmin(int uid)
        {
            try
            {
                // ✅ Step 1: Get Hospital IDs registered by this Admin
                var hospitalIds = await _context.HbDetails
                    .Where(h => h.Uid == uid)     // Admin ID stored here
                    .Select(h => h.Hbid)
                    .ToListAsync();

                // ✅ Step 2: Get Camps created by those Hospitals
                var camps = await _context.DonationCamps
                    .Where(c => hospitalIds.Contains(c.Hbid.Value))
                    .ToListAsync();

                return Ok(camps);
            }
            catch (Exception ex)
            {
                return BadRequest("Error fetching camps: " + ex.Message);
            }
        }

        // ============================================================
        // ✅ Get Camps By Hospital ID
        // ============================================================

        [HttpGet("hospital/{hbid}")]
        public async Task<IActionResult> GetCampsByHospital(int hbid)
        {
            var camps = await _context.DonationCamps
                .Where(c => c.Hbid == hbid)
                .ToListAsync();

            return Ok(camps);
        }

        // ============================================================
        // ✅ Create New Donation Camp
        // ============================================================

        [HttpPost]
        public async Task<IActionResult> CreateCamp(DonationCamp camp)
        {
            try
            {
                _context.DonationCamps.Add(camp);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Donation Camp Created Successfully",
                    camp
                });
            }
            catch (Exception ex)
            {
                return BadRequest("Error creating camp: " + ex.Message);
            }
        }

        // ============================================================
        // ✅ Delete Camp By Camp ID
        // ============================================================

        [HttpDelete("{cid}")]
        public async Task<IActionResult> DeleteCamp(int cid)
        {
            var camp = await _context.DonationCamps.FindAsync(cid);

            if (camp == null)
                return NotFound("Camp Not Found");

            _context.DonationCamps.Remove(camp);
            await _context.SaveChangesAsync();

            return Ok("Camp Deleted Successfully");
        }
    }
}

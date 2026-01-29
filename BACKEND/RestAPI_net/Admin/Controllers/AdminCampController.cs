using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Admin.Models;

namespace Admin.Controllers
{
    [Route("api/admin/camps")]
    [ApiController]
    public class AdminCampController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        public AdminCampController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ✅ View All Donation Camps
        [HttpGet("all")]
        public async Task<IActionResult> GetAllCamps()
        {
            var camps = await _context.DonationCamps
                .Include(c => c.Hb)
                .ToListAsync();

            return Ok(camps);
        }
    }
}

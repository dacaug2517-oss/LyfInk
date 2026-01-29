using Admin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HbDetailsController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        public HbDetailsController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ✅ GET Hospitals Registered By Admin
        // GET: api/HbDetails/admin/27
        [HttpGet("admin/{adminId}")]
        public async Task<IActionResult> GetHospitalsByAdmin(int adminId)
        {
            try
            {
                var hospitals = await _context.HbDetails
                    .Where(h => h.Uid == adminId)
                    .Select(h => new
                    {
                        h.Hbid,
                        h.HbName,
                        h.HbEmail,
                        h.HbPhno,
                        h.RegNo,
                        h.GstNo,
                        h.Type
                    })
                    .ToListAsync();

                return Ok(hospitals);
            }
            catch (Exception ex)
            {
                return BadRequest("Backend Error: " + ex.Message);
            }
        }
    }
}

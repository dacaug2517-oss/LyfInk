using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Admin.Models;

namespace Admin.Controllers
{
    [Route("api/admin/stock")]
    [ApiController]
    public class AdminStockController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        public AdminStockController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ✅ Hospital-wise Blood Stock Summary
        [HttpGet("all")]
        public async Task<IActionResult> GetAllStock()
        {
            var stockSummary = await _context.BloodStocks
                .Include(s => s.Hb)
                .Include(s => s.Bc)
                .GroupBy(s => new { s.Hbid, s.Bcid })
                .Select(g => new
                {
                    HospitalName = g.First().Hb.HbName,
                    BloodType = g.First().Bc.BcName,
                    TotalMl = g.Sum(x => x.Ml)
                })
                .ToListAsync();

            return Ok(stockSummary);
        }
    }
}

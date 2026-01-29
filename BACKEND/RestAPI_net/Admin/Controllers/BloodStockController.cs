using Admin.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodStockController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        public BloodStockController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ✅ GET: api/BloodStock
        [HttpGet]
        public async Task<IActionResult> GetBloodStocks()
        {
            var stockList = await _context.BloodStocks
                .Select(s => new
                {
                    bsid = s.Bsid,

                    // ✅ Hospital Name instead of Hospital ID
                    hospitalName = s.Hb.HbName,

                    // ✅ Blood Component Name instead of Component ID
                    componentName = s.Bc.BcName,

                    ml = s.Ml,
                    expiryDate = s.ExpiryDate
                })
                .ToListAsync();

            return Ok(stockList);
        }
    }
}

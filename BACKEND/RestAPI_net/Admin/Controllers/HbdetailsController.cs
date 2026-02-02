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

        // ============================================================
        // ✅ GET Hospitals Registered By Admin
        // GET: api/HbDetails/admin/27
        // ============================================================

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

        // ============================================================
        // ✅ DELETE Hospital By HBID
        // DELETE: api/HbDetails/5
        // ============================================================

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteHospital(int id)
        //{
        //    try
        //    {
        //        var hospital = await _context.HbDetails.FindAsync(id);

        //        if (hospital == null)
        //            return NotFound("Hospital Not Found");

        //        _context.HbDetails.Remove(hospital);
        //        await _context.SaveChangesAsync();

        //        return Ok("Hospital Deleted Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Error deleting hospital: " + ex.Message);
        //    }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHospital(int id)
        {
            try
            {
                var hospital = await _context.HbDetails.FindAsync(id);

                if (hospital == null)
                    return NotFound("Hospital Not Found");

                // ✅ Step 1: Delete Donation Camps linked to this hospital
                var camps = _context.DonationCamps.Where(c => c.Hbid == id);
                _context.DonationCamps.RemoveRange(camps);

                // ✅ Step 2: Delete Blood Stocks linked to this hospital
                var stocks = _context.BloodStocks.Where(s => s.Hbid == id);
                _context.BloodStocks.RemoveRange(stocks);

                // ✅ Step 3: Delete Donor Donations linked to this hospital
                var donations = _context.DonorDonations.Where(d => d.Hbid == id);
                _context.DonorDonations.RemoveRange(donations);

                // ✅ Step 4: Now Delete Hospital
                _context.HbDetails.Remove(hospital);

                await _context.SaveChangesAsync();

                return Ok("Hospital Deleted Successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Error deleting hospital: " + ex.Message);
            }
        }
        // ============================================================
        // ✅ UPDATE Hospital By HBID
        // PUT: api/HbDetails/9
        // ============================================================

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHospital(int id, [FromBody] HbDetail hospital)
        {
            try
            {
                var existingHospital = await _context.HbDetails.FindAsync(id);

                if (existingHospital == null)
                    return NotFound("Hospital Not Found");

                // ✅ Update Editable Fields
                existingHospital.HbName = hospital.HbName;
                existingHospital.HbEmail = hospital.HbEmail;
                existingHospital.HbPhno = hospital.HbPhno;
                existingHospital.RegNo = hospital.RegNo;
                existingHospital.GstNo = hospital.GstNo;
                existingHospital.Type = hospital.Type;
                existingHospital.HbPassword = hospital.HbPassword;

                // ❌ Do not update UID
                await _context.SaveChangesAsync();

                return Ok("Hospital Updated Successfully");
            }
            catch (Exception ex)
            {
                return BadRequest("Update Error: " + ex.Message);
            }
        }




    }
}

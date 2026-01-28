using Microsoft.AspNetCore.Mvc;
using Admin.Models;
using System.Linq;

namespace Admin.Controllers
{
    [Route("api/system")]
    [ApiController]
    public class SystemController : ControllerBase
    {
        private readonly P17BloodbankContext db;

        public SystemController(P17BloodbankContext context)
        {
            db = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var user = db.Users.FirstOrDefault(x =>
                x.Email == loginUser.Email &&
                x.Password == loginUser.Password
            );

            if (user == null)
                return Unauthorized("Invalid Email or Password");

            return Ok(new
            {
                message = "Login Successful",
                userId = user.Userid,

                // ✅ Correct Name Mapping
                name = user.Firstname + " " + user.Lastname,

                // ✅ Role ID (1=Admin,2=Hospital,3=BloodBank)
                roleId = user.Rid
            });
        }

        [HttpPost("register-hb")]
        public IActionResult RegisterHb(int adminId, [FromBody] HbDetail hb)
        {
            // ✅ Check if Admin exists (Rid = 1 means Admin)
            var adminUser = db.Users.FirstOrDefault(x =>
                x.Userid == adminId && x.Rid == 1
            );

            if (adminUser == null)
                return Unauthorized("Only Admin can register Hospital/BloodBank!");

            // ✅ Link HB record with Admin Userid
            hb.Uid = adminId;

            // ✅ Save Hospital/BloodBank into HbDetails table
            db.HbDetails.Add(hb);
            db.SaveChanges();

            return Ok(new
            {
                message = "Hospital/BloodBank Registered Successfully",
                hbId = hb.Hbid
            });
        }

        [HttpGet("hb-list")]
        public IActionResult GetHbList()
        {
            var list = db.HbDetails.Select(x => new
            {
                x.Hbid,
                x.HbName,
                x.HbEmail,
                x.HbPhno,

                // ✅ Type Meaning
                Type = x.Type == 1 ? "Hospital" : "BloodBank",

                // ✅ Admin who registered it
                RegisteredByAdminId = x.Uid
            }).ToList();

            return Ok(list);
        }
    }
}

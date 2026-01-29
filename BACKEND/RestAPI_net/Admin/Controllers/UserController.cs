using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Admin.Models;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly P17BloodbankContext _context;

        // ✅ Constructor Injection
        public UserController(P17BloodbankContext context)
        {
            _context = context;
        }

        // ====================================================
        // ✅ GET USER DETAILS BY ID (From users table)
        // ====================================================
        // URL: GET http://localhost:5000/api/User/27
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            // ✅ Fetch user from users table
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Userid == id);

            // ❌ If user not found
            if (user == null)
            {
                return NotFound("User not found!");
            }

            // ✅ Return required fields only
            var result = new
            {
                userid = user.Userid,
                firstname = user.Firstname,
                lastname = user.Lastname,
                email = user.Email,
                rid = user.Rid
            };

            return Ok(result);
        }
    }
}

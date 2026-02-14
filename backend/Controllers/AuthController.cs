using backend.Data;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Library.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            if (string.IsNullOrEmpty(user.Username) ||
                string.IsNullOrEmpty(user.Email) ||
                string.IsNullOrEmpty(user.PasswordHash))
            {
                return BadRequest("All fields are required");
            }

            user.PasswordHash = PasswordHelper.Hash(user.PasswordHash);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully");
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(User login)
        {
            var hash = PasswordHelper.Hash(login.PasswordHash);

            var user = _context.Users.FirstOrDefault(u =>
                u.Email == login.Email &&
                u.PasswordHash == hash);

            if (user == null)
                return Unauthorized("Invalid credentials");

            return Ok(user);
        }
    }
}
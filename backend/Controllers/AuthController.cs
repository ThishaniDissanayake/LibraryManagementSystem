using backend.Data;
using backend.DTOs;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
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
        public IActionResult Register(RegisterDto registerDto)
        {
            if (string.IsNullOrEmpty(registerDto.Username) ||
                string.IsNullOrEmpty(registerDto.Email) ||
                string.IsNullOrEmpty(registerDto.PasswordHash))
            {
                return BadRequest("All fields are required");
            }

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = PasswordHelper.Hash(registerDto.PasswordHash)
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully");
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var hash = PasswordHelper.Hash(loginDto.PasswordHash);

            var user = _context.Users.FirstOrDefault(u =>
                u.Email == loginDto.Email &&
                u.PasswordHash == hash);

            if (user == null)
                return Unauthorized("Invalid credentials");

            return Ok(new { username = user.Username, email = user.Email });
        }
    }
}
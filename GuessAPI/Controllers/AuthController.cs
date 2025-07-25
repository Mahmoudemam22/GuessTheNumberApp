using Application.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Auth;
using Microsoft.AspNetCore.Mvc;

namespace GuessAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(ITokenService tokenService, IUserRepository userRepo) : ControllerBase
    {
        private readonly IUserRepository _userRepo = userRepo;
        private readonly ITokenService _tokenService = tokenService;


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Username and password are required.");

            if (_userRepo == null)
                throw new Exception("_userRepo is not injected!");

            if (await _userRepo.UsernameExistsAsync(dto.Username))
                return BadRequest("Username already exists");

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            await _userRepo.AddUserAsync(user);
            return Ok(new { message = "User registered" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _userRepo.GetByUsernameAsync(dto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            var token = _tokenService.CreateToken(user.Username);
            return Ok(new { token });
        }
    }
}
using Application.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GuessAPI.Controllers
{
    [ApiController]
    [Route("api/game")]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private static Dictionary<string, (int target, int attempts)> _gameStates = new();

        public GameController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpPost("guess")]
        public async Task<IActionResult> Guess(GuessDTO dto)
        {
            var username = User.Identity?.Name;
            if (string.IsNullOrEmpty(username))
                return Unauthorized("Invalid token");

            if (!_gameStates.ContainsKey(username))
                _gameStates[username] = (new Random().Next(1, 42), 0);

            var (target, attempts) = _gameStates[username];
            attempts++;
            _gameStates[username] = (target, attempts);

            if (dto.Guess < target)
                return Ok(new { message = "Higher" });

            if (dto.Guess > target)
                return Ok(new { message = "Lower" });


            var user = await _userRepo.GetByUsernameAsync(username);
            if (user != null && (user.LowestGuessCount == null || attempts < user.LowestGuessCount))
            {
                user.LowestGuessCount = attempts;
                await _userRepo.UpdateUserAsync(user);
            }

            _gameStates.Remove(username);
            return Ok(new { message = $"Correct! Guessed in {attempts} attempts." });
        }

        [HttpGet("best")]
        public async Task<IActionResult> Best()
        {
            var username = User.Identity?.Name;
            var user = await _userRepo.GetByUsernameAsync(username);
            return Ok(new { user?.LowestGuessCount });
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard()
        {
            var leaderboard = await _userRepo.GetTopScoresAsync();
            return Ok(leaderboard.Select(entry => new
            {
                Username = entry.Username,
                Guesses = entry.GuessCount
            }));
        }
    }
}
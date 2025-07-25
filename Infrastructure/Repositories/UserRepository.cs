using Core.Entities;
using Core.Interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<bool> UsernameExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<List<(string Username, int GuessCount)>> GetTopScoresAsync()
        {
            return await _context.Users
                .Where(u => u.LowestGuessCount != null)
                .OrderBy(u => u.LowestGuessCount)
                .Take(5)
                .Select(u => new ValueTuple<string, int>(u.Username, u.LowestGuessCount.Value))
                .ToListAsync();
        }
    }
}

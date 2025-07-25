using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<bool> UsernameExistsAsync(string username);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task<List<(string Username, int GuessCount)>> GetTopScoresAsync();
    }
}

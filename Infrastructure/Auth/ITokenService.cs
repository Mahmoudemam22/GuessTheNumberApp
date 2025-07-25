namespace Infrastructure.Auth
{
    public interface ITokenService
    {
        string CreateToken(string username);
    }
}
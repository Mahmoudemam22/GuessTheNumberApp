using Core.Interfaces;
using Infrastructure.Auth;
using Infrastructure.Context;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GuessAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            //builder.Services.AddDbContext<ApplicationDbContext>(opt =>
            //{
            //    opt.UseNpgsql(builder.Configuration.GetConnectionString("ApplicationDefault"));
            //});
            builder.Services.AddDbContext<ApplicationDbContext>(opt =>
            {
                opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddCors();

            // Dependency Injection
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<ITokenService, TokenService>();

            builder.Services.AddAuthentication("Bearer")
              .AddJwtBearer("Bearer", opt =>
              {
                  opt.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuer = false,
                      ValidateAudience = false,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = new SymmetricSecurityKey(
                          Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                  };
              });

            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }


            app.UseHttpsRedirection();

            app.UseCors(C => C.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}

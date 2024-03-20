using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Model.DBModels;
using Persistance;
using UserManagementAPI.RequestHelpers;
using UserManagementAPI.Services.Interfaces;
using UserManagementAPI.Services.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Register DB services
builder.Services.AddDbContext<UserDBContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("dbconn")));

builder.Services.AddIdentityCore<User>(opt => 
{
  opt.Password.RequireNonAlphanumeric = false;
  opt.User.RequireUniqueEmail = true;
}).AddRoles<Role>().AddEntityFrameworkStores<UserDBContext>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddCors();
builder.Services.AddScoped<TokenService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
            };
        });

builder.Services.AddAuthorization();



// Apply middleware in request pipeline
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    //Resolve dbcontext with DI help
    var dbcontext = (UserDBContext)scope.ServiceProvider.GetService(typeof(UserDBContext));
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    //call your static method herer

    await UserDBInitializer.Initialize(dbcontext, userManager);
}

app.UseCors(opt =>
    {
        opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
    }
);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();



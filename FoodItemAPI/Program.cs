using System.Text;
using FoodItemAPI.Services.Interfaces;
using FoodItemAPI.Services.Repository;
using FoodItemAPI.Static;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistance;
using Persistance.DBInitializers;

var builder = WebApplication.CreateBuilder(args);

// Register Controller service
builder.Services.AddControllers();

// REgister DB connection
builder.Services.AddDbContext<DBContext>(opt => 
{
  opt.UseSqlServer(builder.Configuration.GetConnectionString("dbconn"));
});

// REgister Repository services 
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Register AutoMapper service 
builder.Services.AddAutoMapper(typeof(MappingConfig).Assembly);

//Register CORS policy
builder.Services.AddCors();

// Register Authentication service
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

// Register Autorize services
builder.Services.AddAuthorization();

// Register Logging service
builder.Logging.ClearProviders();
builder.Logging.AddLog4Net();

// Middleware design for http request pipeline
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    //Resolve dbcontext with DI help
    var dbcontext = (DBContext)scope.ServiceProvider.GetService(typeof(DBContext));
    //call your static method herer
    await FoodDataInitializer.InitializeAsync(dbcontext);
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


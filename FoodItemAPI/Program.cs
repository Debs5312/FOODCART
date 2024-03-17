using Microsoft.EntityFrameworkCore;
using Persistance;

var builder = WebApplication.CreateBuilder(args);

// Register Controller service
builder.Services.AddControllers();

// REgister DB connection
builder.Services.AddDbContext<DBContext>(opt => 
{
  opt.UseSqlServer(builder.Configuration.GetConnectionString("dbconn"));
});


// Middleware design for http request pipeline
var app = builder.Build();

app.MapControllers();

app.Run();


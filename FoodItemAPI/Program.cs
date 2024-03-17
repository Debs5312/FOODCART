using Microsoft.EntityFrameworkCore;
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

// Middleware design for http request pipeline
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    //Resolve dbcontext with DI help
    var dbcontext = (DBContext)scope.ServiceProvider.GetService(typeof(DBContext));
    //call your static method herer
    await FoodDataInitializer.InitializeAsync(dbcontext);
}

app.MapControllers();

app.Run();


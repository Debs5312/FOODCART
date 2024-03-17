using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Model.DBModels;
using Persistance;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Register DB services
builder.Services.AddDbContext<UserDBContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("dbconn")));

builder.Services.AddIdentityCore<User>(opt => 
{
  opt.Password.RequireNonAlphanumeric = false;
  opt.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<UserDBContext>();


// Apply middleware in request pipeline
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    //Resolve dbcontext with DI help
    var dbcontext = (UserDBContext)scope.ServiceProvider.GetService(typeof(UserDBContext));
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
    //call your static method herer

    await DBInitializer.Initialize(dbcontext, userManager);
}

app.MapControllers();

app.Run();



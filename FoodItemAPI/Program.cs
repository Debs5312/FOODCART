var builder = WebApplication.CreateBuilder(args);

// Register Controller service
builder.Services.AddControllers();

// Middleware design 
var app = builder.Build();

app.MapControllers();

app.Run();


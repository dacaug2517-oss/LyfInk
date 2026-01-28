using Admin.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ Register DbContext Service
builder.Services.AddDbContext<P17BloodbankContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("BloodBankDB"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("BloodBankDB"))
    )
);

// ✅ Add Controllers
builder.Services.AddControllers();

// ✅ Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

// ✅ Map API Controllers
app.MapControllers();

app.Run();

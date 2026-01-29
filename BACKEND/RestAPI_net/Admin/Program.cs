using Admin.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ DbContext
builder.Services.AddDbContext<P17BloodbankContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("BloodBankDB"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("BloodBankDB"))
    )
);

// ✅ Controllers
builder.Services.AddControllers();

// ✅ CORS Fix
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

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

// ✅ Enable CORS Middleware
app.UseCors("AllowReactApp");

// ✅ Map Controllers
app.MapControllers();

app.Run();

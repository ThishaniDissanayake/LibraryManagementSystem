using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=library.db"));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Library Management API",
        Version = "v1"
    });
});


var app = builder.Build();

// Ensure database is created and seeded
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Check if Books table exists
    var conn = db.Database.GetDbConnection();
    conn.Open();
    var tableExists = false;
    using (var cmd = conn.CreateCommand())
    {
        cmd.CommandText = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='Books';";
        tableExists = Convert.ToInt32(cmd.ExecuteScalar()) > 0;
    }
    conn.Close();

    if (!tableExists)
    {
        Console.WriteLine("Tables missing - clearing migration history and re-running...");
        // Clear corrupted migration history so Migrate() actually creates tables
        try
        {
            db.Database.ExecuteSqlRaw("DELETE FROM \"__EFMigrationsHistory\";");
        }
        catch { /* table might not exist yet */ }

        try
        {
            db.Database.Migrate();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Migration failed: {ex.Message}, trying EnsureCreated...");
            // Last resort: delete migration tracking and use EnsureCreated
            try { db.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS \"__EFMigrationsHistory\";"); } catch { }
            try { db.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS \"__EFMigrationsLock\";"); } catch { }
            db.Database.EnsureCreated();
        }
    }
    else
    {
        Console.WriteLine("Database tables already exist.");
    }

    // Seed sample data
    try
    {
        var sqlSeedPath = Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "SampleData.sql");
        backend.Data.DbSeeder.SeedIfEmpty(db, sqlSeedPath);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Seeding skipped: {ex.Message}");
    }
}

// Configure Swagger middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library Management API V1");
        c.RoutePrefix = string.Empty;
    });
}

// Only redirect to HTTPS in development (Railway handles HTTPS externally)
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();
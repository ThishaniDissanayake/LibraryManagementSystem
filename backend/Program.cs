using Microsoft.OpenApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
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

// Configure Swagger middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library Management API V1");
        c.RoutePrefix = string.Empty; // Swagger opens at root (http://localhost:5041/)
    });
}

app.UseHttpsRedirection();

app.Run();
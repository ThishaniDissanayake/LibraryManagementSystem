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

// Ensure database tables exist (create with raw SQL if needed)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    Console.WriteLine("Checking database tables...");

    // Directly create tables with raw SQL - this ALWAYS works
    db.Database.ExecuteSqlRaw(@"
        CREATE TABLE IF NOT EXISTS ""Books"" (
            ""Id"" INTEGER NOT NULL CONSTRAINT ""PK_Books"" PRIMARY KEY AUTOINCREMENT,
            ""Title"" TEXT NOT NULL,
            ""Author"" TEXT NOT NULL,
            ""Description"" TEXT NOT NULL,
            ""Category"" TEXT NOT NULL DEFAULT 'General'
        );
    ");

    db.Database.ExecuteSqlRaw(@"
        CREATE TABLE IF NOT EXISTS ""Users"" (
            ""Id"" INTEGER NOT NULL CONSTRAINT ""PK_Users"" PRIMARY KEY AUTOINCREMENT,
            ""Username"" TEXT NOT NULL,
            ""Email"" TEXT NOT NULL,
            ""PasswordHash"" TEXT NOT NULL
        );
    ");

    Console.WriteLine("Database tables ready.");

    // Seed sample data
    try
    {
        if (!db.Books.Any())
        {
            Console.WriteLine("Seeding sample data...");
            db.Database.ExecuteSqlRaw(@"
                INSERT INTO Books (Title, Author, Description, Category) VALUES
                ('To Kill a Mockingbird', 'Harper Lee', 'Set in the American South during the 1930s, this Pulitzer Prize-winning novel explores themes of racial injustice and moral growth through the eyes of young Scout Finch.', 'Novel'),
                ('1984', 'George Orwell', 'A dystopian masterpiece set in a totalitarian society ruled by Big Brother. Winston Smith works at the Ministry of Truth, rewriting history to fit the Party''s narrative.', 'Science Fiction'),
                ('The Da Vinci Code', 'Dan Brown', 'Harvard symbologist Robert Langdon is summoned to the Louvre Museum where a curator has been murdered, leaving cryptic clues leading to revelations that could shake Christianity.', 'Mystery'),
                ('Steve Jobs', 'Walter Isaacson', 'Based on over forty interviews with Jobs, this authorized biography provides an unprecedented look at the creative entrepreneur whose passion for perfection revolutionized six industries.', 'Biography'),
                ('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 'From the evolution of Homo sapiens in the Stone Age to the political and technological revolutions of the twenty-first century, this groundbreaking narrative explores what it means to be human.', 'History'),
                ('Atomic Habits', 'James Clear', 'A practical guide to breaking bad habits and building good ones through tiny changes that deliver remarkable results. Learn the Four Laws of Behavior Change.', 'Self-Help'),
                ('Clean Code', 'Robert C. Martin', 'A comprehensive guide to writing clean, readable, and maintainable code. Packed with practical examples and real-world case studies on software craftsmanship.', 'Technology'),
                ('The Great Gatsby', 'F. Scott Fitzgerald', 'Set in the Jazz Age on Long Island, this novel tells the story of Jay Gatsby, a mysterious millionaire who throws lavish parties in pursuit of his lost love, Daisy Buchanan.', 'Novel'),
                ('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 'The multi-generational story of the Buendia family in the fictional town of Macondo, blending magical realism with political and social commentary about Latin America.', 'Translation'),
                ('Dune', 'Frank Herbert', 'On the desert planet Arrakis, young Paul Atreides must navigate political intrigue, ecological challenges, and his own prophetic visions in this epic science fiction tale.', 'Science Fiction'),
                ('And Then There Were None', 'Agatha Christie', 'Ten strangers are lured to an isolated island mansion. As they are murdered one by one following a nursery rhyme, the survivors must determine the killer''s identity.', 'Mystery'),
                ('The Diary of a Young Girl', 'Anne Frank', 'The remarkable diary of a teenage Jewish girl hiding from the Nazis in Amsterdam during World War II. Anne''s honest observations have made it one of the most widely read Holocaust accounts.', 'Biography'),
                ('The Art of War', 'Sun Tzu', 'This ancient Chinese military treatise offers timeless wisdom on tactics, strategy, and leadership that has been applied to business, sports, and diplomacy for centuries.', 'History'),
                ('The 7 Habits of Highly Effective People', 'Stephen R. Covey', 'A holistic approach to personal and professional effectiveness through seven habits including being proactive, beginning with the end in mind, and seeking first to understand.', 'Self-Help'),
                ('The Pragmatic Programmer', 'Andrew Hunt and David Thomas', 'This classic guide examines the core process of developing software, covering topics from personal responsibility and career development to architectural techniques.', 'Technology');
            ");
            Console.WriteLine("Sample data seeded successfully.");
        }
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
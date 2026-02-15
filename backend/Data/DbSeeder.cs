using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace backend.Data
{
    public static class DbSeeder
    {
        public static void SeedIfEmpty(AppDbContext context, string sqlFilePath)
        {
            // Check if Books table is empty
            if (!context.Books.Any())
            {
                if (File.Exists(sqlFilePath))
                {
                    var sql = File.ReadAllText(sqlFilePath);
                    // Use raw SQL execution for seeding
                    context.Database.ExecuteSqlRaw(sql);
                }
            }
        }
    }
}

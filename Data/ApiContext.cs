using Lasmart_TestTask.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Lasmart_TestTask.Data
{
    public class ApiContext : DbContext
    {
        public DbSet<Dot> Dots { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options) 
            : base(options) 
        {

        }
    }
}

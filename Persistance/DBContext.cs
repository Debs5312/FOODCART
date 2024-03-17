using Microsoft.EntityFrameworkCore;
using Model.DBModels;

namespace Persistance
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            ConnectionString connection = new ConnectionString();
            dbContextOptionsBuilder.UseSqlServer(connection.ConnString);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }

    }
}
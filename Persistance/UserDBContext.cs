using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model.DBModels;

namespace Persistance
{
    public class UserDBContext : IdentityDbContext<User, Role, int>
    {
        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            ConnectionString connection = new ConnectionString();
            dbContextOptionsBuilder.UseSqlServer(connection.UserConnString);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>().HasData(
                new Role{Id=1, Name= "Member", NormalizedName="MEMBER"},
                new Role{Id=2, Name="Admin", NormalizedName="ADMIN"}
            );

            builder.Entity<User>()
            .HasOne(x => x.Address)
            .WithOne()
            .HasForeignKey<UserAddress>(i => i.Id)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
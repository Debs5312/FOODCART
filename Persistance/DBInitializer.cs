using Microsoft.AspNetCore.Identity;
using Model.DBModels;

namespace Persistance
{
    public static class DBInitializer
    {
        public static async Task Initialize(UserDBContext context, UserManager<User> userManager)
        {
            try
            {
                if (!userManager.Users.Any())
                {
                    var user = new User
                    {
                        UserName = "deb",
                        Email = "debojyotisaha5@gmail.com"
                    };

                    await userManager.CreateAsync(user, "Jyoti@1234");
                    await userManager.AddToRoleAsync(user, "Member");

                    var admin = new User
                    {
                        UserName = "admin",
                        Email = "admin@123.com"
                    };

                    await userManager.CreateAsync(admin, "Admin@123");
                    await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
                }

                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occured while saving to Database - ", ex.Message);
            }
            
        }
    }
}
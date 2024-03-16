using Microsoft.AspNetCore.Identity;

namespace Model.DBModels
{
    public class User: IdentityUser<int>
    {
        public UserAddress Address { get; set; }
    }
}
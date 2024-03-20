using Microsoft.AspNetCore.Identity;
using Model.DBModels;
using Model.DTO;
using UserManagementAPI.RequestHelpers;
using UserManagementAPI.Services.Interfaces;

namespace UserManagementAPI.Services.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        public UserRepository(UserManager<User> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<User> LoginUser(LoginDTO loginDTO)
        {
            User user = await _userManager.FindByNameAsync(loginDTO.UserName);
            if(user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return null;
            }
            return user;
        }

        public async Task<object> RegisterUser(RegisterDTO registerDTO)
        {
            var user = new User{UserName=registerDTO.UserName, Email=registerDTO.Email};
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if(result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Member");
            }
            return result;
        }

        public async Task<UserDTO> GetCurrentUser(string name)
        {
            var user = await _userManager.FindByNameAsync(name);

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = null
            };

        }
    }
}
using Model.DBModels;
using Model.DTO;

namespace UserManagementAPI.Services.Interfaces
{
    public interface IUserRepository
    {
        Task<User> LoginUser(LoginDTO loginDTO);
        Task<object> RegisterUser(RegisterDTO registerDTO);
        Task<UserDTO> GetCurrentUser(string name);
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Model.DBModels;
using Model.DTO;
using Persistance;
using UserManagementAPI.RequestHelpers;
using UserManagementAPI.Services.Interfaces;

namespace UserManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IUserRepository _repo;
        private readonly ICartRepository _cartrepo;
        private readonly DBContext _context;
        private readonly TokenService _tokenService;

        public AuthController(IUserRepository repo, TokenService tokenService, ICartRepository cartrepo,DBContext context, ILogger<AuthController> logger)
        {
            _tokenService = tokenService;
            _repo = repo;
            _cartrepo = cartrepo;
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            IdentityResult result = (IdentityResult)await _repo.RegisterUser(registerDTO);
            if(!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                    _logger.LogError(error.Description);
                }
                return ValidationProblem();
            }
            _logger.LogInformation("New User "+ registerDTO.UserName + " registered");
            return StatusCode(201);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            User user = await _repo.LoginUser(loginDTO);
            if(user == null)
            {
                _logger.LogError("Wrong Credentials !! User not found");
                return Unauthorized();
            }
            var userCart = await getCart(loginDTO.UserName);
            var annonymousCart = await getCart(Request.Cookies["UserId"]);

            if(annonymousCart != null)
            {
                if(userCart != null) _context.Baskets.Remove(userCart);
                annonymousCart.UserId = user.UserName;
                Response.Cookies.Delete("UserId");
                await _context.SaveChangesAsync();
            }

            _logger.LogInformation("User " + user.UserName + " is logged in.");
            return Ok(
                new UserDTO{
                    Email = user.Email,
                    Token = await _tokenService.GenerateToken(user),
                    Basket = annonymousCart != null ? MapBaskettoDTO(annonymousCart) : MapBaskettoDTO(userCart)
                    }
            );
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<IActionResult> CurrentUser()
        {
            UserDTO user = await _repo.GetCurrentUser(User.Identity.Name);
            var userCart = await _cartrepo.GetCartWithItems(User.Identity.Name);
            user.Basket = MapBaskettoDTO(userCart);
            _logger.LogInformation("User fetched.");
            return Ok(user);
        }

        private async Task<Basket> getCart(string userID)
        {
 
            if(string.IsNullOrEmpty(userID))
            {
                Response.Cookies.Delete("UserId");
                return null;
            }
            return await _cartrepo.GetCartWithItems(userID);
        }

        private BasketDTO MapBaskettoDTO(Basket cart)
        {
            if(cart == null) return null;
            return new BasketDTO
            {
                Id = cart.Id,
                UserId = cart.UserId,
                Items = cart.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand
                }).ToList()
            };
        }
    }
}
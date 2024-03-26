using Microsoft.AspNetCore.Mvc;
using Model.DBModels;
using Model.DTO;
using UserManagementAPI.Services.Interfaces;

namespace UserManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly ILogger<BasketController> _logger;
        private readonly ICartRepository _repo;
        public BasketController(ICartRepository repo, ILogger<BasketController> logger)
        {
            // var userId = Guid.NewGuid().ToString();
            // var cookie = new CookieOptions {IsEssential=true, Expires=DateTime.Now.AddDays(30)};
            _repo = repo;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetCart")]
        public async Task<IActionResult> GetCart()
        {
            try
            {
                string userID = GetUserID();
                if(string.IsNullOrEmpty(userID))
                {
                    Response.Cookies.Delete("UserId");
                    _logger.LogError("User ID is not found");
                    return NotFound();
                }
                Basket cart = await _repo.GetCartWithItems(userID);
                BasketDTO result_cart = new BasketDTO
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
                if (cart == null)
                {
                    _logger.LogError("Cart is not found");
                    return NotFound();
                }
                else
                {
                    _logger.LogInformation("Basket for User with ID= " + userID + " has found");
                    return Ok(result_cart);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Something Went wrong!! Check DB connections ---" + ex.Message);
                return BadRequest();
            }

        }

        private string GetUserID()
        {
            return User.Identity?.Name ?? Request.Cookies["UserId"];
        }

        [HttpPost]
        [Route("AddItemToCart")]
        public async Task<IActionResult> AddItemToCart(int productId, int quantity)
        {
            try
            {
                string userID = GetUserID();
                Basket cart = await _repo.GetCartWithItems(userID);
                if (cart == null)
                {
                    var userId = User.Identity?.Name;
                    if(string.IsNullOrEmpty(userId))
                    {
                        userId = Guid.NewGuid().ToString();
                        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                        Response.Cookies.Append("UserId", userId, cookieOptions);
                    }
                    cart = await _repo.CreateCart(userId);
                }
                var result = await _repo.AddItemToCart(productId, cart, quantity);
                cart = (Basket)result;
                BasketDTO result_cart = MapBaskettoDTO(cart);
                if (result is Int32)
                {
                    int item = (int)result;
                    if (item == 1)
                    {
                        _logger.LogError("Product not found");
                        return NotFound();
                    }
                    else
                    {
                        _logger.LogError("Please check the database. ");
                        return StatusCode(500);
                    }

                }
                else
                {
                    _logger.LogInformation("New Items are added. ");
                    return StatusCode(201, result_cart);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Something Went wrong!! Check DB connections" + ex.Message);
                return BadRequest();
            }

        }

        [HttpDelete]
        [Route("DeleteItem")]
        public async Task<IActionResult> DeleteItem(int productId, int quantity)
        {
            try
            {
                string userID = GetUserID();
                Basket cart = await _repo.GetCartWithItems(userID);
                if (cart == null)
                {
                    _logger.LogError("Cart not found..Please add some items to cart");
                    return NotFound();
                }
                int result = await _repo.DeleteItemfromCart(productId, cart, quantity);
                if (result == 1)
                {
                    _logger.LogError("Product not found");
                    return NotFound();
                }
                else if (result == 3)
                {
                    _logger.LogError("Please check the database. ");
                    return StatusCode(500);
                }
                else if (result == 4)
                {
                    _logger.LogError("Items not found. ");
                    Response.Cookies.Delete("UserId");
                    return NotFound();
                    
                }
                else
                {
                    _logger.LogInformation("Items are Deleted. ");
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Something is wrong. -- " + ex.Message);
                return BadRequest();
            }

        }

        private BasketDTO MapBaskettoDTO(Basket cart)
        {
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
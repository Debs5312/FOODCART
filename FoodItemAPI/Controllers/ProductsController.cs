using FoodItemAPI.RequestHelpers;
using FoodItemAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model.DTO;
using Persistance;

namespace FoodItemAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly IProductRepository _repo;
        private readonly DBContext _db;
        public ProductsController(IProductRepository repo, DBContext db, ILogger<ProductsController> logger)
        {
            _repo = repo;
            _db = db;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<IActionResult> GetAll([FromQuery]ProductParams productParams)
        {
            try
            {
                PageList<ProductReadDTO> products = await _repo.GetAllProducts(productParams);
                Response.AddPaginationHeader(products.MetaData);

                if (products.Items.Count() > 0)
                {
                    _logger.LogInformation("Products Received. ");
                    return Ok(products.Items);
                }
                else
                {
                    _logger.LogError("No Product found");
                    return NotFound();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
            
        }

        [HttpGet]
        [Route("GetSingleProduct")]
        public async Task<IActionResult> GetSingleProduct(int Id)
        {
            try
            {
                ProductReadDTO product = await _repo.GetProductByID(Id);
                if (product != null)
                {
                    _logger.LogInformation("Product Name: " + product.Name.ToString() + " has received. ");
                    return Ok(product);
                }
                else
                {
                    _logger.LogError("Product not found");
                    return NotFound();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
            
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> PostProduct([FromBody] ProductUpsertDTO product)
        {
            try
            {
                ProductReadDTO item = await _repo.AddProduct(product);
                if(item == null)
                {
                    _logger.LogError("Product is not addded.");
                    return BadRequest();
                }
                else
                {
                    _logger.LogInformation("Product Name: " + product.Name.ToString() + " is Added. ");
                    return StatusCode(201, item);
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        } 

        
        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductUpsertDTO product, int id)
        {
            try
            {
                ProductReadDTO item = await _repo.UpdateProduct(product, id);
                if(item == null)
                {
                    _logger.LogError("Something went wrong! Product is not updated.");
                    return BadRequest();
                }
                else
                {
                    _logger.LogInformation("Product Name: " + product.Name.ToString() + " is Updated. ");
                    return Ok(item);
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }

        [HttpDelete]
        [Route("DeleteProduct")]
        public async Task<IActionResult> DeleteProduct(int Id)
        {
            try
            {
                bool response = await _repo.DeleteProduct(Id);
                if (response)
                {
                    _logger.LogInformation("Product for ID " + Id.ToString() + " is Deleted. ");
                    return Ok();
                }
                else
                {
                    _logger.LogError("Something went wrong! Product not found.");
                    return NotFound();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _db.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _db.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
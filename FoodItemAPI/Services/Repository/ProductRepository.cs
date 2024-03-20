using AutoMapper;
using FoodItemAPI.RequestHelpers;
using FoodItemAPI.Services.Interfaces;
using FoodItemAPI.Static;
using Microsoft.EntityFrameworkCore;
using Model.DBModels;
using Model.DTO;
using Persistance;

namespace FoodItemAPI.Services.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DBContext _db;
        private readonly IMapper _mapper;
        public ProductRepository(DBContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public async Task<bool> DeleteProduct(int Id)
        {
            Product item = await _db.Products.FirstOrDefaultAsync(x => x.Id == Id);
            if (item != null)
            {
                _db.Products.Remove(item);
                var result = await _db.SaveChangesAsync();
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    throw new Exception("Something went wrong with the DataBase");
                }
            }
            else
            {
                return false;
            }
        }

        public async Task<PageList<ProductReadDTO>> GetAllProducts(ProductParams productParams)
        {
            var query = _db.Products
            .SORT(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

            PageList<Product> products = await PageList<Product>.ToPagedList(query,productParams.PageNumber,productParams.PageSize);
            List<ProductReadDTO> finalProducts = _mapper.Map<List<ProductReadDTO>>(products.Items);
            PageList<ProductReadDTO> readProducts = await PageList<ProductReadDTO>.ToUpdatedPagedList(finalProducts,productParams.PageNumber,productParams.PageSize,products.MetaData.TotalCount);

            return readProducts;
        }

        public async Task<ProductReadDTO> GetProductByID(int Id)
        {
            Product product = await _db.Products.FirstOrDefaultAsync(opt => opt.Id == Id);
            if(product == null)
            {
                return null;
            }
            else
            {
                return _mapper.Map<ProductReadDTO>(product);
            }
        }

        public async Task<ProductReadDTO> UpsertProduct(ProductUpsertDTO productUpsertDTO, int id)
        {
            Product product = _mapper.Map<Product>(productUpsertDTO);
            if(id>0)
            {
                product.CreatedTime = DateTime.Now.ToString();
                _db.Products.Update(product);
            }
            else
            {
                product.CreatedTime = DateTime.Now.ToString();
                await _db.Products.AddAsync(product);
            }
            int result = await _db.SaveChangesAsync();
            if(result>0)
            {
                return _mapper.Map<ProductReadDTO>(product);
            }
            else
            {
                return null;
            }
        }
    }
}
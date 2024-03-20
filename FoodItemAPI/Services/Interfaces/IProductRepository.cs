using FoodItemAPI.RequestHelpers;
using Model.DTO;

namespace FoodItemAPI.Services.Interfaces
{
    public interface IProductRepository
    {
        Task<PageList<ProductReadDTO>> GetAllProducts(ProductParams productParams);
        Task<ProductReadDTO> GetProductByID(int Id);
        Task<ProductReadDTO> AddProduct(ProductUpsertDTO productUpsertDTO);
        Task<ProductReadDTO> UpdateProduct(ProductUpsertDTO productUpsertDTO, int id);
        Task<bool> DeleteProduct(int Id);
    }
}
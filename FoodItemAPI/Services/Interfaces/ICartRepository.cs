using Model.DBModels;

namespace FoodItemAPI.Services.Interfaces
{
    public interface ICartRepository
    {
        Task<Basket> GetCartWithItems(string userID);
        Task<object> AddItemToCart(int productID, Basket cart, int quantity);
        Task<Basket> CreateCart(string userID);
        Task<int> DeleteItemfromCart(int productID, Basket cart, int quantity);
    }
}
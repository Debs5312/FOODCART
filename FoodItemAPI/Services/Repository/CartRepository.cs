using FoodItemAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Model.DBModels;
using Persistance;

namespace FoodItemAPI.Services.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly DBContext _db;
        public CartRepository(DBContext db)
        {
            _db = db;
        }
        public async Task<object> AddItemToCart(int productID, Basket cart, int quantity)
        {
            var product = await _db.Products.FindAsync(productID);
            if (product == null) return 1;
            cart.AddItem(product, quantity);
            var result = await _db.SaveChangesAsync();
            if (result > 0) return cart;
            return 3;
        }


        public async Task<int> DeleteItemfromCart(int productID, Basket cart, int quantity)
        {
            var product = await _db.Products.FindAsync(productID);
            if (product == null) return 1;
            cart.RemoveItem(productID, quantity);
            if(cart.Items.Count<=0)
            {
                _db.Baskets.Remove(cart);
                await _db.SaveChangesAsync();
                return 4;
            }
            var result = await _db.SaveChangesAsync();
            if (result > 0) return 2;
            return 3;
        }

        public async Task<Basket> GetCartWithItems(string userID)
        {
            var cart = await _db.Baskets.Include(x => x.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(k => k.UserId == userID);
            if (cart == null) return null;
            return cart;
        }
        public async Task<Basket> CreateCart(string userID)
        {
            var cart = new Basket { UserId = userID };
            await _db.Baskets.AddAsync(cart);
            return cart;
        }
    }
}
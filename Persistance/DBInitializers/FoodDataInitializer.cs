using Model.DBModels;

namespace Persistance.DBInitializers
{
    public static class FoodDataInitializer
    {
        public static async Task InitializeAsync(DBContext context)
        {
            try
            {
                if(!context.Products.Any())
                {
                    var nonVeg = "Non Veg";
                    var veg = "Veg";

                    List<Product> seedData =
                    [
                        new Product()
                        {
                            Name = "Chili Chicken",
                            Description = "Boneless chicken is marinated in flavorful sauces, fried until crispy, this is stir fried with lots of ginger, garlic, onions, bell peppers and sauces.",
                            Price = 200,
                            PictureUrl = "cchili.jpg",
                            Type = nonVeg,
                            Brand = "Indo Chinese",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Chicken Hakka Noddles",
                            Description = "Stir fried indo chinese noodles are made with egg noodles, chicken breast, fresh vegetables and a quick savory sauce.",
                            Price = 90,
                            PictureUrl = "cchow.jpg",
                            Type = nonVeg,
                            Brand = "Indo Chinese",
                            Quantity = 80,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Chicken Pokora",
                            Description = "Print Recipe Tender chicken marinated in a blend of fragrant spices, then coated in a chickpea flour-based batter for that signature mild nutty taste.",
                            Price = 30,
                            PictureUrl = "cpokora.jpg",
                            Type = nonVeg,
                            Brand = "Indian",
                            Quantity = 150,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Chicken Fried Rice",
                            Description = "This chicken fried rice has moist and tender chicken with flavorful peas and carrots and long rice cooked together. Make this unique and your own with this favorite Chinese rice!",
                            Price = 100,
                            PictureUrl = "crice.jpg",
                            Type = nonVeg,
                            Brand = "Indo Chinese",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Chicken Roll",
                            Description = "Chicken Roll is a popular Indian street style wrap a filling of marinated & grilled chicken, onions, bell peppers and a sauce",
                            Price = 50,
                            PictureUrl = "croll.jpg",
                            Type = nonVeg,
                            Brand = "Indian",
                            Quantity = 60,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Chicken Satay",
                            Description = "Chicken Satay has moist and tender chicken with flavorful peas and carrots. Make this unique and your own with this favorite Chinese stick!",
                            Price = 40,
                            PictureUrl = "csatay.jpg",
                            Type = nonVeg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Chicken Spring Roll",
                            Description = "Chicken Spring Rolls are filled with fresh chicken boneless vegetable, green & dry spice, garlic & salt which is tasty to eat and ready to cook (fry)",
                            Price = 60,
                            PictureUrl = "cspringroll.jpg",
                            Type = nonVeg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Egg Chicken Chow",
                            Description = "All veggies, chicken and eggs are done add the boiled noodles. Mix it very well. Now add the black pepper, msg and vinegar.",
                            Price = 80,
                            PictureUrl = "ecchow.jpg",
                            Type = nonVeg,
                            Brand = "Indo Chinese",
                            Quantity = 80,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Egg Chow",
                            Description = "This delicious egg chowmein recipe is so so good! Perfectly cooked noodles tossed with some crunchy vegetables and squishy, soft eggs.",
                            Price = 60,
                            PictureUrl = "echow.jpg",
                            Type = nonVeg,
                            Brand = "Indo Chinese",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Egg Chicken Roll",
                            Description = "Chicken Eggrolls feature a delicious filling of chicken, cabbage, carrots and onions wrapped in a crispy, delicate whole grain rich wrapper.",
                            Price = 70,
                            PictureUrl = "ecroll.jpg",
                            Type = nonVeg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Egg Devil",
                            Description = "A basic dim'er devil has one or half an egg encased in a spicy wrapping.",
                            Price = 20,
                            PictureUrl = "edevil.jpg",
                            Type = nonVeg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Egg Rice",
                            Description = " Egg fried rice recipe made in restaurant style, simple, quick and easy. The smoky aroma of the egg fried rice is great & delicious!!",
                            Price = 80,
                            PictureUrl = "erice.jpg",
                            Type = nonVeg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Laccha Paratha",
                            Description = "Lachha paratha or lachedar paratha is a layered flat bread prepared with wheat flour. ",
                            Price = 15,
                            PictureUrl = "lparatha.jpg",
                            Type = veg,
                            Brand = "Indian",
                            Quantity = 200,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Paneer Pasinda",
                            Description = "Paneer Pasanda that tastes much better than your favorite restaurant! Spiced paneer sandwiches are pan fried and served with a creamy gravy.",
                            Price = 50,
                            PictureUrl = "paneerpasinda.jpg",
                            Type = veg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Veg Chowmin",
                            Description = "This easy step by step recipe makes the perfect street style veg chowmein! Load it up with veggies and enjoy a hearty bowl of noodles!",
                            Price = 60,
                            PictureUrl = "vchow.jpg",
                            Type = veg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                        new Product()
                        {
                            Name = "Veg Rice",
                            Description = "Veg Rice is a one pot rice dish made with rice, spices, vegetables & herbs. Learn how to make veg pulao with simple step by step.",
                            Price = 60,
                            PictureUrl = "vrice.jpg",
                            Type = veg,
                            Brand = "Indian",
                            Quantity = 100,
                            CreatedTime = DateTime.Now.ToString()
                        },
                    ];

                    await context.Products.AddRangeAsync(seedData);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error occured while saving to Database - ", ex.Message);
            }
            
            
        }

    }
}
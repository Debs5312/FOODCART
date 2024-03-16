using System.ComponentModel.DataAnnotations;

namespace Model.DBModels
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string CreatedTime { get; set; }
    }
}
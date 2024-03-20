namespace Model.DTO
{
    public class BasketItemDTO
    {
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
    }
}
namespace Model.DTO
{
    public class BasketDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<BasketItemDTO> Items { get; set; }
    }
}
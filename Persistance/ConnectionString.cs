namespace Persistance
{
    public class ConnectionString
    {
        public string ConnString { get; set; }
        public string UserConnString { get; set; }

        public ConnectionString()
        {
            ConnString = "Server=LAPTOP-SP2T588K\\SQLEXPRESS;Database=FoodDB;Trusted_Connection=True;MultipleActiveResultSets=True;TrustServerCertificate=True";
            UserConnString = "Server=LAPTOP-SP2T588K\\SQLEXPRESS;Database=FoodUserDB;Trusted_Connection=True;MultipleActiveResultSets=True;TrustServerCertificate=True";
        }
    }
}
using Microsoft.AspNetCore.Mvc;

namespace FoodItemAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DummyApiController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetDummyData()
        {
            return Ok(new List<int> ([1,2,3,4]));
        }
    }
}
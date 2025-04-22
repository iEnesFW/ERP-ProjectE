using Microsoft.AspNetCore.Mvc;

namespace ProjectE.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

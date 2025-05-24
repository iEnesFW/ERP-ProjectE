using Microsoft.AspNetCore.Mvc;

namespace ProjectE.Controllers
{
    public class StockController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Warehouses()
        {
            return View();
        }
        public IActionResult Departments()
        {
            return View();
        }
        public IActionResult StockGroups()
        {
            return View();
        }
        public IActionResult Tax()
        {
            return View();
        }
    }
}

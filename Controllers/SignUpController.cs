using Microsoft.AspNetCore.Mvc;

namespace ProjectE.Controllers
{
    public class SignUpController : Controller
    {
        public IActionResult SignUp()
        {
            return View();
        }
    }
}

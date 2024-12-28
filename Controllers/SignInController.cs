using Microsoft.AspNetCore.Mvc;

namespace ProjectE.Controllers
{
    public class SignInController : Controller
    {
        public IActionResult SignIn()
        {
            return View();
        }
    }
}

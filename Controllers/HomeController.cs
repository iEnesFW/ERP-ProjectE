using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using ProjectE.Models;
using System.Diagnostics;

namespace ProjectE.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        [HttpPost]
        public IActionResult ChangeLanguage([FromBody] LanguageModel model)
        {
            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(model.Culture)), new CookieOptions()
                {
                    Expires = DateTimeOffset.UtcNow.AddYears(1),
                    Secure = true,
                    SameSite = SameSiteMode.Lax,
                });

            return Json(new { success = true });
        }

        public class LanguageModel
        {
            public string Culture { get; set; }
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Dashboard()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

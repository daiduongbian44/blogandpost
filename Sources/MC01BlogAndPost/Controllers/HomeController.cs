using MC01BlogAndPost.Entities;
using MC01BlogAndPost.Services.Interfaces;
using MC01BlogAndPost.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MC01BlogAndPost.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBlogService blogService;

        public HomeController(IBlogService blogService)
        {
            this.blogService = blogService;
        }

        public ActionResult AppFrontend()
        {
            return View();
        }

        public ActionResult Index()
        {
            HomeIndexViewModel viewModel = new HomeIndexViewModel();

            viewModel.ListBlogs = blogService.GetLists();

            return View(viewModel);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult ListBlogs()
        {
            return Json(new
            {
                Success = true,
                ListBlogs = blogService.GetLists()
            }, JsonRequestBehavior.AllowGet);
        }

    }
}
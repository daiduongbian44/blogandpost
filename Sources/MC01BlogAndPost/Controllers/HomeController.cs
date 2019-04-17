﻿using MC01BlogAndPost.Entities;
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
        private readonly IPostService postService;

        public HomeController(IBlogService blogService, IPostService postService)
        {
            this.blogService = blogService;
            this.postService = postService;
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

        public ActionResult ListPosts(int blogId, int postId)
        {
            if(postId <= 0)
            {
                if (blogId <= 0)
                {
                    return Json(new
                    {
                        Success = true,
                        ListPosts = postService.GetLists()
                    }, JsonRequestBehavior.AllowGet);
                }
                return Json(new
                {
                    Success = true,
                    ListPosts = postService.FindByBlogId(blogId)
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                Success = true,
                ListPosts = postService.GetOne(postId)
            }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListPostsNew()
        {
            // Request.QueryString["end"] == null ? "0" : Request.QueryString["end"]
            var strBlogId = Request.QueryString["blogId"] ?? "0"; 
            var strPostId = Request.QueryString["postId"] ?? "0";

            int blogId = int.Parse(strBlogId);
            int postId = int.Parse(strPostId);

            if (postId <= 0)
            {
                if (blogId <= 0)
                {
                    return Json(new
                    {
                        Success = true
                    }, JsonRequestBehavior.AllowGet);
                }
                return Json(new
                {
                    Success = true,
                    ListPosts = postService.FindByBlogId(blogId)
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                Success = true,
                ListPosts = postService.GetOne(postId)
            }, JsonRequestBehavior.AllowGet);
        }

        //Home/AddNewBlog
        [HttpPost]
        public ActionResult AddNewBlog(Blog blog)
        {
            var result = blogService.AddNew(blog);
 
            return Json(new
            {
                Success = true,
                ListBlogs = blogService.GetLists(),
                IsSuccessAddNewBlog = result
            }, JsonRequestBehavior.AllowGet);
        }

        //Home/AddNewPost
        [HttpPost]
        public ActionResult AddNewPost(Post post)
        {
            var result = postService.AddNew(post);

            return Json(new
            {
                Success = true,
                ListPosts = postService.FindByBlogId(post.BlogId),
                IsSuccessAddNewPost = result
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult UpdatePost(int postId, Post post)
        {
            var result = postService.Update(postId, post);

            return Json(new
            {
                Success = true,
                ListPosts = postService.FindByBlogId(post.BlogId),
                IsSuccessUpdatePost = result
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeletePost(int postId)
        {
            return Json(new
            {
                Success = postService.Delete(postId)
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteBlog(int blogId)
        {
            return Json(new
            {
                Success = blogService.Delete(blogId)
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
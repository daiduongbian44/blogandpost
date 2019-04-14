using MC01ApiBlogAndPost.Entities;
using MC01ApiBlogAndPost.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MC01ApiBlogAndPost.Controllers
{
    public class BlogsController : ApiController
    {
        private readonly IBlogService blogService;
        private readonly IPostService postService;

        public BlogsController(IBlogService blogService, IPostService postService)
        {
            this.blogService = blogService;
            this.postService = postService;
        }
        
        public IHttpActionResult Get()
        {
            return Ok(new
            {
                ListBlogs = this.blogService.GetLists()
            });
        }
    
        public IHttpActionResult Get(int id)
        {
            return Ok(new
            {
                ListPosts = this.postService.FindByBlogId(id)
            });
        }
        
        public IHttpActionResult Post([FromBody]Blog blog)
        {
            var result = blogService.AddNew(blog);
            return Ok(new
            {
                Success = true,
                ListBlogs = blogService.GetLists()
            });
        }
        
        public IHttpActionResult Delete(int id)
        {
            return Ok(new
            {
                Success = this.blogService.Delete(id)
            });
        }
    }
}

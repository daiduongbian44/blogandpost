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
    public class PostsController : ApiController
    {
        private readonly IPostService postService;

        public PostsController(IPostService postService)
        {
            this.postService = postService;
        }

        // POST: api/Posts
        public IHttpActionResult Post([FromBody] Post post)
        {
            var result = postService.AddNew(post);
            return Ok(new
            {
                Success = result,
                ListPosts = postService.FindByBlogId(post.BlogId)
            });
        }

        // PUT: api/Posts/5
        public IHttpActionResult Put(int id, [FromBody] Post post)
        {
            var result = postService.Update(id, post);
            return Ok(new
            {
                Success = result,
                ListPosts = postService.FindByBlogId(post.BlogId)
            });
        }

        // DELETE: api/Posts/5
        public IHttpActionResult Delete(int id)
        {
            var currentPost = postService.GetOne(id);
            if (currentPost != null)
            {
                var result = postService.Delete(id);
                return Ok(new
                {
                    Success = result,
                    ListPosts = postService.FindByBlogId(currentPost.BlogId)
                });
            }
            return Ok(new
            {
                Success = false
            });
        }
    }
}

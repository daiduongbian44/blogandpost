using MC01ApiBlogAndPost.Entities;
using MC01ApiBlogAndPost.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiBlogAndPost.Services.Mocks
{
    public class MockPostService : IPostService
    {

        private static List<Post> ListPosts = new List<Post>();

        public MockPostService()
        {
            if (ListPosts.Count <= 0)
            {
                for (var i = 1; i <= 30; ++i)
                {
                    ListPosts.Add(new Post()
                    {
                        PostId = i,
                        Title = "Title post " + i,
                        Content = "Content post " + i,
                        BlogId = (i % 10) + 1
                    });
                }
            }
        }

        public bool AddNew(Post data)
        {
            ListPosts.Add(data);
            return true;
        }

        public bool Delete(int postId)
        {
            ListPosts = ListPosts.Where(p => p.PostId != postId).ToList();
            return true;
        }

        public bool DeletePostBelongToBlog(int blogId)
        {
            ListPosts = ListPosts.Where(p => p.BlogId != blogId).ToList();
            return true;
        }

        public IEnumerable<Post> FindByBlogId(int blogId)
        {
            foreach(var post in ListPosts)
            {
                if(post.BlogId == blogId)
                {
                    yield return post;
                }
            }
        }

        public List<Post> GetLists()
        {
            return ListPosts;
        }

        public Post GetOne(int postId)
        {
            return ListPosts.FirstOrDefault(p => p.PostId == postId);
        }

        public bool Update(int postId, Post post)
        {
            var current = ListPosts.FirstOrDefault(p => p.PostId == postId);
            if(current == null)
            {
                return false;
            }

            current.Title = post.Title;
            current.Content = post.Content;
            current.BlogId = post.BlogId;
            return true;
        }
    }
}
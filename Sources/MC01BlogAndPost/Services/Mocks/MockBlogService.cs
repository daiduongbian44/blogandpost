using MC01BlogAndPost.Entities;
using MC01BlogAndPost.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01BlogAndPost.Services.Mocks
{
    public class MockBlogService : IBlogService
    {

        private static List<Blog> ListBlogs = new List<Blog>();

        public MockBlogService()
        {
            if (ListBlogs.Count <= 0)
            {
                for (var i = 1; i <= 10; ++i)
                {
                    ListBlogs.Add(new Blog()
                    {
                        BlogId = i,
                        Title = "Title " + i,
                        Content = "Content " + i
                    });
                }
            }
        }

        public bool AddNew(Blog data)
        {
            ListBlogs.Add(data);
            return true;
        }

        public List<Blog> GetLists()
        {
            return ListBlogs;
        }
    }
}
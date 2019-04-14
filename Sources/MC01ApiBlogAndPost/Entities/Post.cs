using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiBlogAndPost.Entities
{
    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int BlogId { get; set; }
    }
}
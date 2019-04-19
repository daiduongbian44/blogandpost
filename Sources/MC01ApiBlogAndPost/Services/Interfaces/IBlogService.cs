﻿using MC01ApiBlogAndPost.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MC01ApiBlogAndPost.Services.Interfaces
{
    public interface IBlogService : IBaseService<Blog>
    {
        bool Delete(int blogId);
        bool Update(int blogId, Blog blog);
    }
}

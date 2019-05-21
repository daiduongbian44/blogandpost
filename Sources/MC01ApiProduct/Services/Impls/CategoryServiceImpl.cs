using MC01ApiProduct.Context;
using MC01ApiProduct.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Services.Impls
{
    public class CategoryServiceImpl : ICategoryService
    {
        private IContext context;

        public CategoryServiceImpl(IContext context)
        {
            this.context = context;
        }
    }
}
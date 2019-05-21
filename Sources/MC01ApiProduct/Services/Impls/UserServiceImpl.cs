using MC01ApiProduct.Context;
using MC01ApiProduct.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Services.Impls
{
    public class UserServiceImpl : IUserService
    {
        private IContext context;

        public UserServiceImpl(IContext context)
        {
            this.context = context;
        }
    }
}
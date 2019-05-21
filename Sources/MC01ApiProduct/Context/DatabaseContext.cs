using MC01ApiProduct.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Context
{
    public class DatabaseContext : DbContext, IContext
    {
        public DatabaseContext() : base("ConnectionStringToDB")
        {
        }

        public IDbSet<Product> Products { get; set; }
        public IDbSet<Category> Categories { get; set; }
        public IDbSet<User> Users { get; set; }
        public IDbSet<UserProduct> UserProducts { get; set; }
    }
}
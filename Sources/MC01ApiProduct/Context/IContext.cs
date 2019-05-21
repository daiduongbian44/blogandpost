using MC01ApiProduct.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MC01ApiProduct.Context
{
    public interface IContext
    {
        IDbSet<Product> Products { get; }
        IDbSet<Category> Categories { get; }
        IDbSet<User> Users { get; }
        IDbSet<UserProduct> UserProducts { get; }
    }
}

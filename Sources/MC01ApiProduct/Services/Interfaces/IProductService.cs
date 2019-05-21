using MC01ApiProduct.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MC01ApiProduct.Services.Interfaces
{
    public interface IProductService
    {
        List<ProductViewModel> GetLists();
        bool AddProduct(ProductInputModel model);
        bool DeleteProduct(int productId);
    }
}

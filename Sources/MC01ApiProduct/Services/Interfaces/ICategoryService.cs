using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MC01ApiProduct.Models;

namespace MC01ApiProduct.Services.Interfaces
{
    public interface ICategoryService
    {
        List<CategoryViewModel> GetLists();
        bool AddCategory(CategoryInputModel model);
        bool DeleteCategory(int categoryId);
        bool UpdateCategory(int id, CategoryInputModel model);
    }
}

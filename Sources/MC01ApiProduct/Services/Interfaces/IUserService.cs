using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MC01ApiProduct.Models;

namespace MC01ApiProduct.Services.Interfaces
{
    public interface IUserService
    {
        List<UserViewModel> GetLists();
        bool AddUser(UserInputModel model);
        bool DeleteUser(int userId);

        bool FavoriteProduct(UserLikeProductInputModel model);
    }
}

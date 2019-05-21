using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Models
{
    public class UserViewModel
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public List<ProductViewModel> ListLikedProducts { get; set; }
    }
}
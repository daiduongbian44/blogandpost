using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string Name { get; set; }

        public virtual List<UserProduct> UserProducts { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Entities
{
    public class UserProduct
    {
        [Key]
        public int UserProductId { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
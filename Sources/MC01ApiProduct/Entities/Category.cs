using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Entities
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        public string Name { get; set; }
        
        public virtual List<Product> Products { get; set; }
    }
}
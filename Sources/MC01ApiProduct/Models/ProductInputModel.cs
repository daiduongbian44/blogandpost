using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Models
{
    public class ProductInputModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Image { get; set; }

        public string Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Invalid indentifier")]
        public int CategoryId { get; set; }
    }
}
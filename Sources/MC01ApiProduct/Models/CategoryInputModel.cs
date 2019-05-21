using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Models
{
    public class CategoryInputModel
    {
        [Required]
        public string Name { get; set; }
    }
}
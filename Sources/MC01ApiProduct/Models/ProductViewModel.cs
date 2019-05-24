﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Models
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }
        public CategoryViewModel Category { get; set; }

        public int TotalUserLiked { get; set; }
    }
}
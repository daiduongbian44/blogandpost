using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Models
{
    public class UserLikeProductInputModel
    {
        [Range(1, int.MaxValue, ErrorMessage = "Invalid indentifier")]
        public int UserId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Invalid indentifier")]
        public int ProductId { get; set; }

        public bool IsLiked { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.Models
{
    public class DataApiResult
    {
        public bool IsSuccess { get; set; }
        public object Data { get; set; }
    }

    public class DataApiResult<T>
    {
        public bool IsSuccess { get; set; }
        public T Data { get; set; }
    }
}
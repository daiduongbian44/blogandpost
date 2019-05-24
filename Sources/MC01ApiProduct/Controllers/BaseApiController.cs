using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using MC01ApiProduct.Models;

namespace MC01ApiProduct.Controllers
{
    public class BaseApiController : ApiController
    {
        protected DataApiResult WebSuccess(object data)
        {
            return new DataApiResult()
            {
                IsSuccess = true,
                Data = data
            };
        }

        protected DataApiResult WebSuccess<T>(T data)
        {
            return new DataApiResult()
            {
                IsSuccess = true,
                Data = data
            };
        }

        protected DataApiResult WebFail()
        {
            return new DataApiResult()
            {
                IsSuccess = false,
                Data = "Please check your data model before saving"
            };
        }

    }
}
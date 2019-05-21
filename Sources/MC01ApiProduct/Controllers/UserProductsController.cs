using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using MC01ApiProduct.Models;
using MC01ApiProduct.Services.Interfaces;

namespace MC01ApiProduct.Controllers
{

    /// <summary>
    /// APIs for user likes product
    /// </summary>
    public class UserProductsController : BaseApiController
    {
        private readonly IUserService _userService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userService"></param>
        public UserProductsController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// User likes product
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Post(UserLikeProductInputModel model)
        {
            var result = _userService.FavoriteProduct(model);
            return Ok(WebSuccess<bool>(result));
        }
    }
}
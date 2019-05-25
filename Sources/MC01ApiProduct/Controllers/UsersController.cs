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
    /// APIs for user
    /// </summary>
    public class UsersController : BaseApiController
    {
        private readonly IUserService _userService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userService"></param>
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Get list users
        /// </summary>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<List<UserViewModel>>))]
        public IHttpActionResult Get()
        {
            var result = _userService.GetLists();
            return Ok(WebSuccess<List<UserViewModel>>(result));
        }

        /// <summary>
        /// Add new user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Post([FromBody] UserInputModel model)
        {
            if (ModelState.IsValid)
            {
                var result = _userService.AddUser(model);
                return Ok(WebSuccess<bool>(result));
            }
            return Ok(WebFail());
        }

        /// <summary>
        /// Delete an user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Delete(int id)
        {
            var result = _userService.DeleteUser(id);
            return Ok(WebSuccess<bool>(result));
        }

        /// <summary>
        /// Update an user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Put(int id, [FromBody] UserInputModel model)
        {
            if (ModelState.IsValid)
            {
                var result = _userService.UpdateUser(id, model);
                return Ok(WebSuccess<bool>(result));
            }
            return Ok(WebFail());
        }
    }
}
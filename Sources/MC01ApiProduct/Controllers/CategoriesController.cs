using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MC01ApiProduct.Models;
using MC01ApiProduct.Services.Interfaces;

namespace MC01ApiProduct.Controllers
{
    /// <summary>
    /// APIs for category
    /// </summary>
    public class CategoriesController : BaseApiController
    {
        private readonly ICategoryService _categoryService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="categoryService"></param>
        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// Get list categories
        /// </summary>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<List<CategoryViewModel>>))]
        public IHttpActionResult Get()
        {
            var result = _categoryService.GetLists();
            return Ok(WebSuccess<List<CategoryViewModel>>(result));
        }

        /// <summary>
        /// Add new category
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Post([FromBody] CategoryInputModel model)
        {
            if(ModelState.IsValid)
            {
                var result = _categoryService.AddCategory(model);
                return Ok(WebSuccess<bool>(result));
            }
            return Ok(WebFail());
        }

        /// <summary>
        /// Delete a category
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Delete(int id)
        {
            var result = _categoryService.DeleteCategory(id);
            return Ok(WebSuccess<bool>(result));
        }
    }
}

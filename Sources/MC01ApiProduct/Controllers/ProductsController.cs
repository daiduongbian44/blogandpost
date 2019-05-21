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
    /// APIs for product
    /// </summary>
    public class ProductsController : BaseApiController
    {
        private readonly IProductService _productService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="productService"></param>
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        /// <summary>
        /// Get list products
        /// </summary>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<List<ProductViewModel>>))]
        public IHttpActionResult Get()
        {
            var result = _productService.GetLists();
            return Ok(WebSuccess<List<ProductViewModel>>(result));
        }

        /// <summary>
        /// Add new product
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Post([FromBody] ProductInputModel model)
        {
            var result = _productService.AddProduct(model);
            return Ok(WebSuccess<bool>(result));
        }

        /// <summary>
        /// Delete a product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [ResponseType(typeof(DataApiResult<bool>))]
        public IHttpActionResult Delete(int id)
        {
            var result = _productService.DeleteProduct(id);
            return Ok(WebSuccess<bool>(result));
        }
    }
}
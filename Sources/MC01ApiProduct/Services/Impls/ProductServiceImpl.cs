using MC01ApiProduct.Context;
using MC01ApiProduct.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MC01ApiProduct.Models;
using AutoMapper;
using MC01ApiProduct.Entities;

namespace MC01ApiProduct.Services.Impls
{
    public class ProductServiceImpl : IProductService
    {
        private readonly IContext _context;

        public ProductServiceImpl(IContext context)
        {
            this._context = context;
        }

        public List<ProductViewModel> GetLists()
        {
            return this._context.Products.ToList().Select(p =>
            {
                var productVm = Mapper.Map<Product, ProductViewModel>(p);
                productVm.TotalUserLiked = p.UserProducts.Count();
                return productVm;
            }).ToList();
        }

        public bool AddProduct(ProductInputModel model)
        {
            var existedProd =
                _context.Products.FirstOrDefault(c => c.Name.Equals(model.Name));
            if (existedProd != null) return false;

            var existedCat = _context.Categories.FirstOrDefault(c => c.CategoryId == model.CategoryId);
            if (existedCat == null) return false;

            var newEntityProd = Mapper.Map<ProductInputModel, Product>(model);
            _context.Products.Add(newEntityProd);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteProduct(int productId)
        {
            var existedProduct = _context.Products.FirstOrDefault(p => p.ProductId == productId);
            if (existedProduct == null || existedProduct.UserProducts.Count > 0) return false;
            _context.Products.Remove(existedProduct);
            _context.SaveChanges();
            return true;
        }

        public bool UpdateProduct(int id, ProductInputModel model)
        {
            var existedProd =
                _context.Products.FirstOrDefault(c => c.ProductId == id);

            var existedProdName =
                _context.Products.FirstOrDefault(c => c.Name.Equals(model.Name) && c.ProductId != id);

            if (existedProdName != null || existedProd == null) return false;

            Mapper.Map<ProductInputModel, Product>(model, existedProd);

            _context.SaveChanges();
            return true;
        }
    }
}
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
        private IContext context;

        public ProductServiceImpl(IContext context)
        {
            this.context = context;
        }

        public List<ProductViewModel> GetLists()
        {
            return this.context.Products.ToList().Select(p =>
            {
                return Mapper.Map<Product, ProductViewModel>(p);
            }).ToList();
        }
    }
}
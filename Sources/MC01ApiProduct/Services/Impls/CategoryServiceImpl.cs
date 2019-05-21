using MC01ApiProduct.Context;
using MC01ApiProduct.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using MC01ApiProduct.Entities;
using MC01ApiProduct.Models;

namespace MC01ApiProduct.Services.Impls
{
    public class CategoryServiceImpl : ICategoryService
    {
        private readonly IContext _context;

        public CategoryServiceImpl(IContext context)
        {
            this._context = context;
        }

        public List<CategoryViewModel> GetLists()
        {
            return this._context.Categories.ToList().Select(ct =>
            {
                var catVm = Mapper.Map<Category, CategoryViewModel>(ct);
                catVm.TotalProduct = ct.Products.Count();
                return catVm;
            }).ToList();
        }

        public bool AddCategory(CategoryInputModel model)
        {
            var existedCat =
                _context.Categories.FirstOrDefault(c => c.Name.Equals(model.Name));
            if (existedCat != null) return false;
            var newEntityCat = Mapper.Map<CategoryInputModel, Category>(model);
            _context.Categories.Add(newEntityCat);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteCategory(int categoryId)
        {
            var existedCat = _context.Categories.FirstOrDefault(c => c.CategoryId == categoryId);
            if (existedCat == null || existedCat.Products.Count > 0) return false;
            _context.Categories.Remove(existedCat);
            _context.SaveChanges();
            return true;
        }
    }
}
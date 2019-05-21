using AutoMapper;
using MC01ApiProduct.Entities;
using MC01ApiProduct.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC01ApiProduct.App_Start
{
    public class AutoMapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize((config) =>
            {
                config.CreateMap<Category, CategoryViewModel>().ReverseMap();
                config.CreateMap<Product, ProductViewModel>().ReverseMap();
                config.CreateMap<User, UserViewModel>().ReverseMap();

                config.CreateMap<Category, CategoryInputModel>().ReverseMap();
                config.CreateMap<Product, ProductInputModel>().ReverseMap();
                config.CreateMap<User, UserInputModel>().ReverseMap();

                config.CreateMap<UserProduct, UserLikeProductInputModel>().ReverseMap();
            });
        }
    }
}
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
    public class UserServiceImpl : IUserService
    {
        private readonly IContext _context;

        public UserServiceImpl(IContext context)
        {
            this._context = context;
        }

        public List<UserViewModel> GetLists()
        {
            return this._context.Users.ToList().Select(user =>
            {
                var userVm = Mapper.Map<User, UserViewModel>(user);
                userVm.ListLikedProducts = user.UserProducts.Select(up => Mapper.Map<Product, ProductViewModel>(up.Product)).ToList();
                return userVm;
            }).ToList();
        }

        public bool AddUser(UserInputModel model)
        {
            var existedUser = _context.Users.ToArray()
                .FirstOrDefault(u => u.Email.ToLowerInvariant().Equals(model.Email.ToLowerInvariant()));
            if (existedUser != null) return false;
            var newUserEntity = Mapper.Map<UserInputModel, User>(model);
            _context.Users.Add(newUserEntity);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteUser(int userId)
        {
            var existedUser = _context.Users
                .FirstOrDefault(u => u.UserId == userId);
            if (existedUser == null || existedUser.UserProducts.Count > 0) return false;
            _context.Users.Remove(existedUser);
            _context.SaveChanges();
            return true;
        }

        public bool FavoriteProduct(UserLikeProductInputModel model)
        {
            var existedLike =
                _context.UserProducts.FirstOrDefault(up =>
                    up.ProductId == model.ProductId && up.UserId == model.UserId);
            if (model.IsLiked)
            {
                if (existedLike != null) return false;
                _context.UserProducts.Add(Mapper.Map<UserLikeProductInputModel, UserProduct>(model));
                _context.SaveChanges();
                return true;
            }
            else
            {
                if (existedLike == null) return false;
                _context.UserProducts.Remove(existedLike);
                _context.SaveChanges();
                return true;
            }
        }
    }
}
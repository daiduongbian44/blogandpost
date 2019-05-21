namespace MC01ApiProduct.Migrations
{
    using Context;
    using System;
    using System.Data.Entity.Migrations;

    public partial class InitData : DbMigration
    {
        public override void Up()
        {
            DatabaseContext context = new DatabaseContext();
            context.Categories.Add(new Entities.Category()
            {
                Name = "Category 01"
            });
            context.Categories.Add(new Entities.Category()
            {
                Name = "Category 02"
            });
            context.Categories.Add(new Entities.Category()
            {
                Name = "Category 03"
            });
            context.SaveChanges();

            context.Products.Add(new Entities.Product()
            {
                Name = "Product 01",
                CategoryId = 1,
                Image = "https://res.cloudinary.com/prestige-gifting/image/fetch/fl_progressive,q_95,e_sharpen:50,w_480/e_saturation:05/https://www.prestigeflowers.co.uk/images/NF1018.jpg",
            });
            context.Products.Add(new Entities.Product()
            {
                Name = "Product 02",
                CategoryId = 2,
                Image = "https://res.cloudinary.com/prestige-gifting/image/fetch/fl_progressive,q_95,e_sharpen:50,w_480/e_saturation:05/https://www.prestigeflowers.co.uk/images/NF1018.jpg",
            });

            context.SaveChanges();
        }
        
        public override void Down()
        {
        }
    }
}

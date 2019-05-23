namespace MC01ApiProduct.Migrations
{
    using Context;
    using System;
    using System.Data.Entity.Migrations;

    public partial class InitUser : DbMigration
    {
        public override void Up()
        {
            DatabaseContext context = new DatabaseContext();
            context.Users.Add(new Entities.User()
            {
                Name = "User test 01",
                Email = "useremail01@gmail.com"
            });
            context.SaveChanges();
        }
        
        public override void Down()
        {
        }
    }
}

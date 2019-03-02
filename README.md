# blogandpost on mock data
All steps to run this project on Mock Data Mode
## Step 01
Make sure your service point to MockService or you need to get your connectionstring to your database.
```cs
For<IBlogService>().Use<MockBlogService>();
```
Instead of
```cs
For<IBlogService>().Use<BlogService>();
```
## Step 02
Press F5 to run your project

# blogandpost on database
All steps to run this project on Database Mode, for the first of running
## Step 01
You need to pass your connectionstring to Web.config
Example:
```xml
<connectionStrings>
    <add name="ConnectionStringToDB" connectionString="{your_connection_string_to_your_database}" providerName="System.Data.SqlClient" />
  </connectionStrings>
```
## Step 02
Run this command
```console
PM> Enable-Migrations
PM> Add-Migration InitDatabase
PM> Update-Database
```
## Step 03
Make sure your service point to
```cs
For<IBlogService>().Use<BlogService>();
```
## Step 04
Press F5 to run your project
using System.Web;
using System.Web.Mvc;

namespace MC01ApiBlogAndPost
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

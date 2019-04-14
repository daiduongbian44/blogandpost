using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MC01ApiBlogAndPost.Services.Interfaces
{
    public interface IBaseService<T>
    {
        List<T> GetLists();

        bool AddNew(T data);
    }
}

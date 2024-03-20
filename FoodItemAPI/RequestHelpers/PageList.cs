using Microsoft.EntityFrameworkCore;

namespace FoodItemAPI.RequestHelpers
{
    public class PageList<T> : List<T>
    {
        public PageList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            Items = items;
        }
        public MetaData MetaData { get; set; }
        public List<T> Items {get; set;}

        public static async Task<PageList<T>> ToPagedList(IQueryable<T> query, 
            int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
            return new PageList<T>(items, count, pageNumber, pageSize);
        }

        public static async Task<PageList<T>> ToUpdatedPagedList(List<T> items, 
            int pageNumber, int pageSize, int count)
        {
            return new PageList<T>(items, count, pageNumber, pageSize);
        }
    }
}
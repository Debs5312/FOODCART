using AutoMapper;
using Model.DBModels;
using Model.DTO;

namespace FoodItemAPI.Static
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<ProductReadDTO, Product>().ReverseMap();
            CreateMap<ProductUpsertDTO, Product>().ReverseMap();
        }
    }
}
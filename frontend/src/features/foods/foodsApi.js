import { api } from '../../services/api';

export const foodsApi = api.injectEndpoints({
  endpoints: (builder) => ({


    getAllFoods: builder.query({
      query: () => '/foods',
    }),

   
    getFoodById: builder.query({
      query: (foodId) => `/foods/${foodId}`,
    }),

  
    getFoodsBySpecies: builder.query({
      query: (speciesId) => `/foods/species/${speciesId}`,
    }),

  
    searchFoods: builder.query({
      query: (searchTerm) => `/foods/search?query=${encodeURIComponent(searchTerm)}`,
    }),

  }),
});

export const {
  useGetAllFoodsQuery,
  useGetFoodByIdQuery,
  useGetFoodsBySpeciesQuery,
  useSearchFoodsQuery,
} = foodsApi;
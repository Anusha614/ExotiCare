import { api } from '../../services/api';

export const speciesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpecies: builder.query({
      query: () => '/species',
    }),

    getSpeciesById: builder.query({
      query: (speciesId) => `/species/${speciesId}`,
    }),

    searchSpecies: builder.query({
      query: (searchTerm) =>
        `/species/search?query=${encodeURIComponent(searchTerm)}`,
    }),

    getSpeciesByCategory: builder.query({
      query: (category) =>
        `/species/category/${encodeURIComponent(category)}`,
    }),
  }),
});

export const {
  useGetAllSpeciesQuery,
  useGetSpeciesByIdQuery,
  useSearchSpeciesQuery,
  useGetSpeciesByCategoryQuery,
} = speciesApi;
import { api } from '../../services/api';

export const symptomsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSymptoms: builder.query({
      query: () => '/symptoms',
    }),

    getSymptomById: builder.query({
      query: (symptomId) => `/symptoms/${symptomId}`,
    }),

    searchSymptoms: builder.query({
      query: (searchTerm) =>
        `/symptoms/search?query=${encodeURIComponent(searchTerm)}`,
    }),

    getSymptomsBySpecies: builder.query({
      query: (speciesId) => `/symptoms/species/${speciesId}`,
    }),
  }),
});

export const {
  useGetAllSymptomsQuery,
  useGetSymptomByIdQuery,
  useSearchSymptomsQuery,
  useGetSymptomsBySpeciesQuery,
} = symptomsApi;
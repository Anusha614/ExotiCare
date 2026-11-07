import { api } from '../../services/api';

export const petsApi = api.injectEndpoints({
  endpoints: (builder) => ({

 
    createPet: builder.mutation({
      query: (petData) => ({
        url: '/pets',
        method: 'POST',
        body: petData,
      }),
    }),

   
    getPetsByUser: builder.query({
      query: (userId) => `/pets/user/${userId}`,
    }),

   
    getPetById: builder.query({
      query: (petId) => `/pets/${petId}`,
    }),

   
    updatePet: builder.mutation({
      query: ({ petId, ...updatedData }) => ({
        url: `/pets/${petId}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),

   
    deletePet: builder.mutation({
      query: (petId) => ({
        url: `/pets/${petId}`,
        method: 'DELETE',
      }),
    }),

  }),
});

export const {
  useCreatePetMutation,
  useGetPetsByUserQuery,
  useGetPetByIdQuery,
  useUpdatePetMutation,
  useDeletePetMutation,
} = petsApi;
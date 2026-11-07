import { api } from '../../services/api';

export const healthEventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createHealthEvent: builder.mutation({
      query: (eventData) => ({
        url: '/health-events',
        method: 'POST',
        body: eventData,
      }),
    }),

    getHealthEvents: builder.query({
      query: (petId) => `/health-events/pet/${petId}`,
    }),

    updateHealthEvent: builder.mutation({
      query: ({ eventId, ...updatedData }) => ({
        url: `/health-events/${eventId}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),

    deleteHealthEvent: builder.mutation({
      query: (eventId) => ({
        url: `/health-events/${eventId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateHealthEventMutation,
  useGetHealthEventsQuery,
  useUpdateHealthEventMutation,
  useDeleteHealthEventMutation,
} = healthEventsApi;
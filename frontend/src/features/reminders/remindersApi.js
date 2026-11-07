import { api } from '../../services/api';

export const remindersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReminder: builder.mutation({
      query: (reminderData) => ({
        url: '/reminders',
        method: 'POST',
        body: reminderData,
      }),
    }),

    getMyReminders: builder.query({
      query: () => '/reminders/my',
    }),

    getPetReminders: builder.query({
      query: (petId) => `/reminders/pet/${petId}`,
    }),

    getReminderById: builder.query({
      query: (reminderId) => `/reminders/${reminderId}`,
    }),

    updateReminder: builder.mutation({
      query: ({ reminderId, ...updatedData }) => ({
        url: `/reminders/${reminderId}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),

    deleteReminder: builder.mutation({
      query: (reminderId) => ({
        url: `/reminders/${reminderId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateReminderMutation,
  useGetMyRemindersQuery,
  useGetPetRemindersQuery,
  useGetReminderByIdQuery,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
} = remindersApi;
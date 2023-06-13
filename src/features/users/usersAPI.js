import { apiSlice } from "../api/apiSlice";

export const contactsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      addUser: builder.mutation({
        query: (data) => ({
          url: `/api/v1/users`,
          method: "POST",
          body: data,
        }),
        // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //   try {
        //     const result = await queryFulfilled;
        //     dispatch(
        //       apiSlice.util.updateQueryData(
        //         "getContacts",
        //         undefined,
        //         (draftContacts) => {
        //           draftContacts?.data.unshift(result?.data?.data);
        //         }
        //       )
        //     );
        //   } catch (error) {}
        // },
      }),
      getUsers: builder.query({
        query: () => `/api/v1/users`
      }),
      getUser: builder.query({
        query: (userId) => `/api/v1/users/${userId}`,
      }),
      updateUser: builder.mutation({
        query: ({ id, data }) => ({
          url: `/api/v1/users/${id}`,
          method: "PATCH",
          body: data
        })
      }),
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `/api/v1/users/${userId}`,
          method: "DELETE",
        }),
        // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //   try {
        //     const result = await queryFulfilled;

        //     // update /contacts data
        //     dispatch(
        //       apiSlice.util.updateQueryData(
        //         "getContacts",
        //         undefined,
        //         (draftContacts) => {

        //           // console.log(JSON.parse(JSON.stringify(draftContacts)), 'draftContacts')

        //           const filteredContacts = draftContacts?.data.filter(
        //             (contact) => contact.id != result?.data?.data?.id
        //           );
                  
        //           draftContacts.data = filteredContacts;
        //           draftContacts.meta.pagination.total = draftContacts.meta.pagination.total - 1;
                  
        //           // console.log(JSON.parse(JSON.stringify(draftContacts)), 'draftContacts')
        //         }
        //       )
        //     );
        //   } catch (error) {}
        // },
      }),
    };
  },
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = contactsAPI;

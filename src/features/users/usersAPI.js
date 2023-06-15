import { apiSlice } from "../api/apiSlice";
import { userLoggedOut } from "../auth/authSlice";

export const contactsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      addUser: builder.mutation({
        query: (data) => ({
          url: `/api/v1/users`,
          method: "POST",
          body: data,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              apiSlice.util.updateQueryData("getUsers", undefined, (drafts) => {
                drafts.users.unshift(result?.data?.user);
              })
            );
          } catch (error) {}
        },
      }),
      getUsers: builder.query({
        query: () => `/api/v1/users`,
      }),
      getUser: builder.query({
        query: (userId) => `/api/v1/users/${userId}`,
      }),
      updateUser: builder.mutation({
        query: ({ id, data }) => ({
          url: `/api/v1/users/${id}`,
          method: "PATCH",
          body: data,
        }),
        async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              apiSlice.util.updateQueryData("getUsers", undefined, (drafts) => {
                const foundUser = drafts.users.find((user) => user.id == id);
                foundUser.firstName = result.data.user.firstName;
                foundUser.lastName = result.data.user.lastName;
                foundUser.email = result.data.user.email;
                foundUser.isVerified = result.data.user.isVerified;
                foundUser.role = result.data.user.role;
              })
            );
          } catch (error) {
            // do nothing
          }
        },
      }),
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `/api/v1/users/${userId}`,
          method: "DELETE",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
          try {
            const result = await queryFulfilled;

            // user logged out when self delete req send
            if(getState()?.auth?.user?.id === result?.data?.user?.id) {
              dispatch(userLoggedOut());

              // clear local storage data
              localStorage.clear();
            }

            dispatch(
              apiSlice.util.updateQueryData("getUsers", undefined, (drafts) => {
                const filteredUsers = drafts?.users.filter(
                  (user) => user.id != arg
                );

                return { ...drafts, users: filteredUsers };
              })
            );
          } catch (error) {}
        },
      }),
    };
  },
});

export const {
  useAddUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = contactsAPI;

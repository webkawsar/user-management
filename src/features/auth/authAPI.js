import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (data) => ({
          url: `/auth/register`,
          method: "POST",
          body: data,
        }),
      }),
      login: builder.mutation({
        query: (data) => ({
          url: `/auth/login`,
          method: "POST",
          body: data,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            const { token, user } = result.data;

            // update redux state
            dispatch(
              userLoggedIn({
                token,
                user,
              })
            );

            // set data to local storage
            localStorage.setItem("auth", JSON.stringify({ token, user }));
            
          } catch (error) {
            // do nothing
          }
        },
      }),
    };
  },
});

export const { useRegisterMutation, useLoginMutation } = authAPI;

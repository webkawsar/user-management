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
            const { user } = result.data;

            // update redux state
            dispatch(
              userLoggedIn({
                user,
              })
            );

            // set data to local storage
            localStorage.setItem("auth", JSON.stringify(user));
          } catch (error) {
            // do nothing
          }
        },
      }),
      accountVerify: builder.query({
        query: (token) => `/auth/verify/${token}`,
      }),
      forgetPassword: builder.mutation({
        query: (data) => ({
          url: `/auth/forget-password`,
          method: "POST",
          body: data,
        }),
      }),
      resetVerify: builder.query({
        query: (token) => `/auth/reset-password/${token}`
      }),
      resetPassword: builder.mutation({
        query: (data) => ({
          url: `/auth/reset-password`,
          method: "POST",
          body: data,
        }),
      }),
      logout: builder.query({
        query: () => `/auth/logout`,
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyQuery,
  useForgetPasswordMutation,
  useResetVerifyQuery,
  useResetPasswordMutation,
  useLogoutQuery,
} = authAPI;

import qs from "qs";
import { apiSlice } from "../api/apiSlice";

export const profilesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getContacts: builder.query({
        query: () => {
          const query = qs.stringify(
            {
              sort: ["id:desc"],
              populate: "*",
              pagination: {
                page: 1,
                pageSize: import.meta.env.VITE_PAGE_SIZE,
              },
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          );

          return `/contacts?${query}`;
        },
      }),
      getUserProfile: builder.query({
        query: (data) => {

          const query = qs.stringify(
            {
              populate: [
                "contacts",
                "profile",
                "contacts.author",
                "contacts.image",
                "profile.profilePicture",
              ],
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          );
          
          return `/users/me?${query}`;
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            // dispatch(userProfile(result?.data?.profile));
          } catch (error) {}
        },
      }),
      createUserProfile: builder.mutation({
        query: (data) => {
          const { profilePicture, ...restData } = data;

          const formData = new FormData();
          if (profilePicture.length) {
            formData.append(
              "files.profilePicture",
              profilePicture[0],
              profilePicture[0]?.name
            );
          }
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/profiles`,
            method: "POST",
            body: formData,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            // dispatch(
            //   apiSlice.util.updateQueryData(
            //     "getContacts",
            //     undefined,
            //     (draftContacts) => {
            //       draftContacts?.data.unshift(result?.data?.data);
            //     }
            //   )
            // );
          } catch (error) {}
        },
      }),
      updateUserProfile: builder.mutation({
        query: ({ id, data }) => {
          const { profilePicture, ...restData } = data;

          const query = qs.stringify(
            {
              populate: "*",
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          );

          const formData = new FormData();
          if (profilePicture.length) {
            formData.append(
              "files.profilePicture",
              profilePicture[0],
              profilePicture[0]?.name
            );
          }
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/profiles/${id}?${query}`,
            method: "POST",
            body: formData,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            // dispatch(
            //   apiSlice.util.updateQueryData(
            //     "getContacts",
            //     undefined,
            //     (draftContacts) => {
            //       draftContacts?.data.unshift(result?.data?.data);
            //     }
            //   )
            // );
          } catch (error) {}
        },
      }),
      getContact: builder.query({
        query: (contactId) => `/contacts/${contactId}?populate=*`,
      }),
      updateContact: builder.mutation({
        query: (data) => {
          const { image, contactId, ...restData } = data;
          const formData = new FormData();
          if (image.length) {
            formData.append("files.image", image[0], image[0]?.name);
          }
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/contacts/${contactId}`,
            method: "PUT",
            body: formData,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;

            // update /contacts/:id data
            dispatch(
              apiSlice.util.updateQueryData(
                "getContact",
                arg?.contactId.toString(),
                (draftContact) => result?.data
              )
            );

            // update /contacts data
            dispatch(
              apiSlice.util.updateQueryData(
                "getContacts",
                undefined,
                (draftContacts) => {
                  const foundContact = draftContacts?.data.find(
                    (contact) => contact.id == result?.data?.data?.id
                  );
                  foundContact.attributes = result?.data?.data?.attributes;
                }
              )
            );
          } catch (error) {}
        },
      }),
      deleteContact: builder.mutation({
        query: (contactId) => ({
          url: `/contacts/${contactId}`,
          method: "DELETE",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;

            // update /contacts data
            dispatch(
              apiSlice.util.updateQueryData(
                "getContacts",
                undefined,
                (draftContacts) => {
                  // console.log(JSON.parse(JSON.stringify(draftContacts)), 'draftContacts')

                  const filteredContacts = draftContacts?.data.filter(
                    (contact) => contact.id != result?.data?.data?.id
                  );

                  draftContacts.data = filteredContacts;
                  draftContacts.meta.pagination.total =
                    draftContacts.meta.pagination.total - 1;

                  // console.log(JSON.parse(JSON.stringify(draftContacts)), 'draftContacts')
                }
              )
            );
          } catch (error) {}
        },
      }),
    };
  },
});

export const { useCreateUserProfileMutation, useUpdateUserProfileMutation, useGetUserProfileQuery } = profilesAPI;

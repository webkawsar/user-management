import { apiSlice } from "../api/apiSlice";

export const contactsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUsers: builder.query({
        query: () => `/api/v1/users`
      }),
      addContact: builder.mutation({
        query: (contact) => {
          const { image, ...restData } = contact;
          const formData = new FormData();
          formData.append("files.image", image[0], image[0]?.name);
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/contacts`,
            method: "POST",
            body: formData,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              apiSlice.util.updateQueryData(
                "getContacts",
                undefined,
                (draftContacts) => {
                  draftContacts?.data.unshift(result?.data?.data);
                }
              )
            );
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
                  draftContacts.meta.pagination.total = draftContacts.meta.pagination.total - 1;
                  
                  // console.log(JSON.parse(JSON.stringify(draftContacts)), 'draftContacts')
                }
              )
            );
          } catch (error) {}
        },
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
  useGetUsersQuery,
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useDeleteUserMutation
} = contactsAPI;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DEVELOPMENT_URL,
        prepareHeaders: (headers, {getState, endpoint}) => {

            const token = getState()?.auth?.token;
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    tagTypes: [],
    endpoints: (builder) => ({})
})
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const isProduction = import.meta.env.import.meta.env.PROD;
const URL = isProduction ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEVELOPMENT_URL

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
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
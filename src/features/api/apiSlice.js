import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import URL from "../../config/URL";



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,
        credentials: "include",
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
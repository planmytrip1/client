// src/store/features/api/bannerApi.ts

import { apiSlice } from "./apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getBanners: builder.query<any[], void>({
            query: () => "/banners",
            providesTags: ["Banner"]
        }),
    }),
});

export const { useGetBannersQuery } = bannerApi
import { apiSlice } from "./apiSlice";
// import type { IHajj, IBasePackage } from "@/lib/types";
import type { IHajj } from "@/lib/types/IHajj";

export const hajjAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tours
    getHajj: builder.query<IHajj[], void>({
      query: () => "/hajj",
      providesTags: ["Hajj"],
    }),

    // Get a single tour by id
    getHajjById: builder.query<IHajj, string>({
      query: (id) => `/hajj/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Hajj", id }],
    }),
  }),
});
export const { useGetHajjQuery, useGetHajjByIdQuery } = hajjAPi;

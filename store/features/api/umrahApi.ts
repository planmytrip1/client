import { apiSlice } from "./apiSlice";
// import type { IHajj, IBasePackage } from "@/lib/types";
import type { IUmrah } from "@/lib/types/IUmrah";

export const umrahAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tours
    getUmrah: builder.query<IUmrah[], void>({
      query: () => "/umrah",
      providesTags: ["Umrah"],
    }),

    // Get a single tour by id
    getUmrahById: builder.query<IUmrah, string>({
      query: (id) => `/umrah/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Umrah", id }],
    }),
  }),
});
export const { useGetUmrahQuery, useGetUmrahByIdQuery } = umrahAPi;

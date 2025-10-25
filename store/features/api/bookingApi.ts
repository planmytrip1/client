import { apiSlice } from "./apiSlice";
import type { IBooking } from "@/lib/types/IBooking";

export interface bookingResponse {
  success: boolean;
  data: IBooking[];
}

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create booking
    createBooking: builder.mutation<{ success: true; data: IBooking },
      {
        packageId: string;
        packageType: "hajj" | "umrah" | "tours";
        numberOfTravellers: number;
        client: {
          Name: string;
          email: string;
          phone: string;
          address: string;
          specialRequests: string;
        };
        specialRequests?: string;
      }
    >({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),
    getUserBookings: builder.query<IBooking[], { userId: string; packageId: string }>({
      query: ({ userId, packageId }) => `/bookings/${userId}/${packageId}`,
      transformResponse: (response: { success: boolean; data: IBooking[] }) => response.data,
      providesTags: ["Booking"],
    }),

        
  }),
});

export const { useCreateBookingMutation, useGetUserBookingsQuery  } = bookingApi;

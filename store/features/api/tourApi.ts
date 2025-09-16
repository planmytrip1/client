import { apiSlice } from './apiSlice';
import { ITour } from '@/lib/types';

export const tourApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tours
    getTours: builder.query<ITour[], void>({
      query: () => '/tours',
      providesTags: ['Tour'],
    }),

    // Get a single tour by id
    getTourById: builder.query<ITour, string>({
      query: (id) => `/tours/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Tour', id }],
    }),

    // Create a new tour
    createTour: builder.mutation<ITour, Partial<ITour>>({
      query: (body) => ({
        url: '/tours',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tour'],
    }),

    // Update an existing tour
    updateTour: builder.mutation<ITour, { id: string; data: Partial<ITour> }>({
      query: ({ id, data }) => ({
        url: `/tours/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Tour', id }],
    }),

    // Delete a tour
    deleteTour: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/tours/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tour'],
    }),
    
    // Upload tour images
    uploadTourImages: builder.mutation<{ success: boolean; images: string[] }, FormData>({
      query: (formData) => ({
        url: '/tours/upload',
        method: 'POST',
        body: formData,
        // Don't include Content-Type header when using FormData
        formData: true,
      }),
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourByIdQuery,
  useCreateTourMutation,
  useUpdateTourMutation,
  useDeleteTourMutation,
  useUploadTourImagesMutation,
} = tourApi;
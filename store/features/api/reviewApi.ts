// store/features/api/reviewApi.ts
import { apiSlice } from "./apiSlice";

export interface IReview {
  adminReplies?: {
    adminId: {
      _id: string;
      name: string;
    };
    reply: string;
    createdAt: string;
  }[];
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  entityId: string;
  entityType: "Hajj" | "Umrah" | "Tours";
  rating: number;
  comment: string;
  adminComment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  success: boolean;
  data: IReview[];
}

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get reviews for a specific entity
    getReviews: builder.query<ReviewsResponse, { entityId: string; entityType: string }>({
      query: ({ entityId, entityType }) => ({
        url: `/reviews`,
        params: { entityId, entityType },
      }),
      providesTags: ["Review"],
    }),

    // Create a new review
    createReview: builder.mutation<{ success: boolean; data: IReview }, { entityId: string; entityType: string; rating: number; comment: string }>({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),

    // Get average rating for an entity
    getRating: builder.query<{ averageRating: number; reviewCount: number }, { entityType: string; entityId: string }>({
      query: ({ entityType, entityId }) => `/reviews/rating/${entityType}/${entityId}`,
      transformResponse: (response: { success: boolean; data: { averageRating: number; reviewCount: number } }) => response.data,
    }),
  }),
});

export const { useGetReviewsQuery, useCreateReviewMutation, useGetRatingQuery } = reviewApi;

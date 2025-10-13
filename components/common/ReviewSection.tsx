// components/common/ReviewSection.tsx
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/features/auth/authSlice";
import { useCreateReviewMutation, useGetReviewsQuery } from "@/store/features/api/reviewApi";
import { Star } from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface ReviewSectionProps {
  entityId: string;
  entityType: "Hajj" | "Umrah" | "Tours";
}

export default function ReviewSection({ entityId, entityType }: ReviewSectionProps) {
  const user = useAppSelector(selectUser);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useGetReviewsQuery({
    entityType,
    entityId,
  });

  const allReviews = reviews?.data ? reviews.data : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to leave a review");
      return;
    }

    try {
      await createReview({
        entityId,
        entityType,
        rating,
        comment,
      }).unwrap();

      setRating(0);
      setComment("");
      refetch(); // রিভিউ লিস্ট রিফ্রেশ করুন
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const renderStars = (value: number) => {
    return Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-5 h-5 ${i < value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />);
  };

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = allReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>

      {/* রিভিউ ফর্ম */}
      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Share your experience..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !user}
            className={`px-6 py-2 ${
              entityType === "Hajj" ? "bg-green-600 hover:bg-green-700" : entityType === "Umrah" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white rounded-lg font-medium transition-colors ${isSubmitting || !user ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? <LoadingSpinner size="small" /> : "Submit Review"}
          </button>
          {!user && <p className="text-sm text-red-500 mt-2">Please sign in to leave a review</p>}
        </form>
      </div>

      {/* রিভিউ লিস্ট */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>

        {isLoading ? (
          <div className="text-center py-8">
            <LoadingSpinner />
          </div>
        ) : allReviews && allReviews.length > 0 ? (
          <>
            {currentReviews?.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 relative rounded-full overflow-hidden bg-gray-200 mr-3">
                    {review.userId.profileImage ? (
                      <Image src={review.userId.profileImage} alt={review.userId.name} fill className="object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white font-medium text-lg">{review.userId.name.charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{review.userId.name}</p>
                    <div className="flex items-center">
                      <div className="flex mr-2">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
                {/* Static admin reply (for now) */}
                {/* <div className="mt-3 ml-10 border-l-2 border-blue-200 pl-4">
                  <p className="text-sm text-gray-800">
                    <i className="text-blue-600 font-medium">Admin Reply:</i> Thank you for your feedback! We appreciate your support.
                  </p>
                </div> */}

                {review.adminReplies && (review.adminReplies? review.adminReplies.length : 0) > 0 && (
                  <div className="mt-3 ml-14 border-l-2 border-blue-200 pl-4">
                    {review.adminReplies.map((reply, idx) => (
                      <p key={idx} className="text-gray-800 text-sm">
                        <i className="text-blue-600 font-medium">Admin:</i> {reply.reply}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* পেজিনেশন কন্ট্রোল */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50">
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === i + 1
                        ? `${entityType === "Hajj" ? "bg-green-600" : entityType === "Umrah" ? "bg-blue-600" : "bg-indigo-600"} text-white`
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
}

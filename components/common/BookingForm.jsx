import { useState } from "react";
import { X } from "lucide-react";

//  * @param {string} props.itemId - ID of the item being booked


/**
 * Reusable Booking Form Component
 * @param {Object} props
 * @param {string} props.title - Title for the booking form
 * @param {string} props.type - Type of booking (tour, hajj, umrah)
 * @param {string} props.itemName - Name of the item being booked
 * @param {function} props.onClose - Function to close the modal
 */
const BookingForm = ({ title, type, itemName, itemId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    travelers: "1",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // In the future, replace this with your API call
      // await bookingApi.create({ ...formData, itemId, type });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      
      // Reset form after 3 seconds of showing success message
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            {title || `Book ${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Package'}`}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-green-600 mb-2">Booking Successful!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for booking {itemName}. We will contact you soon with more details.
              </p>
              <p className="text-sm text-gray-500">This window will close automatically...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Travelers*
                  </label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                    <option value="more">More than 10</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows="3"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special requests or information we should know..."
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
                  {error}
                </div>
              )}

              {type === "hajj" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> For Hajj packages, we will require additional documents including passport copies, photos, and vaccination records. We'll request these after your initial booking.
                  </p>
                </div>
              )}

              {type === "umrah" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> For Umrah packages, please ensure your passport has at least 6 months validity from the travel date.
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
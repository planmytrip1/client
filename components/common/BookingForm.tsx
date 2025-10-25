import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X } from "lucide-react";
import { useCreateBookingMutation } from "@/store/features/api/bookingApi";
import { IBooking } from "@/lib/types/IBooking";

interface BookingFormProps {
  booking?: IBooking; // optional, for prefill
  type: "hajj" | "umrah" | "tours";
  itemName: string;
  itemId: string;
  title?: string;
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  travelers: number;
  specialRequests: string;
}

export default function BookingForm({ booking, title, type, itemName, itemId, onClose }: BookingFormProps) {
  const [createBooking] = useCreateBookingMutation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    travelers: 1,
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Prefill form if booking is passed
  useEffect(() => {
    if (booking) {
      setFormData({
        name: booking.client.Name,
        email: booking.client.email,
        phone: booking.client.phone.toString(), // convert number to string
        address: booking.client.address,
        travelers: booking.numberOfTravellers,
        specialRequests: booking.specialRequests || "",
      });
    }
  }, [booking]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const bookingData = {
        packageId: itemId,
        packageType: type, // lowercase, matches backend enum
        numberOfTravellers: Number(formData.travelers),
        client: {
          Name: formData.name,
          email: formData.email,
          phone: formData.phone.toString(),
          address: formData.address,
          specialRequests: formData.specialRequests,
        },
        specialRequests: formData.specialRequests,
      };

      await createBooking(bookingData).unwrap();
      setIsSuccess(true);

      setTimeout(() => {
        onClose && onClose();
      }, 3000);
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
      if (err?.data?.message) {
        setError("You need to login first");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">{title || `Book ${type.charAt(0).toUpperCase() + type.slice(1)}`}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
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
              <p className="text-gray-600 mb-4">Thank you for booking {itemName}. We will contact you soon with more details.</p>
              <p className="text-sm text-gray-500">This window will close automatically...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Name */}
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
                    placeholder="Your Name.."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-0"
                  />
                </div>

                {/* Email */}
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
                    placeholder="Your Email.."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-0"
                  />
                </div>

                {/* Phone */}
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
                    placeholder="01..."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-0"
                  />
                </div>

                {/* Travelers */}
                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1 ">
                    Number of Travelers*
                  </label>
                  <select
                    id="travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-0"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                    <option value="more">More than 10</option>
                  </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 ">
                    Address*
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Your Adress.."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-0"
                  />
                </div>

                {/* Special Requests */}
                <div className="md:col-span-2">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-0"
                    placeholder="Any special requests or information we should know..."
                  />
                </div>
              </div>

              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{error}</div>}

              {type === "hajj" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> For Hajj packages, additional documents like passport, photo & vaccination records will be required.
                  </p>
                </div>
              )}

              {type === "umrah" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> Passport must have at least 6 months validity from travel date.
                  </p>
                </div>
              )}

              {type === "tours" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> For International Tours, Passport must have at least 6 months validity from travel date.
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors text-center" disabled={isSubmitting}>
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-gradient-to-r from-primary to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white text-center rounded ${
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
}

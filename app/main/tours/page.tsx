"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useGetToursQuery } from "@/store/features/api/tourApi";
import TourCard from "@/components/tours/TourCard";
import { ITour } from '@/lib/types/ITour';

export default function ToursPage() {
  const { data: tours = [], isLoading, error } = useGetToursQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 3;

  // Filtered Data
  const [filteredTours, setFilteredTours] = useState<ITour[]>([]);

  useEffect(() => {
  if (!tours) return;

  let filtered = tours;

  if (searchTerm) {
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.destination && t.destination.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  if (selectedDestination) {
    filtered = filtered.filter((t) => t.destination === selectedDestination);
  }

  if (selectedMonth) {
    const monthIndex = months.indexOf(selectedMonth);
    filtered = filtered.filter(
      (t) => new Date(t.startDate).getMonth() === monthIndex
    );
  }

  if (priceRange.min) {
    filtered = filtered.filter(
      (t) => t.pricePerPerson >= Number(priceRange.min)
    );
  }

  if (priceRange.max) {
    filtered = filtered.filter(
      (t) => t.pricePerPerson <= Number(priceRange.max)
    );
  }

  setFilteredTours(filtered);
  setCurrentPage(1);

}, [tours, searchTerm, selectedDestination, selectedMonth, priceRange]);


  // Pagination logic
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  // Get unique destinations dynamically
  const destinations = [...new Set(tours.map((t) => t.destination))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Our Tours</h1>

      {/* Search + Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Destination */}
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Destinations</option>
            {destinations.map((dest) => (
              <option key={dest} value={dest}>
                {dest}
              </option>
            ))}
          </select>

          {/* Month */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>

          {/* Price */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Tour Cards */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading tours...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load tours</p>
        </div>
      )}

      {!isLoading && !error && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTours.length > 0 ? (
              currentTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">
                No tours found
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

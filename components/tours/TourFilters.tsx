import React from "react";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { ITour } from "@/lib/types";

interface TourFiltersProps {
  tours: ITour[];
}

export default function TourFilters({ tours }: TourFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Filtered Data
  const filteredTours = useMemo(() => {
  let temp = tours;

  const normalizeStr = (str: string) => str.normalize("NFC").toLowerCase();

  if (searchTerm) {
    temp = temp.filter(
      (t) =>
        normalizeStr(t.title).includes(normalizeStr(searchTerm)) ||
        (t.destination && normalizeStr(t.destination).includes(normalizeStr(searchTerm))) ||
        (t.description && normalizeStr(t.description).includes(normalizeStr(searchTerm)))
    );
  }

  if (selectedDestination) {
    temp = temp.filter((t) => t.destination === selectedDestination);
  }

  if (selectedMonth) {
    const monthIndex = months.indexOf(selectedMonth);
    temp = temp.filter((t) => new Date(t.startDate).getMonth() === monthIndex);
  }

  if (priceRange.min) {
    temp = temp.filter((t) => t.pricePerPerson >= Number(priceRange.min));
  }

  if (priceRange.max) {
    temp = temp.filter((t) => t.pricePerPerson <= Number(priceRange.max));
  }

  return temp;
}, [tours, searchTerm, selectedDestination, selectedMonth, priceRange]);


  // Get unique destinations dynamically
  const destinations = [...new Set(tours.map((t) => t.destination))];

  return (
    <div>
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

        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Destination */}
          <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} className="p-2 border border-gray-300 rounded-lg">
            <option value="">All Destinations</option>
            {destinations.map((dest, id) => (
              <option key={id} value={dest}>
                {dest}
              </option>
            ))}
          </select>

          {/* Month */}
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="p-2 border border-gray-300 rounded-lg">
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
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-1/2 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

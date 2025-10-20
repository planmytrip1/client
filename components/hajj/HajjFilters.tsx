import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { IHajj } from "@/lib/types/IHajj";

interface HajjFiltersProps {
  packages: IHajj[];
  onFilterChange: (filtered: IHajj[]) => void;
}

export default function HajjFilters({ packages, onFilterChange }: HajjFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique hajj years
  const years = [...new Set(packages.map((p) => p.hajjYear))];

  // Get unique durations
  const durations = [...new Set(packages.map((p) => p.duration))];

  // Apply filters
  useEffect(() => {
    if (!packages.length) return;

    let filtered = packages;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.hotels.some((h) => h.name.toLowerCase().includes(term)));
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter((p) => p.hajjYear === selectedYear);
    }

    // Duration filter
    if (selectedDuration) {
      filtered = filtered.filter((p) => p.duration === selectedDuration);
    }

    // Price range
    if (priceRange.min) {
      filtered = filtered.filter((p) => p.startingPrice >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((p) => p.startingPrice <= Number(priceRange.max));
    }

    onFilterChange(filtered);
  }, [packages, searchTerm, selectedYear, selectedDuration, priceRange, onFilterChange]);

  return (
    <div>
      {/* Search + Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search hajj packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hajj focus:border-hajj"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>

        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-hajj text-white rounded-lg hover:bg-hajj-600 transition">
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Hajj Year */}
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hajj focus:border-hajj">
            <option value="">All Hajj Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Duration (চলমান) */}
          <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hajj focus:border-hajj">
            <option value="">All Durations</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hajj focus:border-hajj"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hajj focus:border-hajj"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedYear("");
              setSelectedDuration("");
              setPriceRange({ min: "", max: "" });
            }}
            className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useGetHajjQuery } from "@/store/features/api/HajjApi";
import HajjCard from "@/components/hajj/HajjCard";
import HajjFilters from "@/components/hajj/HajjFilters";
import { IHajj } from '@/lib/types/IHajj';
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function HajjPage() {
  const { data: hajjPackages = [], isLoading, error } = useGetHajjQuery();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 3;

  // Filtered Data
  const [filteredPackages, setFilteredPackages] = useState<IHajj[]>([]);
  
  // Initialize filtered packages when data loads
  useEffect(() => {
    if (hajjPackages) {
      setFilteredPackages(hajjPackages);
    }
  }, [hajjPackages]);

  // Handle filter changes from HajjFilters component
  const handleFilterChange = (filteredResults: IHajj[]) => {
    setFilteredPackages(filteredResults);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Pagination logic
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gradient">Explore Our Hajj Packages</h1>
      
      {/* Filters */}
      <HajjFilters 
        packages={hajjPackages} 
        onFilterChange={handleFilterChange} 
      />
      
      {/* Package Cards */}
      {isLoading ? (
        <div className="text-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load hajj packages</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {currentPackages.length > 0 ? (
              currentPackages.map((hajj) => (
                <HajjCard key={hajj._id} hajj={hajj} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">
                No hajj packages found
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
                      ? "bg-green-600 text-white border-green-600"
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
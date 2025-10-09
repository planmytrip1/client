"use client";

import { useState, useEffect } from "react";
import { useGetUmrahQuery } from "@/store/features/api/umrahApi";
import UmrahCard from "@/components/umrah/UmrahCard";
import UmrahFilters from "@/components/umrah/UmrahFilters";
import { IUmrah } from '@/lib/types/IUmrah';
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function UmrahPage() {
  const { data: umrahPackages = [], isLoading, error } = useGetUmrahQuery();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 3;


  // Filtered Data
  const [filteredPackages, setFilteredPackages] = useState<IUmrah[]>([]);
  
  // Initialize filtered packages when data loads
  useEffect(() => {
    if (umrahPackages) {
      setFilteredPackages(umrahPackages);
    }
  }, [umrahPackages]);

  // Handle filter changes from UmrahFilters component
  const handleFilterChange = (filteredResults: IUmrah[]) => {
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
      <h1 className="text-3xl font-bold mb-6 text-gradient">Explore Our Umrah Packages</h1>
      
      {/* Filters */}
      <UmrahFilters 
        packages={umrahPackages} 
        onFilterChange={handleFilterChange} 
      />
      
      {/* Package Cards */}
      {isLoading ? (
        <div className="text-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load umrah packages</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {currentPackages.length > 0 ? (
              currentPackages.map((umrah) => (
                <UmrahCard key={umrah._id} umrah={umrah} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">
                No umrah packages found
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
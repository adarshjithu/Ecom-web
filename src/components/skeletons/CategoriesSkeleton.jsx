import React from "react";

const CategoriesSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs Skeleton */}
        <div className="px-4 py-2 bg-gray-50">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Main Category Tabs Skeleton */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex gap-4 overflow-x-auto">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-10 bg-gray-200 rounded-full w-28 animate-pulse flex-shrink-0"
              ></div>
            ))}
          </div>
        </div>

        {/* Hair Care Section Skeleton */}
        <div className="px-4 py-4">
          {/* Section Title Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
          
          {/* Sub-category Scroll Skeleton */}
          <div className="flex gap-4 overflow-x-auto mb-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2 w-34 h-24">
                <div className="w-34 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Promotional Heading Skeleton */}
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[#EBEFFF] to-[#E4E4E7] overflow-hidden box-border h-64 sm:h-80 md:h-96 lg:h-[420px] flex flex-col"
              >
                <div className="bg-[linear-gradient(360deg,#FFFFFF_33.97%,#EAEEFF_100%)] rounded-[calc(1rem-1px)] p-2 flex flex-col h-full">
                  {/* Wishlist Icon Skeleton */}
                  <div className="absolute top-2 right-2 z-10 p-2 pb-0">
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Image section skeleton */}
                  <div className="flex items-center justify-center h-32 sm:h-40 md:h-52 lg:h-64 w-full">
                    <div className="bg-gray-200 rounded-xl w-full h-full animate-pulse"></div>
                  </div>
                  
                  {/* Details section skeleton */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Product name skeleton */}
                      <div className="h-4 bg-gray-200 rounded w-full mb-1 mt-1 animate-pulse"></div>
                      {/* Product description skeleton */}
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-1 animate-pulse"></div>
                      {/* Rating skeleton */}
                      <div className="h-6 bg-gray-200 rounded-full w-20 mb-2 animate-pulse"></div>
                    </div>
                    
                    {/* Price and button skeleton */}
                    <div className="p-[1px] rounded-[8px] bg-[linear-gradient(90deg,#E4E4E4_0%,#EAEFFF_77.43%)]">
                      <div className="flex items-center justify-between bg-[linear-gradient(90deg,#FFFFFF_59.29%,#E8EDFF_100%)] rounded-[8px] px-1 py-1 gap-1">
                        <div className="flex items-center space-x-1 min-w-0 flex-1">
                          <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </div>
                        <div className="w-7 h-7 bg-gray-200 rounded-[6px] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSkeleton; 
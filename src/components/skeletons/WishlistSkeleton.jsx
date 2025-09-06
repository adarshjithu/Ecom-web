import React from "react";

const WaveSkeleton = ({ className = "" }) => (
  <div className={`animate-shimmer ${className}`} />
);

// Breadcrumb skeleton
const BreadcrumbSkeleton = () => (
  <div className="px-4 py-4">
    <div className="flex items-center gap-2">
      <div className="w-12 h-4 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      <div className="w-4 h-4 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
      <div className="w-16 h-4 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
    </div>
  </div>
);

// Category tabs skeleton
const CategoryTabsSkeleton = () => (
  <div className="px-4 pb-4">
    <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="w-20 h-8 bg-gray-200 rounded-full flex-shrink-0">
          <WaveSkeleton className="h-full w-full rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

// Page title skeleton
const PageTitleSkeleton = () => (
  <div className="px-4 mb-4">
    <div className="w-48 h-6 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
  </div>
);

// Product card skeleton that matches the actual ProductCard component
const ProductCardSkeleton = () => (
  <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[#EBEFFF] to-[#E4E4E7] overflow-hidden box-border h-64 sm:h-80 md:h-96 lg:h-[420px] flex flex-col">
    {/* Wishlist Icon skeleton - absolute top right */}
    <div className="absolute top-2 right-2 z-10 p-2 pb-0">
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
    </div>
    
    <div className="bg-[linear-gradient(360deg,#FFFFFF_33.97%,#EAEEFF_100%)] rounded-[calc(1rem-1px)] p-2 flex flex-col h-full">
      {/* Image section skeleton */}
      <div className="flex items-center justify-center h-32 sm:h-40 md:h-52 lg:h-64 w-full">
        <div className="bg-white rounded-xl shadow p-2 w-full h-full flex items-center justify-center">
          <div className="w-full h-full bg-gray-200 rounded-lg">
            <WaveSkeleton className="h-full w-full rounded-lg" />
          </div>
        </div>
      </div>
      
      {/* Details section skeleton */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product name skeleton */}
          <div className="w-full h-3 sm:h-4 bg-gray-200 rounded mb-1 mt-1">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          
          {/* Description skeleton */}
          <div className="w-3/4 h-3 sm:h-4 bg-gray-200 rounded mb-1">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          
          {/* Rating skeleton */}
          <div className="rounded-full p-[.5px] w-fit mb-2 bg-gradient-to-r from-[#EDE8CA] to-[#FFFFFF]">
            <div className="flex items-center space-x-2 rounded-full px-2 py-1 bg-gradient-to-r from-[#FFFADD] to-[#FFFFFF]">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-8 h-3 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-12 h-3 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Price and button section skeleton */}
        <div className="p-[1px] rounded-[8px] bg-gradient-to-r from-[#E4E4E4] to-[#EAEFFF]">
          <div className="flex items-center justify-between flex-wrap bg-gradient-to-r from-[#FFFFFF] to-[#E8EDFF] rounded-[8px] px-1 py-1 gap-1">
            <div className="flex items-center space-x-1 min-w-0 flex-1">
              <div className="w-12 h-3 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-2 h-3 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-16 h-3 sm:h-4 bg-gray-200 rounded-full">
                <WaveSkeleton className="h-full w-full rounded-full" />
              </div>
            </div>
            <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gray-200 rounded-[6px] sm:rounded-[8px]">
              <WaveSkeleton className="h-full w-full rounded-[6px] sm:rounded-[8px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Wishlist Skeleton Component
const WishlistSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Container for tablet and desktop */}
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <BreadcrumbSkeleton />
        
        {/* Category Tabs */}
        <CategoryTabsSkeleton />
        
        {/* Main Content */}
        <div className="px-4 pb-6">
          {/* Page Title */}
          <PageTitleSkeleton />
          
          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[...Array(10)].map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistSkeleton; 
import React from "react";

// Wave animation skeleton component
const WaveSkeleton = ({ className = "" }) => (
  <div className={`animate-shimmer ${className}`} />
);

// Carousel skeleton
const CarouselSkeleton = () => (
  <div className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] bg-gray-200 rounded-lg overflow-hidden">
    <WaveSkeleton className="h-full w-full rounded-lg" />
  </div>
);

// Category skeleton for mobile grid
const CategorySkeleton = () => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 rounded-full bg-gray-200 mb-1 overflow-hidden">
      <WaveSkeleton className="h-full w-full rounded-full" />
    </div>
    <div className="w-16 h-3 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
  </div>
);

// Category skeleton for tablet/desktop
const CategoryDesktopSkeleton = () => (
  <div className="flex flex-col items-center min-w-[167px]">
    <div className="w-[167px] h-25 rounded-[16px] bg-gray-200 mb-1 overflow-hidden">
      <WaveSkeleton className="h-full w-full rounded-[16px]" />
    </div>
    <div className="w-20 h-4 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
  </div>
);

// Product card skeleton that matches the actual ProductCard component
const ProductCardSkeleton = ({ desktop = false }) => (
  <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[#EBEFFF] to-[#E4E4E7] overflow-hidden box-border h-72 sm:h-96 lg:h-[420px] flex flex-col">
    {/* Wishlist Icon skeleton - absolute top right */}
    <div className="absolute top-2 right-2 z-10 p-2 pb-0">
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
    </div>
    
    <div className="bg-[linear-gradient(360deg,#FFFFFF_33.97%,#EAEEFF_100%)] rounded-[calc(1rem-1px)] p-2 flex flex-col h-full">
      {/* Image section skeleton */}
      <div className="flex items-center justify-center h-40 sm:h-52 lg:h-64 w-full">
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

// Brand skeleton
const BrandSkeleton = () => (
  <div className="rounded-2xl aspect-[3/4] bg-gray-200 overflow-hidden">
    <WaveSkeleton className="h-full w-full rounded-2xl" />
  </div>
);

// Banner skeleton
const BannerSkeleton = () => (
  <div className="rounded-2xl overflow-hidden h-160 bg-gray-200">
    <WaveSkeleton className="h-full w-full rounded-2xl" />
  </div>
);

// Review card skeleton
const ReviewCardSkeleton = () => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <div className="flex items-center mb-3">
      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
      <div className="flex-1">
        <div className="w-24 h-3 bg-gray-200 rounded mb-1">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="w-16 h-3 bg-gray-200 rounded">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="w-full h-3 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      <div className="w-3/4 h-3 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      <div className="w-1/2 h-3 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
    </div>
  </div>
);

// Section header skeleton
const SectionHeaderSkeleton = () => (
  <div className="flex items-center justify-between mb-4">
    <div className="w-48 h-8 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
    <div className="w-16 h-4 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
  </div>
);

// Main HomePage Skeleton Component
const HomePageSkeleton = () => {
  return (
    <>
      {/* Carousel Skeleton */}
      <CarouselSkeleton />
      
      <div className="px-3 sm:px-4 md:px-5 lg:px-12 pt-6">
        {/* Mobile Categories Grid Skeleton */}
        <div className="block sm:hidden pb-6">
          <div className="grid grid-cols-4 gap-y-4">
            {/* All Categories skeleton */}
            {[...Array(9)].map((_, idx) => (
              <CategorySkeleton key={idx} />
            ))}
          </div>
        </div>

        {/* Tablet/Desktop Categories Skeleton */}
        <div className="hidden sm:flex space-x-2 overflow-x-auto py-2 scrollbar-hide pb-6">
          {Array.from({ length: 10 }).map((_, idx) => (
            <CategoryDesktopSkeleton key={idx} />
          ))}
        </div>

        {/* Super Saving Deals Section */}
        <div className="pb-6">
          <SectionHeaderSkeleton />
          
          {/* Mobile Product Grid Skeleton */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          </div>

          {/* Tablet/Desktop Product Grid Skeleton */}
          <div className="hidden sm:block">
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-6">
              {Array.from({ length: 5 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} desktop />
              ))}
            </div>
          </div>
        </div>

        {/* Shop By Brands Section */}
        <div className="pb-6">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, idx) => (
              <BrandSkeleton key={idx} />
            ))}
          </div>
        </div>

        {/* Banner Skeleton */}
        <div className="mb-1 pb-6">
          <BannerSkeleton />
        </div>

        {/* Up to 70% off Section */}
        <div className="pb-6">
          <div className="w-64 h-8 bg-gray-200 rounded mb-4">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
        </div>

        {/* Second Banner Skeleton */}
        <div className="pb-6">
          <BannerSkeleton />
        </div>

        {/* Reviews Section */}
        <div className="px-4 pb-6">
          <div className="w-48 h-8 bg-gray-200 rounded mb-4">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <ReviewCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageSkeleton; 
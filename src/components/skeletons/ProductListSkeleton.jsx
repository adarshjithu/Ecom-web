import React from "react";

const WaveSkeleton = ({ className = "" }) => (
  <div className={`animate-shimmer ${className}`} />
);

const BreadcrumbSkeleton = () => (
  <div className="px-4 py-4">
    <div className="flex items-center gap-2">
      <div className="w-16 h-5 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      <div className="w-3 h-3 bg-gray-200 rounded-full" />
      <div className="w-32 h-5 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
    </div>
  </div>
);

const SidebarSkeleton = () => (
  <div className="hidden md:block w-64 shrink-0 pt-4">
    <div className="bg-white rounded-lg shadow p-4 space-y-6">
      {/* Brands */}
      <div>
        <div className="w-20 h-4 bg-gray-200 rounded mb-2">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="space-y-2">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-16 h-3 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Uses */}
      <div>
        <div className="w-20 h-4 bg-gray-200 rounded mb-2">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="space-y-2">
          {[...Array(7)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="w-20 h-3 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Sort By */}
      <div>
        <div className="w-20 h-4 bg-gray-200 rounded mb-2">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full" />
              <div className="w-24 h-3 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FilterChipSkeleton = () => (
  <div className="h-6 w-20 bg-gray-200 rounded-full">
    <WaveSkeleton className="h-full w-full rounded-full" />
  </div>
);

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


const PaginationSkeleton = () => (
  <div className="flex justify-center items-center gap-2 mt-6">
    {[...Array(5)].map((_, idx) => (
      <div key={idx} className="w-10 h-8 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
    ))}
  </div>
);

const ProductListSkeleton = () => (
  <div className="min-h-screen bg-[#F8F9FB]">
    {/* Breadcrumb */}
    <BreadcrumbSkeleton />
    <div className="flex gap-4 px-2 md:px-6 lg:px-12">
      {/* Sidebar (Desktop) */}
      <SidebarSkeleton />
      {/* Main Content */}
      <main className="flex-1 py-4 w-full">
        {/* Page Title */}
        <div className="px-4 pb-2 text-xl font-semibold hidden md:block">
          <div className="w-48 h-7 bg-gray-200 rounded">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
        </div>
        {/* Filter Chips */}
        <div className="px-4 pb-2 flex flex-wrap gap-2 items-center">
          {[...Array(3)].map((_, idx) => (
            <FilterChipSkeleton key={idx} />
          ))}
        </div>
        {/* Product Grid */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-1 md:mt-2">
          {[...Array(12)].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
        {/* Pagination */}
        <PaginationSkeleton />
      </main>
    </div>
  </div>
);

export default ProductListSkeleton; 
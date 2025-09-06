import React from "react";

const WaveSkeleton = ({ className = "" }) => (
  <div className={`animate-shimmer ${className}`} />
);

const BreadcrumbSkeleton = ({ mobile }) => (
  <div className={mobile ? "md:hidden px-4 pt-4 pb-4" : "hidden md:block px-6 md:px-16 pt-6"}>
    <div className={`flex items-center ${mobile ? "gap-1" : "space-x-2 py-8"}`}>
      {[...Array(3)].map((_, idx) => (
        <React.Fragment key={idx}>
          <div className="w-20 h-5 bg-gray-200 rounded">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          {idx < 2 && (
            <div className="w-3 h-3 bg-gray-200 rounded-full mx-1">
              <WaveSkeleton className="h-full w-full rounded-full" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ImageGallerySkeleton = () => (
  <div className="md:col-span-1 lg:col-span-5 space-y-4">
    <div className="aspect-square border border-gray-200 rounded-[16px] overflow-hidden relative bg-gray-100">
      <WaveSkeleton className="w-full h-full rounded-[16px]" />
      {/* Wishlist Icon */}
      <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full shadow-sm flex items-center justify-center">
        <WaveSkeleton className="w-5 h-5 rounded-full" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-3 pt-4">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="aspect-square border border-gray-200 rounded-[8px] overflow-hidden bg-gray-100">
          <WaveSkeleton className="w-full h-full rounded-[8px]" />
        </div>
      ))}
    </div>
  </div>
);

const ProductInfoSkeleton = () => (
  <div className="md:col-span-1 lg:col-span-7 space-y-4">
    {/* Badges */}
    <div className="flex items-center space-x-2">
      <div className="w-24 h-7 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
      <div className="w-20 h-7 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
    </div>
    <div className="w-3/4 h-7 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
    {/* Rating */}
    <div className="w-32 h-7 bg-gray-200 rounded-full">
      <WaveSkeleton className="h-full w-full rounded-full" />
    </div>
    {/* Delivery */}
    <div className="w-40 h-5 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
    {/* Price */}
    <div className="flex items-center space-x-2 md:space-x-3">
      <div className="w-20 h-8 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      <div className="w-14 h-5 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      <div className="w-16 h-6 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
    </div>
    {/* Add to Cart Button */}
    <div className="w-40 h-10 bg-gray-200 rounded">
      <WaveSkeleton className="h-full w-full rounded" />
    </div>
    {/* Variants */}
    <div className="space-y-3 md:space-y-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="space-y-2">
          <div className="w-24 h-4 bg-gray-200 rounded">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded-md">
                <WaveSkeleton className="h-full w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {/* Quantity Selector */}
    <div className="pt-2">
      <div className="w-20 h-4 bg-gray-200 rounded mb-2">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-md">
          <WaveSkeleton className="h-full w-full rounded-md" />
        </div>
        <div className="w-8 h-6 bg-gray-200 rounded">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-md">
          <WaveSkeleton className="h-full w-full rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

const TabsSkeleton = () => (
  <div className="px-4 md:px-8 lg:px-16 md:pb-0">
    <div className="w-full grid grid-cols-3 h-10 md:h-12 gap-2 mb-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="h-full bg-gray-200 rounded">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
      ))}
    </div>
    {/* Tab content skeleton */}
    <div className="space-y-6 mt-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="space-y-3">
          <div className="w-40 h-6 bg-gray-200 rounded">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          <div className="w-full h-4 bg-gray-200 rounded">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          <div className="w-3/4 h-4 bg-gray-200 rounded">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Product card skeleton that matches the actual ProductCard component styling
const ProductCardSkeleton = () => (
  <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[#EBEFFF] to-[#E4E4E7] overflow-hidden box-border h-72 sm:h-80 md:h-96 lg:h-[420px] flex flex-col">
    {/* Wishlist Icon skeleton - absolute top right */}
    <div className="absolute top-2 right-2 z-10 p-1">
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
    </div>
    
    <div className="bg-[linear-gradient(360deg,#FFFFFF_33.97%,#EAEEFF_100%)] rounded-[calc(1rem-1px)] p-2 flex flex-col h-full">
      {/* Image section skeleton */}
      <div className="flex items-center justify-center h-32 sm:h-40 md:h-52 lg:h-64 w-full mb-2">
        <div className="bg-white rounded-xl shadow-sm p-2 w-full h-full flex items-center justify-center">
          <div className="w-full h-full bg-gray-200 rounded-lg">
            <WaveSkeleton className="h-full w-full rounded-lg" />
          </div>
        </div>
      </div>
      
      {/* Details section skeleton */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product name skeleton */}
          <div className="w-full h-3 sm:h-4 bg-gray-200 rounded mb-1">
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

const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-white">
    {/* Breadcrumbs */}
    <BreadcrumbSkeleton mobile />
    <BreadcrumbSkeleton mobile={false} />

    {/* Mobile Image Section */}
    <div className="md:hidden relative">
      <div className="aspect-square bg-gray-100">
        <WaveSkeleton className="w-full h-full rounded" />
      </div>
      {/* Wishlist Icon */}
      <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full shadow-sm flex items-center justify-center">
        <WaveSkeleton className="w-5 h-5 rounded-full" />
      </div>
      {/* Navigation arrows */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
        <WaveSkeleton className="w-4 h-4 rounded-full" />
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
        <WaveSkeleton className="w-4 h-4 rounded-full" />
      </div>
      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="w-2 h-2 rounded-full bg-gray-200">
            <WaveSkeleton className="h-full w-full rounded-full" />
          </div>
        ))}
      </div>
      {/* Image counter */}
      <div className="absolute bottom-4 right-4 w-10 h-5 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
    </div>

    {/* Desktop/Tablet Layout */}
    <div className="hidden md:block mx-auto bg-white w-full px-6 md:px-16 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        <ImageGallerySkeleton />
        <ProductInfoSkeleton />
      </div>
    </div>

    {/* Mobile Product Info Section */}
    <div className="md:hidden px-4 py-4 space-y-3 md:space-y-4">
      {/* Badges */}
      <div className="flex items-center space-x-2">
        <div className="w-24 h-7 bg-gray-200 rounded-full">
          <WaveSkeleton className="h-full w-full rounded-full" />
        </div>
        <div className="w-20 h-7 bg-gray-200 rounded-full">
          <WaveSkeleton className="h-full w-full rounded-full" />
        </div>
      </div>
      {/* Product Name */}
      <div className="w-3/4 h-6 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      {/* Rating */}
      <div className="w-24 h-5 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
      {/* Delivery Info */}
      <div className="w-40 h-4 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      {/* Pricing */}
      <div className="flex items-center space-x-2 md:space-x-3">
        <div className="w-16 h-6 bg-gray-200 rounded">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="w-12 h-4 bg-gray-200 rounded">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="w-14 h-5 bg-gray-200 rounded-full">
          <WaveSkeleton className="h-full w-full rounded-full" />
        </div>
      </div>
      {/* Add to Cart Button */}
      <div className="w-40 h-10 bg-gray-200 rounded">
        <WaveSkeleton className="h-full w-full rounded" />
      </div>
      {/* Mobile Variant Selectors */}
      <div className="space-y-3 md:space-y-4">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="space-y-2">
            <div className="w-24 h-4 bg-gray-200 rounded">
              <WaveSkeleton className="h-full w-full rounded" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-md">
                  <WaveSkeleton className="h-full w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Quantity Selector */}
      <div className="pt-2">
        <div className="w-20 h-4 bg-gray-200 rounded mb-2">
          <WaveSkeleton className="h-full w-full rounded" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-md">
            <WaveSkeleton className="h-full w-full rounded-md" />
          </div>
          <div className="w-8 h-6 bg-gray-200 rounded">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md">
            <WaveSkeleton className="h-full w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>

    {/* Tabs Section Skeleton */}
    <TabsSkeleton />
  </div>
);

export default ProductDetailSkeleton; 
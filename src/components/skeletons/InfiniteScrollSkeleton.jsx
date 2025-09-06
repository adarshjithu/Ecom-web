import React from 'react';

const InfiniteScrollSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-1 md:mt-2">
      {Array.from({ length: 15 }, (_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="aspect-square bg-gray-200"></div>
          
          {/* Content skeleton */}
          <div className="p-3">
            {/* Title skeleton */}
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
            
            {/* Price skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
            
            {/* Rating skeleton */}
            <div className="flex items-center gap-1 mb-2">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-8"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteScrollSkeleton; 
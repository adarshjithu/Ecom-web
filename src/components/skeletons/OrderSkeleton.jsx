import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 animate-pulse">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="px-6 py-2 h-8 bg-gray-200 rounded-lg"
              style={{ width: "100px" }}
            />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Left: Order History */}
          <div className="w-full lg:w-80 bg-white rounded-xl border p-4 flex-shrink-0">
            <div className="h-5 w-28 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-white p-4 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-3 w-28 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Main Content */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            {/* Order Details Card */}
            <div className="bg-white rounded-xl border p-4 space-y-3">
              <div className="h-5 w-40 bg-gray-200 rounded"></div>
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2">
                  <div className="h-14 w-14 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Payment Details Card */}
            <div className="bg-white rounded-xl border p-4 space-y-2">
              <div className="h-5 w-36 bg-gray-200 rounded mb-2"></div>
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2 mt-2">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Delivery Details Card */}
            <div className="bg-white rounded-xl border p-4 space-y-2">
              <div className="h-5 w-36 bg-gray-200 rounded mb-2"></div>
              {[...Array(2)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="h-3 w-28 bg-gray-200 rounded"></div>
                  <div className="h-3 w-40 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;

import ProductCard from "@/components/mobile/product/ProductCard";
import { ArrowLeft, Bell } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllProduct = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-[var(--border]">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} className="text-[var(--icon)]" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-[var(--primary)]">
              HairCare
            </h1>
          </div>
        </div>
        <button
          className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={20} className="text-[var(--icon)]" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 py-4">
        {[...Array(10)].map((_, index) => (
          <ProductCard key={index} onClick={() => navigate("/product")} />
        ))}
      </div>
    </div>
  );
};

export default AllProduct;

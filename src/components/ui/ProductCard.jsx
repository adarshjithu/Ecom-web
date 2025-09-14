import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "./button";

const ProductCard = () => {
  const productImages = [
    "https://images-static.nykaa.com/media/catalog/product/4/2/42e22c1NYMATRIX00109_1.jpg?tr=w-500",
    "/api/placeholder/200/280",
    "/api/placeholder/200/280",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-sm mx-auto bg-white overflow-hidden">
      <div className="relative p-4 border border-gray-200 rounded-lg">
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button
            onClick={prevImage}
            className="w-8 h-8 rounded-full bg-[rgba(234,234,234,0.5)] shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </button>
          <button
            onClick={nextImage}
            className="w-8 h-8 rounded-full bg-[rgba(234,234,234,0.5)] shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowRight size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src={productImages[currentImageIndex]}
            alt="Matrix Opti Care Smooth Straight"
            className="h-80 object-contain transition-opacity duration-300"
            key={currentImageIndex}
          />
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-1">
        <h3 className="text-sm font-semibold mb-2 line-clamp-2">
          Cofsis Experdine Gargle | Mouth Wash for Sore throat, Flu, Cold,
          Tonsils, Thr...
        </h3>

        <div className="flex items-center mb-2">
          <span className="text-xs text-gray-600">1 bottle of 100 ml</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-xs font-medium">
            Get by <span className="text-blue-600">tomorrow</span>
          </span>
        </div>

        <div className="flex items-center mb-3">
          <div
            className="flex items-center space-x-1 p-1 rounded-lg"
            style={{
              background: "linear-gradient(90deg, #FFFADD 0%, #FFFFFF 100%)",
            }}
          >
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">4.5</span>
            <span className="text-sm text-gray-500">(12K)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-bold text-gray-900">AED 1200</span>
          <span className="text-sm text-gray-500 line-through">AED 1500</span>
          <span className="text-sm text-green-600 font-medium p-1 rounded-lg bg-green-50">
            20% Off
          </span>
        </div>

        <Button className="w-full">Add to Bag</Button>
      </div>
    </div>
  );
};

export default ProductCard;

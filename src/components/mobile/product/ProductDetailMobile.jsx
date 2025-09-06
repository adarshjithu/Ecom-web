import React, { useState } from "react";
import { Star, Heart, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import ProductHighlight from "../product/ProductHighlight";

const initialProduct = {
  name: "Matrix Opti.Care Professional Shampoo for Frizzy Hair with Shea Butter, Upto 4 Days Frizz Control",
  rating: 4.5,
  reviews: "12K",
  deliveryText: "1 bottle of 200ml",
  price: 1200,
  originalPrice: 1500,
  discount: 20,
  isTopSeller: true,
  onlyOneLeft: true,
  images: [
    "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
    "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
    "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
    "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
  ],
  variants: [
    {
      type: "Hair Type",
      options: [
        { name: "Normal", selected: false },
        { name: "Dry", selected: true },
        { name: "Oily", selected: false },
        { name: "Color-Treated", selected: false },
        { name: "Curly", selected: false },
        { name: "Fine", selected: false },
      ],
    },
    {
      type: "Fragrance",
      options: [
        { name: "Unscented", selected: false },
        { name: "Lavender", selected: true },
      ],
    },
    {
      type: "Package Count",
      options: [
        { name: "1 Bottle", selected: false },
        { name: "3 Bottles", selected: true },
        { name: "5 Bottles", selected: false },
        { name: "10 Bottles", selected: false },
        { name: "12 Bottles", selected: false },
        { name: "24 Bottles", selected: false },
      ],
    },
  ],
};

const ProductDetailMobile = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(initialProduct);

  const handleVariantSelect = (variantType, optionName) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.type === variantType
          ? {
              ...variant,
              options: variant.options.map((option) => ({
                ...option,
                selected: option.name === optionName,
              })),
            }
          : variant
      ),
    }));
  };

  const handleQuantityChange = (increment) => {
    setQuantity((q) => Math.max(1, q + increment));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 bg-gray-50 border-b">
        <div className="flex items-center">
          <ArrowLeft size={20} className="text-gray-600" />
          <span className="ml-2 text-gray-800 font-medium">Hair Care</span>
        </div>
        <Heart size={20} className="text-red-500 fill-red-50" />
      </div>

      {/* Product Image Section */}
      <div className="relative">
        <div className="aspect-square bg-gray-100">
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Navigation arrows */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
          onClick={() =>
            setSelectedImage((i) =>
              i === 0 ? product.images.length - 1 : i - 1
            )
          }
        >
          <ChevronRight size={16} className="rotate-180" />
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
          onClick={() =>
            setSelectedImage((i) =>
              i === product.images.length - 1 ? 0 : i + 1
            )
          }
        >
          <ChevronRight size={16} />
        </button>
        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === selectedImage ? "bg-white" : "bg-gray-400/50"
              }`}
            />
          ))}
        </div>
        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 rounded">
          {selectedImage + 1}/{product.images.length}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="px-4 py-4 space-y-4">
        {/* Badges */}
        <div className="flex items-center justify-between">
          {product.isTopSeller && (
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Top Seller!
            </div>
          )}
          {product.onlyOneLeft && (
            <div className="text-red-600 text-sm font-medium">Only 1 left</div>
          )}
        </div>
        {/* Product Name */}
        <h1 className="text-lg font-medium text-gray-900">{product.name}</h1>
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <Star size={16} className="text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        {/* Delivery Info */}
        <div className="text-sm text-gray-600">
          {product.deliveryText} / Get by <span className="text-gray-900">tomorrow</span>
        </div>
        {/* Pricing */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-semibold text-gray-900">₹{product.price}</span>
          <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
          <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">
            {product.discount}% off
          </span>
        </div>
        {/* Variant Selectors */}
        <div className="space-y-4">
          {product.variants.map((variant, variantIndex) => (
            <div key={variantIndex} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">{variant.type}</h3>
              <div className="grid grid-cols-3 gap-2">
                {variant.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleVariantSelect(variant.type, option.name)}
                    className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                      option.selected
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">Quantity:</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="px-4 pb-20">
        <Tabs defaultValue="highlights" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="highlights" className="text-sm">Highlights</TabsTrigger>
            <TabsTrigger value="packaging" className="text-sm">Packaging</TabsTrigger>
            <TabsTrigger value="details" className="text-sm">Product Details</TabsTrigger>
          </TabsList>
          <TabsContent value="highlights" className="mt-4">
            <ProductHighlight desktop={false} />
          </TabsContent>
          <TabsContent value="packaging" className="mt-4">
            <div className="text-center text-gray-500 py-8">
              Packaging information will be displayed here
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <div className="text-center text-gray-500 py-8">
              Product details will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t px-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailMobile; 
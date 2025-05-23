import ProductHighlight from "@/components/mobile/product/ProductHighlight";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useState } from "react";

const Product = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("200ml of Spray");

  const productImages = [
    "https://m.media-amazon.com/images/I/41mdYfkO8aL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/41mdYfkO8aL._AC_UF1000,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/I/41mdYfkO8aL._AC_UF1000,1000_QL80_.jpg",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Hair Care</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white">
        <div className="relative bg-gray-100">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 z-10  rounded-full   hover:shadow-lg transition-shadow"
          >
            <Heart
              className={`${
                isLiked ? "text-[#C60000] fill-[#C60000]" : "text-[var(--icon)]"
              } transition-colors w-6 h-6`}
            />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:shadow-lg transition-shadow p-0"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--tertiary)]" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:shadow-lg transition-shadow p-0"
          >
            <ChevronRight className="w-6 h-6 text-[var(--tertiary)]" />
          </button>
          <div className="aspect-square flex items-center justify-center p-8">
            <img
              src={productImages[currentImageIndex]}
              alt="Matrix Opti.Care Professional Shampoo"
              className="w-64 h-80 object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {productImages.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                  currentImageIndex === index
                    ? "bg-[var(--tertiary)]"
                    : "bg-[var(--secondary)]"
                }`}
                onClick={() => goToImage(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2 bg-[#F3F6FF] rounded-full px-2 py-1 w-fit">
            <Flame size={20} className="text-[var(--tertiary)] fill-[var(--tertiary)]" />
            <span className="text-[var(--tertiary)]  text-sm">Top Seller!</span>
          </div>

          <h2 className="text-base text-[var(--primary)] leading-tight">
            Matrix Opti.Care Professional Shampoo for Frizzy Hair with Shea
            Butter, Upto 4 Days Frizz Control
          </h2>

          <div
            className="rounded-full p-[1px] w-fit"
            style={{
              background: "linear-gradient(90deg, #EDE8CA 0%, #FFFFFF 100%)",
            }}
          >
            <div
              className="flex items-center space-x-2 rounded-full px-2 py-1"
              style={{
                background: "linear-gradient(90deg, #FFFADD 0%, #FFFFFF 100%)",
              }}
            >
              <Star size={20} className="text-[#E09A01] fill-[#E09A01]" />
              <span className="font-medium text-[#E09A01]">4.5</span>
              <span className="text-[#845C04]">(12K)</span>
            </div>
          </div>

          <div className="text-sm text-[var(--secondary)]">
            1 bottle of 200ml / Get by{" "}
            <span className=" text-[var(--primary)]">tomorrow</span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-medium text-[var(--primary)]">
              ₹1200
            </span>
            <span className="text-[var(--secondary)] line-through text-base">
              ₹1500
            </span>
            <span className="text-[#22784F] font-medium bg-[#E5FFF3] rounded-full px-2">
              20% Off
            </span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedSize("100ml of Spray")}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  selectedSize === "100ml of Spray"
                    ? "border-[var(--tertiary)]"
                    : "border-[var(--secondary)] hover:border-gray-400"
                }`}
              >
                <div className="text-sm text-[var(--secondary)]">
                  100ml of Spray
                </div>
                <div className="font-medium text-[var(--primary)]">₹599.00</div>
              </button>

              <button
                onClick={() => setSelectedSize("200ml of Spray")}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  selectedSize === "200ml of Spray"
                    ? "border-[var(--tertiary)]"
                    : "border-[var(--secondary)] hover:border-gray-400"
                }`}
              >
                <div className="text-sm text-[var(--secondary)]">
                  200ml of Spray
                </div>
                <div className="font-medium text-[var(--primary)]">
                  ₹1200.00
                </div>
              </button>
            </div>
          </div>
          <Tabs defaultValue="highlights" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 h-14 ">
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="packaging">Packaging</TabsTrigger>
              <TabsTrigger value="details">Product Details</TabsTrigger>
            </TabsList>
            <TabsContent value="highlights" className="space-y-3">
              <ProductHighlight />
            </TabsContent>
            <TabsContent value="packaging" className="space-y-3"></TabsContent>
            <TabsContent value="details" className="space-y-3"></TabsContent>
          </Tabs>
          <div className=" fixed bottom-0 left-0 right-0 bg-white p-2 border-t border-[var(--border)] pt-4 flex flex-row justify-between">
            <div className="flex justify-between items-center mb-4 w-1/2">
              <div>
                <div className="text-2xl font-bold text-gray-900">₹1200</div>
                <div className="text-xs text-[var(--secondary)]">
                  Price inclusive of all taxes
                </div>
              </div>
            </div>

            <Button className={"w-1/2"}>
              <ShoppingBag size={24} className="mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
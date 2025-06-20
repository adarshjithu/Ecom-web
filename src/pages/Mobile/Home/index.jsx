import {  reviews } from "@/assets/json/Data";
import ProductCard from "@/components/mobile/product/ProductCard";
import ReviewCard from "@/components/mobile/ReviewCard";
import { Input } from "@/components/ui/input";
import { Bell, MapPinHouse, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { getCategories } from "@/api/categoriesApi";
import { getBrands } from "@/api/brandApi";

const Home = () => {
  const bannerImages = [
    "https://www.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2022/07/weekend-warriors-feature-min_1657891505.jpg&auto=avif&width=1200&fit=crop",
    "https://www.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2022/07/weekend-warriors-feature-min_1657891505.jpg&auto=avif&width=1200&fit=crop",
    "https://www.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2022/07/weekend-warriors-feature-min_1657891505.jpg&auto=avif&width=1200&fit=crop",
  ];

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const navigate = useNavigate();
  const goToSlide = (idx) => setCurrent(idx);

  const fetchData = async () => {
    setLoading(true);
    const response = await getCategories({ type: "parent" });
    setCategories(response.data);
    const brandResponse = await getBrands({ limit: 3 });
    setBrands(brandResponse.data);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center p-4 border-b border-[var(--border]">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50"
            onClick={() => navigate("/location")}
          >
            <MapPinHouse size={20} className="text-[var(--icon)]" />
          </button>
          <div>
            <p className="text-[var(--secondary)] text-xs">Location</p>
            <p className="font-medium tex-xs">Kochi, Kerala, India</p>
          </div>
        </div>
        <button
          className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={20} className="text-[var(--icon)]" />
        </button>
      </div>
      <div className="px-4 py-3 flex gap-2">
        <Input placeholder="Search" className="flex-1" />
      </div>

      <div className="p-4">
        <div className="rounded-2xl overflow-hidden h-45 mb-1">
          <img
            src={bannerImages[current]}
            alt={`Banner ${current + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <div className="flex gap-2">
            {bannerImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                  idx === current
                    ? "bg-[var(--tertiary)]"
                    : "bg-[var(--secondary)]"
                }`}
                onClick={() => goToSlide(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-4 pb-6">
        {categories?.map((category) => (
          <div key={category?._id} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center mb-2">
              <img
                src={category?.image}
                alt={category?.name}
                className="w-full h-full  object-cover"
                onClick={() => navigate(`/category`)}
              />
            </div>
            <p className="text-xs text-center text-[var(--primary)]">
              {category?.name}
            </p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--primary)]">
            Super Saving Deals
          </h2>
          <h2
            className="text-sm font-semibold text-[var(--secondary)] cursor-pointer "
            onClick={() => navigate(`/product-list`)}
          >
            See all
          </h2>
        </div>
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          <div className="min-w-[170px]">
            <ProductCard />
          </div>
          <div className="min-w-[170px]">
            <ProductCard />
          </div>
          <div className="min-w-[180px]">
            <ProductCard />
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">
          Shop By Brands
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {brands?.map((brand, idx) => (
            <div
              key={idx}
              className="rounded-2xl h-45 overflow-hidden shadow bg-white flex flex-col items-center"
            >
              <img
                src={brand?.logo}
                alt={brand?.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="rounded-2xl overflow-hidden h-45 mb-1">
          <img
            src={
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQYGltCe3o4akX7mjAizsL_OCXY31UylXEMToTLCg5lmlHd1gF4"
            }
            alt={`Banner ${current + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <div className="flex gap-2">
            {bannerImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                  idx === current
                    ? "bg-[var(--tertiary)]"
                    : "bg-[var(--secondary)]"
                }`}
                onClick={() => goToSlide(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">
          Up to 70% off on Shampoos
        </h2>
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          <div className="min-w-[170px]">
            <ProductCard />
          </div>
          <div className="min-w-[170px]">
            <ProductCard />
          </div>
          <div className="min-w-[180px]">
            <ProductCard />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="rounded-2xl overflow-hidden h-45 mb-1">
          <img
            src={
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRIrvobG6MLvDjakDk9tz9RiNaq1DYXWCKJN_hXZcOZ7W5sR5mO"
            }
            alt={`Banner ${current + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
        <div className="flex flex-col items-center mt-2">
          <div className="flex gap-2">
            {bannerImages.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                  idx === current
                    ? "bg-[var(--tertiary)]"
                    : "bg-[var(--secondary)]"
                }`}
                onClick={() => goToSlide(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">
          Reviews & Ratings
        </h2>
        <div
          className="flex space-x-2 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          {" "}
          {reviews.map((review, index) => (
            <div key={index} className="min-w-[300px]">
              <ReviewCard data={review} />
            </div>
          ))}
        </div>
      </div>
      {/* <div className=" fixed bottom-0 left-0 right-0 bg-white p-2 border-t border-[var(--border)] pt-4 flex flex-row justify-between"> */}
      <Navigation />
    </div>
  );
};

export default Home;

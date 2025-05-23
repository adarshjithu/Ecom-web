import ProductCard from "@/components/mobile/product/ProductCard";
import ReviewCard from "@/components/mobile/ReviewCard";
import { Input } from "@/components/ui/input";
import { Bell, MapPinHouse } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const bannerImages = [
    "https://www.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2022/07/weekend-warriors-feature-min_1657891505.jpg&auto=avif&width=1200&fit=crop",
    "https://www.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2022/07/weekend-warriors-feature-min_1657891505.jpg&auto=avif&width=1200&fit=crop",
    "https://www.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2022/07/weekend-warriors-feature-min_1657891505.jpg&auto=avif&width=1200&fit=crop",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [bannerImages.length]);
  const categories = [
    {
      id: 1,
      name: "All Categories",
      icon: "https://static.wixstatic.com/media/11062b_53e14c17909f4dc484570c6afbf61dca~mv2.jpg/v1/crop/x_779,y_0,w_5442,h_4480/fill/w_280,h_231,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Face%20roller%20and%20quartz.jpg",
    },
    {
      id: 2,
      name: "Baby Nutrition",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXrcDkcIKv8dPmoC4cLN1hsHiKjBeeubkgyNdeozy4giH9KMbSMuj9_CnRu5OT2jbxMQ&usqp=CAU",
    },
    {
      id: 3,
      name: "Baby Nutrition",
      icon: "https://static.wixstatic.com/media/11062b_53e14c17909f4dc484570c6afbf61dca~mv2.jpg/v1/crop/x_779,y_0,w_5442,h_4480/fill/w_280,h_231,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Face%20roller%20and%20quartz.jpg",
    },
    {
      id: 4,
      name: "Hair Care",
      icon: "https://www.marnys.com/wp-content/uploads/banio-cremas.jpg",
    },
    {
      id: 5,
      name: "Clearance Sale",
      icon: "https://static.wixstatic.com/media/11062b_53e14c17909f4dc484570c6afbf61dca~mv2.jpg/v1/crop/x_779,y_0,w_5442,h_4480/fill/w_280,h_231,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Face%20roller%20and%20quartz.jpg",
      bgColor: "bg-red-500",
    },
    {
      id: 6,
      name: "Baby Nutrition",
      icon: "https://static.wixstatic.com/media/11062b_53e14c17909f4dc484570c6afbf61dca~mv2.jpg/v1/crop/x_779,y_0,w_5442,h_4480/fill/w_280,h_231,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Face%20roller%20and%20quartz.jpg",
    },
    {
      id: 7,
      name: "Hair Care",
      icon: "https://www.marnys.com/wp-content/uploads/banio-cremas.jpg",
    },
    {
      id: 8,
      name: "Korean Beauty",
      icon: "https://static.wixstatic.com/media/11062b_53e14c17909f4dc484570c6afbf61dca~mv2.jpg/v1/crop/x_779,y_0,w_5442,h_4480/fill/w_280,h_231,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Face%20roller%20and%20quartz.jpg",
    },
  ];
  const brands = [
    {
      name: "Centella",
      image:
        "https://img01.ztat.net/article/spp-media-p1/c179772dea9d413085412018d26187ce/dcdba99a1e984a6b8db68fa114eb3a4e.jpg?imwidth=762",
    },
    {
      name: "Minimalist",
      image:
        "https://framerusercontent.com/images/KjN9UNg1xNRfiTFwWnXwdbDYaQU.webp",
    },
    {
      name: "Pampers",
      image:
        "https://marthastable.org/wp-content/uploads/2024/03/nathan-dumlao-KeiQeZJLmus-unsplash-1000x1500.jpg",
    },
  ];
  const reviews = [
  {
    name: "Akshay Mohan",
    verified: true,
    rating: 5,
    time: "4 weeks ago",
    title: "Good product",
    message:
      "I received my product so soon and packing is also good. Shampoo is so good. I really loved it.",
  },
   {
    name: "Akshay Mohan",
    verified: true,
    rating: 5,
    time: "4 weeks ago",
    title: "Good product",
    message:
      "I received my product so soon and packing is also good. Shampoo is so good. I really loved it.",
  },
];
  const goToSlide = (idx) => setCurrent(idx);

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center p-4 border-b border-[var(--border]">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50">
            <MapPinHouse size={20} className="text-[var(--icon)]" />
          </button>
          <div>
            <p className="text-[var(--secondary)] text-xs">Location</p>
            <p className="font-medium tex-xs">Kochi, Kerala, India</p>
          </div>
        </div>
        <button className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50">
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
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center mb-2">
              <img
                src={category.icon}
                alt={category.name}
                className="w-full h-full  object-cover"
              />
            </div>
            <p className="text-xs text-center text-[var(--primary)]">
              {category.name}
            </p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">
          Super Saving Deals
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

      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">
          Shop By Brands
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="rounded-2xl h-45 overflow-hidden shadow bg-white flex flex-col items-center"
            >
              <img
                src={brand.image}
                alt={brand.name}
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
              "https://assets.timelinedaily.com/2024/07/whatsapp-image-2024-07-11-at-5-07-17-pm-1200x900.jpeg"
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
        >  {reviews.map((review, index) => (
            <div key={index} className="min-w-[300px]">
              <ReviewCard data={review} />
            </div>
          ))}
       
        
        </div>
      </div>
    </div>
  );
};

export default Home;

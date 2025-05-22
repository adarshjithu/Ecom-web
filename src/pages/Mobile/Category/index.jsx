import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, Search } from "lucide-react";
import { useState } from "react";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState("Hair Care");
  
  const categories = [
    "All",
    "Hair Care", 
    "Skin Care",
    "Makeup",
    "Fragrance",
    "Body Care",
    "Tools"
  ];

  const hairCareItems = [
    {
      id: 1,
      title: "Shampoo",
      image: "/api/placeholder/120/120",
      color: "bg-purple-100"
    },
    {
      id: 2,
      title: "Conditioner",
      image: "/api/placeholder/120/120",
      color: "bg-orange-100"
    },
    {
      id: 3,
      title: "Natural Products",
      image: "/api/placeholder/120/120",
      color: "bg-green-100"
    },
    {
      id: 4,
      title: "Oil & Serums",
      image: "/api/placeholder/120/120",
      color: "bg-pink-100"
    },
    {
      id: 5,
      title: "Hair Color",
      image: "/api/placeholder/120/120",
      color: "bg-yellow-100"
    },
    {
      id: 6,
      title: "Hair Styling",
      image: "/api/placeholder/120/120",
      color: "bg-amber-100"
    },
    {
      id: 7,
      title: "Hair Treatment",
      image: "/api/placeholder/120/120",
      color: "bg-blue-100"
    },
    {
      id: 8,
      title: "Hair Tools",
      image: "/api/placeholder/120/120",
      color: "bg-gray-100"
    },
    {
      id: 9,
      title: "Hair Accessories",
      image: "/api/placeholder/120/120",
      color: "bg-indigo-100"
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[var(--border]">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50">
            <ArrowLeft size={20} className="text-[var(--icon)]" />
          </button>
          <div>
           <h1 className="text-lg font-semibold text-[var(--primary)]">All Categories</h1>
        
          </div>
        </div>
        <button className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50">
          <Bell size={20} className="text-[var(--icon)]" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Swipable Categories */}
      <div className="px-4 mb-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-[var(--tertiary)] text-white'
                  : 'border border-[var(--border] text-[var(--secondary)] hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Hair Care Section */}
      <div className="px-4">
        <h2 className="text-base font-medium text-[var(--primary)] mb-4">Hair Care</h2>
        
        {/* Grid of Hair Care Items */}
        <div className="grid grid-cols-3 gap-5">
          {hairCareItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className={`w-full h-24 rounded-2xl ${item.color} flex items-center justify-center mb-2  hover:shadow-md transition-shadow cursor-pointer`}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-12 object-cover rounded-lg"
                />
              </div>
              <span className="text-xs text-[var(--primary)] text-center font-normal leading-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Category;
import { getCategories } from "@/api/categoriesApi";
import ProductCard from "@/components/mobile/product/ProductCard";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState({
    name: "All",
    id: "All",
  });
  const navigate = useNavigate();
  // const categories = [
  //   "All",
  //   "Hair Care",
  //   "Skin Care",
  //   "Makeup",
  //   "Fragrance",
  //   "Body Care",
  //   "Tools",
  // ];

  const hairCareItems = [
    {
      id: 1,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 2,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 3,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 4,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 5,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 6,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 7,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 8,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
    {
      id: 9,
      title: "Shampoo",
      image:
        "https://www.greenerlyfe.com/wp-content/uploads/2023/10/shaving-soap-and-oil-1067x800.jpg",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filter, setFilter] = useState({});

  const fetchData = async () => {
    setLoading(true);
    setFilter({
      type: "sub",
    });
    if (activeCategory.name !== "All") {
      setFilter({
        ...filter,
        parentCategoryId: activeCategory.id,
      });
    }
    const response = await getCategories(filter);
    setSubCategories(response.data);
    setLoading(false);
  };

  const fetchCategory = async () => {
    setLoading(true);
    const response = await getCategories({ type: "sub" });
    setCategories(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeCategory]);

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
              All Categories
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

      <div className="px-4 py-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="px-4 mb-6">
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveCategory({ id: category.parentCategory._id, name: category.name })}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                activeCategory.name === category.name
                  ? "bg-[var(--tertiary)] text-white"
                  : "border border-[var(--border] text-[var(--secondary)] hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <h2 className="text-base font-medium text-[var(--primary)] mb-4">
          {activeCategory.name}
        </h2>

        <div className="grid grid-cols-3 gap-5">
          {subCategories.map((item) => (
            <div key={item._id} className="flex flex-col items-center">
              <div
                className={` h-24 rounded-2xl flex items-center justify-center mb-2  hover:shadow-md transition-shadow cursor-pointer`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xs text-[var(--primary)] text-center font-normal leading-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 pb-6 mt-4">
        <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">
          Serum Top Deals
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
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Category;

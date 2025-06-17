import { categories, brands, reviews } from "@/assets/json/Data";
import HomeCarousel from "@/components/desktop/home/HomeCarousal";
import ProductCard from "@/components/mobile/product/ProductCard";
import ReviewCard from "@/components/mobile/ReviewCard";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <HomeCarousel />
      <div className="px-12 pt-6">
        <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide pb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center min-w-[167px]"
            >
              <div className="w-[167px] h-25 rounded-[16px] overflow-hidden border border-gray-200 flex items-center justify-center mb-1">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-center text-[var(--primary)]">
                {category.name}
              </p>
            </div>
          ))}
        </div>
        <div className=" pb-6 ">
          <h2 className="text-2xl font-medium mb-4 text-[var(--primary)]">
            Super Saving Deals
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 pb-6">
            {[...Array(5)].map((_, index) => (
              <ProductCard
                key={index}
                desktop
                // onClick={() => navigate("/product")}
              />
            ))}
          </div>
        </div>
        <div className=" pb-6 ">
          <h2 className="text-2xl font-medium mb-4 text-[var(--primary)]">
            Shop By Brands
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="rounded-2xl  h-140 overflow-hidden shadow bg-white flex flex-col items-center"
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
        <div className="rounded-2xl overflow-hidden h-160 mb-1 pb-6">
          <img
            src={
              "https://images.unsplash.com/photo-1647221598520-ce1d0da89985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTM5MjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM4Mjg4Njl8&ixlib=rb-4.0.3&q=80&w=1080"
            }
            alt={`Banner `}
            className="w-full h-full object-cover transition-all duration-300 rounded-2xl"
          />
        </div>
        <div className=" pb-6 ">
          <h2 className="text-2xl font-medium mb-4 text-[var(--primary)]">
            Up to 70% off on Shampoos
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6  pb-6">
            <ProductCard desktop onClick={() => {}} />

            <ProductCard desktop />
            <ProductCard desktop />
            <ProductCard desktop />
            <ProductCard desktop />
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden h-160 pb-6">
          <img
            src={
              "https://theguideliverpool.com/wp-content/uploads/2022/11/markus-spiske-5UJbKYUjFCk-unsplash-scaled-e1668159804164.jpg"
            }
            alt={`Banner`}
            className="w-full h-full object-cover transition-all duration-300 rounded-2xl"
          />
        </div>
        <div className="px-4 pb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">
            Reviews & Ratings
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6  pb-">
            {" "}
            {reviews.map((review, index) => (
              <div key={index}>
                <ReviewCard data={review} />
              </div>
            ))}
          </div>
        </div>
        {/* <ProductDetail /> */}
      </div>
    </>
  );
}

export default HomePage;

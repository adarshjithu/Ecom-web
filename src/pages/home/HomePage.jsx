import { getHomeDetails } from "@/api/HomeApi/homeApi";
import { reviews } from "@/assets/json/Data";
import HomeCarousel from "@/components/desktop/home/HomeCarousal";
import ProductCard from "@/components/mobile/product/ProductCard";
import ReviewCard from "@/components/mobile/ReviewCard";
import HomePageSkeleton from "@/components/skeletons/HomePageSkeleton";
import AutoCarousel from "@/components/ui/AutoCarousel";
import { fetchHomeDataRequest } from "@/store/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const { homeDetails, loading, error } = useSelector((state) => state.Home);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomeDataRequest());
  }, []);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <HomeCarousel slides={homeDetails?.carousels} />
      <div className="px-3 sm:px-4 md:px-5 lg:px-12 pt-6">
        {/* Mobile Categories Grid */}
        <div className="block sm:hidden  pb-6">
          <div className="grid grid-cols-4 gap-y-4">
            {/* All Categories */}
            <div
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate("/category")}
            >
              <div className="w-20 h-20 rounded-full bg-[#f6f8ff] flex items-center justify-center mb-1 p-3">
                {/* Replace with your All Categories icon */}
                <svg width="36" height="36" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /></svg>
              </div>
              <p className="text-xs font-medium text-center text-black">All Categories</p>
            </div>
            {/* Other categories */}
            {homeDetails?.categories?.slice(0, 7).map((category, idx) => (
              <div
                key={category?._id || idx}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => navigate(`/category?categoryId=${category?._id}`)}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center mb-1 p-1">
                  <img
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-center text-black">
                  {category?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Tablet/Desktop Horizontal Scroll */}
        <div className="hidden sm:flex space-x-2 overflow-x-auto py-2 scrollbar-hide pb-6">
          {homeDetails?.categories?.map((category) => (
            <div
              key={category?._id}
              className="flex flex-col items-center min-w-[167px] cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate(`/category?categoryId=${category?._id}`)}
            >
              <div className="w-[167px] h-25 rounded-[16px] overflow-hidden border border-gray-200 flex items-center justify-center mb-1">
                <img
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium text-center text-[var(--primary)]">
                {category?.name}
              </p>
            </div>
          ))}
        </div>
        <div className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-[var(--primary)]">
              Super Saving Deals
            </h2>
            <button
              className="text-xs sm:text-sm text-[var(--primary)] font-medium hover:underline"
              onClick={() => { navigate('/products') }}
            >
              View All
            </button>
          </div>
          {/* Auto Carousel for Products */}
          <AutoCarousel
            items={homeDetails?.featuredProducts || []}
            renderItem={(product, index) => (
              <div className="h-full px-0.5">
                <ProductCard
                  key={index}
                  product={product}
                  desktop
                />
              </div>
            )}
            slidesPerView={{
              mobile: 2,
              tablet: 3,
              desktop: 4,
              xxl: 5
            }}
            spaceBetween={8}
            autoplayDelay={4000}
            className="pb-2"
          />
        </div>
        <div className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-[var(--primary)]">
              Shop By Brands
            </h2>
            <button
              className="text-xs sm:text-sm text-[var(--primary)] font-medium hover:underline"
              onClick={() =>navigate('/brands')}
            >
              View All
            </button>
          </div>
          {/* Auto Carousel for Brands */}
          <AutoCarousel
            items={homeDetails?.brands || []}
            renderItem={(brand, index) => (
              <div className="h-full px-1">
                <div className="rounded-2xl aspect-[3/4] overflow-hidden shadow bg-white flex flex-col items-center h-full hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={brand?.logo}
                    alt={brand?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            slidesPerView={{
              mobile: 2,
              tablet: 3,
              desktop: 4,
              xxl: 5
            }}
            spaceBetween={12}
            autoplayDelay={3500}
            className="pb-2"
          />
        </div>
        <div className="rounded-2xl overflow-hidden mb-1 pb-2">
          <img
            src="https://images.unsplash.com/photo-1647221598520-ce1d0da89985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTM5MjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM4Mjg4Njl8&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Banner"
            className="
            w-full 
            h-40 sm:h-60 md:h-96 lg:h-[40rem] 
            object-cover 
            transition-all duration-300 
            rounded-2xl
          "
          />
        </div>

        <div className=" pb-3 ">
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium mb-3 text-[var(--primary)]">
            Up to 70% off on Shampoos
          </h2>
          {/* <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6  pb-6">
            <ProductCard desktop onClick={() => {}} />

            <ProductCard desktop />
            <ProductCard desktop />
            <ProductCard desktop />
            <ProductCard desktop />
          </div> */}
        </div>
        <div className="rounded-2xl overflow-hidden pb-3 ">
          <img
            src={
              "https://theguideliverpool.com/wp-content/uploads/2022/11/markus-spiske-5UJbKYUjFCk-unsplash-scaled-e1668159804164.jpg"
            }
            alt={`Banner`}
            className="
            w-full 
            h-40 sm:h-60 md:h-96 lg:h-[40rem] 
            object-cover 
            transition-all duration-300 
            rounded-2xl
          "
          />
        </div>
        <div className="px-4 pb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">
            Reviews & Ratings
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-6  pb-">
            {" "}
            {homeDetails?.reviews.map((review, index) => (
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

import axiosInstance from "@/api/axiosintercepter";
import { addToWishlistRequest, removeFromWishlistRequest } from "@/store/actions";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ desktop, product, onClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  const productData = product
  const user = useSelector(state => state.Auth)

  const isWishlisted = useSelector(
    state => state.Wishlist.wishlist.some(item => item._id === product._id)
  );

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!user.isAuthenticated) {
      navigate('/login')
      return;
    }
      if (location.pathname !== '/wishlist'  && !isWishlisted) {
        dispatch(addToWishlistRequest(product?._id))
      } else {
        dispatch(removeFromWishlistRequest(product?._id))
      }
  }


  return (
    <div
      className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[#EBEFFF] to-[#E4E4E7] overflow-hidden box-border cursor-pointer h-72 sm:h-80 md:h-96 lg:h-[420px] flex flex-col"
      onClick={onClick || (() => navigate(`/product/${productData?._id}`))}
    >
      {/* Wishlist Icon - absolute top right */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 z-10 p-1 hover:bg-gray-50 rounded-full transition-colors"
      >
        <Heart
          className={`${(user.isAuthenticated && ( isWishlisted || location.pathname === '/wishlist'))
              ? "text-[#C60000] fill-[#C60000]"
              : "text-[var(--icon)]"
            } transition-colors ${desktop ? "w-6 h-6" : "w-5 h-5"}`}
          strokeWidth={"1.5px"}
        />
      </button>
      <div className="bg-[linear-gradient(360deg,#FFFFFF_33.97%,#EAEEFF_100%)] rounded-[calc(1rem-1px)] p-2 flex flex-col h-full">
        {/* Image section */}
        <div className="flex items-center justify-center h-32 sm:h-40 md:h-52 lg:h-64 w-full mb-2">
          <div className="bg-white rounded-xl shadow-sm p-2 w-full h-full flex items-center justify-center">
            <img
              src={productData?.thumbnail || productData?.image}
              alt="Product"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Details section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Product name and description in separate lines */}
            <div className="mb-1 mt-1 text-left">
              <h3
                className={`text-[#29324E] font-medium text-left ${desktop ? "text-sm sm:text-base" : "text-xs"
                  } leading-tight truncate overflow-hidden mb-1`}
              >
                {productData?.name}
              </h3>
              <p
                className={`text-[var(--primary)] truncate overflow-hidden text-left ${desktop ? "text-xs sm:text-sm" : "text-xs"
                  }`}
              >
                {productData?.shortDescription || productData?.description || "Get by tomorrow"}
              </p>
            </div>
            {/* Rating section - more compact on mobile */}
            <div
              className="rounded-full p-[.5px] w-fit mb-2"
              style={{
                background: "linear-gradient(90deg, #EDE8CA 0%, #FFFFFF 100%)",
              }}
            >
              <div
                className="flex items-center space-x-1 rounded-full px-1.5 py-0.5"
                style={{
                  background: "linear-gradient(90deg, #FFFADD 0%, #FFFFFF 100%)",
                }}
              >
                <Star
                  className={`text-[#E09A01] fill-[#E09A01] ${desktop ? "w-4 h-4" : "w-2.5 h-2.5"
                    }`}
                />
                <span
                  className={`font-medium text-[#E09A01] ${desktop ? "text-sm" : "text-xs"
                    }`}
                >
                  {console.log(productData?.averageRating,"averageRating")}
                  {productData?.averageRating || 5}
                </span>
                <span
                  className={`text-[#845C04] ${desktop ? "text-sm" : "text-xs"
                    }`}
                >
                  ({productData?.ratingCount || 0})
                </span>
              </div>
            </div>
          </div>
          {/* Price and action section - improved mobile layout */}
          <div className="p-[1px] rounded-[8px] bg-[linear-gradient(90deg,#E4E4E4_0%,#EAEFFF_77.43%)]">
            <div className="flex items-center justify-between bg-[linear-gradient(90deg,#FFFFFF_59.29%,#E8EDFF_100%)] rounded-[8px] px-2 py-1 gap-2">
              <div className="flex items-center min-w-0 flex-1">
                <span
                  className={`font-semibold text-[var(--primary)] ${desktop ? 'text-sm sm:text-base md:text-lg' : 'text-xs'
                    }`}
                >
                  {productData?.basePrice?.sellingPrice || productData?.basePrice}
                </span>
                <span className="text-gray-400 text-xs mx-1">|</span>
                {productData?.offer && (
                  <span
                    className={`text-[#22784F] bg-[#E5FFF3] rounded-full px-1 py-0.5 ml-1 sm:ml-0 flex-shrink-0 ${desktop ? 'text-xs sm:text-sm' : 'text-xs truncate max-w-[35px]'
                      }`}
                  >
                    {productData?.offer}% off
                  </span>
                )}
              </div>
              {/* <div
                className={`flex items-center justify-center bg-[#0E1B87] ${
                  desktop ? "w-10 h-10 rounded-[8px]" : "w-0.5 h-0.5 rounded-[1px]"
                }`}
              >
                <ShoppingBag
                  className={`text-white ${
                    desktop ? "w-7 h-7" : "w-0 h-0"
                  }`}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
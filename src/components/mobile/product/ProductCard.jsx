import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ desktop }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-b from-[#EBEFFF] to-[#E4E4E7] max-w-xs w-full mx-auto overflow-hidden box-border">
      <div className="bg-[linear-gradient(360deg,#FFFFFF_33.97%,#EAEEFF_100%)] rounded-[calc(1rem-1px)] p-2">
        <div className="p-[1px] rounded-[8px] bg-[linear-gradient(180deg,#EBEFFF_0%,#E4E4E7_100%)]">
          <div className="bg-white rounded-[7px] ">
            <div className="flex justify-end ">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 pb-0 hover:bg-gray-50 rounded-full transition-colors"
              >
                <Heart
                  className={`${
                    isWishlisted
                      ? "text-[#C60000] fill-[#C60000]"
                      : "text-[var(--icon)]"
                  } transition-colors ${desktop ? "w-6 h-6" : "w-5 h-5"}`}
                  strokeWidth={"1.5px"}
                />
              </button>
            </div>
            <div className="flex justify-center pb-4">
              <img
                src="https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false"
                alt="Product"
                className={`${
                  desktop ? "w-27 h-70" : "w-9 h-24"
                }  object-contain`}
              />
            </div>
          </div>
        </div>

        <h3
          className={`w-full text-[#29324E] ${
            desktop ? "text-base" : "text-xs"
          } mb-1 mt-1 leading-tight line-clamp-2`}
        >
          Cofsils Experdine Gargle Mouth Wash for Sore throat, Flu, Cold, To...
        </h3>

        <p
          className={`text-[var(--primary)] ${
            desktop ? "text-base" : "text-xs"
          } mb-1`}
        >
          Get by <span className="text-[var(--tertiary)]">tomorrow</span>
        </p>

        <div
          className="rounded-full p-[.5px] w-fit mb-2"
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
            <Star
              className={`text-[#E09A01] fill-[#E09A01] ${
                desktop ? "w-4 h-4" : "w-3 h-3"
              }`}
            />
            <span
              className={`font-medium text-[#E09A01] ${
                desktop ? "text-sm" : "text-xs"
              }`}
            >
              4.5
            </span>
            <span
              className={`text-[#845C04]  ${desktop ? "text-sm" : "text-xs"}`}
            >
              (12K)
            </span>
          </div>
        </div>

        <div className="p-[1px] rounded-[8px] bg-[linear-gradient(90deg,#E4E4E4_0%,#EAEFFF_77.43%)]">
          <div className="flex items-center justify-between bg-[linear-gradient(90deg,#FFFFFF_59.29%,#E8EDFF_100%)] rounded-[8px] px-1 py-1">
            <div className="flex items-center space-x-1">
              <span
                className={`${
                  desktop ? "text-xl" : "text-sm"
                } text-[var(--primary)]`}
              >
                ₹1200
              </span>
              <span className="text-gray-400">|</span>
              <span
                className={`text-[#22784F]  bg-[#E5FFF3] rounded-full ${
                  desktop ? "text-base" : "text-xs"
                } px-2 py-[2px]`}
              >
                20% Off
              </span>
            </div>
            <div
              className={`flex items-center justify-center   bg-[#0E1B87] ${
                desktop ? "w-13 h-13 rounded-[8px]" : "w-8 h-8 rounded-[6px]"
              }`}
            >
              <ShoppingBag
                className={`text-white ${
                  desktop ? "w-10 h-10" : "w-[18px] h-[18px]"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

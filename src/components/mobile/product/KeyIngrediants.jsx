import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const KeyIngrediants = () => {
  const [showMore, setShowMore] = useState(false);

  const productItems = [
    {
      image:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/4cc5c37b-dd9f-44ff-93e6-06d650605fc8.__CR0,0,400,400_PT0_SX220_V1___.jpg",
      title: "Anti-Frizz Shampoo",
    },
    {
      image:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/232712bd-871f-4d80-a830-79890190e9d8.__CR0,0,400,400_PT0_SX220_V1___.jpg",
      title: "Anti-Frizz Conditioner",
    },
    {
      image:
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/4cc5c37b-dd9f-44ff-93e6-06d650605fc8.__CR0,0,400,400_PT0_SX220_V1___.jpg",
      title: "Anti-Frizz Serum",
    },
  ];

  return (
    <div className="bg-white  space-y-4">
      <h2 className="text-base font-semibold text-[var(--primary)]">
        Product Description
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {productItems.map((item, index) => (
          <div>
            {" "}
            <div
              key={index}
              className="rounded-2xl h-45 overflow-hidden shadow bg-white flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs p-2 font-medium text-[var(--primary)] mt-2">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="flex items-center text-[#FB6900] text-sm font-medium"
        >
          <Plus size={16} className="ml-1" />
          <span>Show more</span>
        </button>
      )}

      {showMore && (
        <div className="space-y-6 mt-6">
          <div className="rounded-2xl  overflow-hidden h-120 ">
            <img
              src="https://www.matrixprofessional.in/-/media/project/loreal/brand-sites/matrix/apac/in/product-information/product-images/haircare/category-banner/opticare-category-banner-750x750.jpg?rev=6528de2e5a1d4c2aa7fc71fbf9328bfb"
              alt="Matrix Opti Care Shampoo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 mt-6">
            <div className="bg-orange-50 rounded-2xl  overflow-hidden h-95 ">
              <img
                src="https://m.media-amazon.com/images/I/71uvPSMe2jL._AC_UF1000,1000_QL80_.jpg"
                alt="Matrix Opti Care Shampoo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
      {showMore && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center text-[#FB6900] text-sm font-medium"
        >
          <Minus size={16} />
          <span> Show less</span>
        </button>
      )}
    </div>
  );
};

export default KeyIngrediants;

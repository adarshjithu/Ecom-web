import { useState } from "react";
import { Star, Flame, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductHighlight from "../mobile/product/ProductHighlight";

const ProductDetail = () => {
  const [selectedVariant, setSelectedVariant] = useState("100gm");
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Matrix Opti.Care Professional Shampoo for Frizzy Hair with Shea Butter, Upto 4 Days Frizz Control",
    rating: 4.5,
    reviews: "12K",
    deliveryText: "1 bottle of 200ml ",
    price: 1200,
    originalPrice: 1500,
    discount: "20% Off",
    isTopSeller: true,
    variants: [
      { name: "60gm of Spray", price: 105.0 },
      { name: "100gm of Spray", price: 1200, selected: true },
    ],
    images: [
      "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
      "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
      "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
      "https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false",
    ],
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant.name);
  };
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Super Saving Deals", href: "/super-saving-deals" },
    {
      name: "Cofsils Experdine Gargle",
      href: "/super-saving-deals/cofsils-experdine-gargle",
    },
  ];
  return (
    <div className="px-37 pt-6">
      {" "}
      <nav
        className="flex items-center space-x-2 text-sm text-gray-600 py-8"
        aria-label="Breadcrumb"
      >
        {breadcrumbItems.map((item, idx) => (
          <span key={item.name} className="flex items-center">
            <a
              href={item.href}
              className={`hover:underline ${
                idx === breadcrumbItems.length - 1
                  ? "font-semibold text-[#845C04] bg-[#FFF9E7] px-2 py-1 rounded-[6px] text-sm"
                  : ""
              }`}
            >
              {item.name}
            </a>
            {idx < breadcrumbItems.length - 1 && (
              <ChevronRight size={16} className="mx-1 text-gray-400" />
            )}
          </span>
        ))}
      </nav>
      <div className=" mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-square border border-[var(--border] rounded-[16px] overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>{" "}
            <div className="flex space-x-3 pt-4">
              {product.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-23 h-28 border border-[var(--border)] rounded-[8px] overflow-hidden transition-all duration-200 flex items-center justify-center ${
                    selectedImage === index
                      ? "border-[var(--tertiary)]"
                      : "border-[var(--border)] hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-6 h-17 object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {product.isTopSeller && (
              <div className="flex items-center space-x-2 bg-[#F3F6FF] rounded-full px-2 py-1 w-fit">
                <Flame
                  size={20}
                  className="text-[var(--tertiary)] fill-[var(--tertiary)]"
                />
                <span className="text-[var(--tertiary)]  text-base">
                  Top Seller!
                </span>
              </div>
            )}

            <h1 className="text-2xl  text-[var(--primary)] leading-tight">
              {product.name}
            </h1>

            <div
              className="rounded-full p-[1px] w-fit"
              style={{
                background: "linear-gradient(90deg, #EDE8CA 0%, #FFFFFF 100%)",
              }}
            >
              <div
                className="flex items-center space-x-2 rounded-full px-2 py-1 text-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #FFFADD 0%, #FFFFFF 100%)",
                }}
              >
                <Star size={20} className="text-[#E09A01] fill-[#E09A01]" />
                <span className="font-medium text-[#E09A01]">
                  {product.rating}
                </span>
                <span className="text-[#845C04]">({product.reviews})</span>
              </div>
            </div>

            <div className="text-lg text-[var(--secondary)]">
              {product.deliveryText} / Get by{" "}
              <span className=" text-[var(--primary)]">tomorrow</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-4xl font-medium text-[var(--primary)]">
                ₹{product.price}
              </span>
              <span className="text-lg text-[var(--secondary)] line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-[#22784F] font-medium bg-[#E5FFF3] rounded-full px-2 text-base">
                {product.discount}
              </span>
            </div>
            <Button className="px-6 py-2">Add to Cart</Button>

            <div className="border-t border-[var(--border)] pt-4 mt-2 space-y-3">
              <div className="grid grid-cols-3 gap-3 ">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantSelect(variant)}
                    className={`p-6 border rounded-lg text-center transition-all duration-200 ${
                      selectedVariant === variant.name
                        ? "border-[var(--tertiary)] bg-[#EFF3FF]"
                        : "border-[var(--border)] hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg text-[var(--secondary)] mb-1">
                      {variant.name}
                    </div>
                    <div className="font-medium text-[var(--primary)] text-3xl">
                      ₹{variant.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Tabs defaultValue="highlights" className="space-y-4 pt-4">
          <TabsList className="grid w-full grid-cols-3 h-12 ">
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="packaging">Packaging</TabsTrigger>
            <TabsTrigger value="details">Product Details</TabsTrigger>
          </TabsList>
          <TabsContent value="highlights" className="space-y-3">
            <ProductHighlight desktop />
          </TabsContent>
          <TabsContent value="packaging" className="space-y-3"></TabsContent>
          <TabsContent value="details" className="space-y-3"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;

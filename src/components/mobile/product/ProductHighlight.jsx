import ReviewCard from "../ReviewCard";
import ProductCard from "./ProductCard";
import ProductDescription from "./ProductDescription";

const ProductHighlight = ({ desktop }) => {
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
  return (
    <>
      <ProductDescription desktop={desktop} />
      {desktop ? (
        <>
          <div className="px-4 pb-6">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">
              Reviews & Ratings
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-3 gap-6  pb-">
              {" "}
              {reviews.map((review, index) => (
                <div key={index}>
                  <ReviewCard data={review} />
                </div>
              ))}
            </div>
          </div>{" "}
          <div className=" pb-6 ">
            <h2 className="text-2xl font-medium mb-4 text-[var(--primary)]">
              Explore Our Recommendations
            </h2>
            {/* <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6  pb-6">
              <ProductCard desktop />
              <ProductCard desktop />
              <ProductCard desktop />
              <ProductCard desktop />
              <ProductCard desktop />
            </div> */}
          </div>
        </>
      ) : (
        <>
          <div className="px-0 pb-6">
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
          </div>{" "}
          <div className="px-0 pb-6">
            <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">
              Similar Products
            </h2>
            <div
              className="flex space-x-2 overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "auto",
                msOverflowStyle: "auto",
              }}
            >
              {/* <div className="min-w-[170px]">
                <ProductCard />
              </div>
              <div className="min-w-[170px]">
                <ProductCard />
              </div>
              <div className="min-w-[180px]">
                <ProductCard />
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductHighlight;

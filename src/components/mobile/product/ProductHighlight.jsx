import ReviewCard from "../ReviewCard";
import ProductCard from "./ProductCard";
import ProductDescription from "./ProductDescription";

const ProductHighlight = ({ desktop, reviews, hasMore,handleLoadMore,setLoading,loading }) => {

  return (
    <>
      <ProductDescription desktop={desktop} />
      {desktop ? (
        <>
          {reviews?.length >0 && <div className="px-4 pb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-[var(--primary)]">
              Reviews & Ratings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-6">
              {reviews.map((review, index) => (
                <div key={index}>
                  <ReviewCard data={review} />
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center items-center">
                <button onClick={handleLoadMore} className="text-blue-600 cursor-pointer" disabled={loading}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
              )}
          </div>}
          {/* <div className="pb-6">
            <h2 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-[var(--primary)]">
              Explore Our Recommendations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 pb-6">
              <ProductCard desktop />
              <ProductCard desktop />
              <ProductCard desktop />
              <ProductCard desktop />
              <ProductCard desktop />
            </div>
          </div> */}
        </>
      ) : (
        <>
          <div className="px-0 pb-4 md:pb-6">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-[var(--primary)]">
              Reviews & Ratings
            </h2>
            <div
              className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "auto",
                msOverflowStyle: "auto",
              }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="min-w-[280px] md:min-w-[320px]">
                  <ReviewCard data={review} />
                </div>
              ))}
            </div>
          </div>
          <div className="px-0 pb-4 md:pb-6">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-[var(--primary)]">
              Similar Products
            </h2>
            <div
              className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide"
              style={{
                scrollbarWidth: "auto",
                msOverflowStyle: "auto",
              }}
            >
              {/* <div className="min-w-[150px] md:min-w-[170px]">
                <ProductCard />
              </div>
              <div className="min-w-[150px] md:min-w-[170px]">
                <ProductCard />
              </div>
              <div className="min-w-[150px] md:min-w-[180px]">
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

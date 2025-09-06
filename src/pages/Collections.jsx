import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/axiosintercepter";
import ProductCard from "@/components/mobile/product/ProductCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import WishlistSkeleton from "@/components/skeletons/WishlistSkeleton";


const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const observer = useRef();

  // Ref for the last product element
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/user/products/collections/${id}?page=${page}&limit=10`
        );
        setProducts((prev) => [...prev, ...res.data.data]);
        setHasMore(res.data.data?.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, page]);

const WaveSkeleton = ({ className = "" }) => (
  <div className={`animate-shimmer ${className}`} />
);
  const ProductCardSkeleton = () => (
  <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-[#EBEFFF] to-[#E4E4E7] overflow-hidden box-border h-64 sm:h-80 md:h-96 lg:h-[420px] flex flex-col">
    {/* Wishlist Icon skeleton - absolute top right */}
    <div className="absolute top-2 right-2 z-10 p-2 pb-0">
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full">
        <WaveSkeleton className="h-full w-full rounded-full" />
      </div>
    </div>
    
    <div className="bg-[linear-gradient(360deg,#FFFFFF_33.97%,#EAEEFF_100%)] rounded-[calc(1rem-1px)] p-2 flex flex-col h-full">
      {/* Image section skeleton */}
      <div className="flex items-center justify-center h-32 sm:h-40 md:h-52 lg:h-64 w-full">
        <div className="bg-white rounded-xl shadow p-2 w-full h-full flex items-center justify-center">
          <div className="w-full h-full bg-gray-200 rounded-lg">
            <WaveSkeleton className="h-full w-full rounded-lg" />
          </div>
        </div>
      </div>
      
      {/* Details section skeleton */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Product name skeleton */}
          <div className="w-full h-3 sm:h-4 bg-gray-200 rounded mb-1 mt-1">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          
          {/* Description skeleton */}
          <div className="w-3/4 h-3 sm:h-4 bg-gray-200 rounded mb-1">
            <WaveSkeleton className="h-full w-full rounded" />
          </div>
          
          {/* Rating skeleton */}
          <div className="rounded-full p-[.5px] w-fit mb-2 bg-gradient-to-r from-[#EDE8CA] to-[#FFFFFF]">
            <div className="flex items-center space-x-2 rounded-full px-2 py-1 bg-gradient-to-r from-[#FFFADD] to-[#FFFFFF]">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-8 h-3 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-12 h-3 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Price and button section skeleton */}
        <div className="p-[1px] rounded-[8px] bg-gradient-to-r from-[#E4E4E4] to-[#EAEFFF]">
          <div className="flex items-center justify-between flex-wrap bg-gradient-to-r from-[#FFFFFF] to-[#E8EDFF] rounded-[8px] px-1 py-1 gap-1">
            <div className="flex items-center space-x-1 min-w-0 flex-1">
              <div className="w-12 h-3 sm:h-4 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-2 h-3 bg-gray-200 rounded">
                <WaveSkeleton className="h-full w-full rounded" />
              </div>
              <div className="w-16 h-3 sm:h-4 bg-gray-200 rounded-full">
                <WaveSkeleton className="h-full w-full rounded-full" />
              </div>
            </div>
            <div className="w-7 h-7 sm:w-10 sm:h-10 bg-gray-200 rounded-[6px] sm:rounded-[8px]">
              <WaveSkeleton className="h-full w-full rounded-[6px] sm:rounded-[8px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

  return (
    <div className="pb-6 container mx-auto">
      <div className="px-3 md:px-0 py-4 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-2xl font-bold mt-3 mb-4 pl-5 md:px-0">{id}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product, index) => {
          return (
            <div ref={lastProductRef}><ProductCard desktop={true} product={product} /></div>
          );
        }
        )}
      </div>

      {loading && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {[...Array(10)].map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>}
      {!hasMore && <p className="text-center mt-4">No more products</p>}
    </div>
  );
};

export default CollectionPage;

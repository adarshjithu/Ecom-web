// src/pages/BrandsPage.jsx
import { useEffect, useState, useRef, useCallback } from "react";

import { motion } from "framer-motion";
import axiosInstance from "@/api/axiosintercepter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Fetch brands API
  const fetchBrands = async (nextCursor = null) => {
    try {
      if (nextCursor) setLoadingMore(true);
      else setLoading(true);

      const { data } = await axiosInstance.get("/user/brands", {
        params: { cursor: nextCursor },
      });

      setBrands((prev) => [...prev, ...data.data]);
      setCursor(data.nextCursor || null);
      setHasMore(!!data.nextCursor);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Infinite Scroll
  const lastBrandRef = useCallback(
    (node) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchBrands(cursor);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore, cursor]
  );

  // Skeleton with shimmer effect
  const BrandSkeleton = () => (
    <div className="relative rounded-xl shadow-md overflow-hidden border bg-white ">
      <div className="h-32 w-full bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      </div>

      {/* shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
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
              <BreadcrumbPage className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Brands</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="text-2xl font-bold mb-6 px-3 md:px-0">All Brands</h1>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <BrandSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Brands Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-2 md:px-0">
            {brands.map((brand, idx) => {
              const card = (
                <motion.div
                  key={brand._id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl shadow-md overflow-hidden border bg-white"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-62 w-full object-cover bg-gray-50"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-base font-medium">{brand.name}</h3>
                  </div>
                </motion.div>
              );

              if (brands.length === idx + 1) {
                return (
                  <div ref={lastBrandRef} key={brand._id}>
                    {card}
                  </div>
                );
              }
              return card;
            })}
          </div>

          {/* Loading More Skeleton */}
          {loadingMore && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <BrandSkeleton key={i} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrandsPage;

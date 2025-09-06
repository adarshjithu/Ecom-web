import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, Heart } from "lucide-react";
import ProductCard from "../components/mobile/product/ProductCard";
import WishlistSkeleton from "../components/skeletons/WishlistSkeleton";
import InfiniteScrollSkeleton from "../components/skeletons/InfiniteScrollSkeleton";
import { useIsMobile } from "../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistRequest } from "@/store/Wishlilst/actions";
import { getCategoriesRequest } from "@/store/Category/actions";

const Wishlist = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const observerRef = useRef();
  
  // Redux selectors
  const products = useSelector(state => state.Wishlist.wishlist);
  const wishlistState = useSelector(state => state.Wishlist);
  const parentCategories = useSelector(state => state.Category.parentCategories);
  const {
    loading = false,
    error = null,
    currentPage = 1,
    hasMore = true,
    loadingMore = false
  } = wishlistState;

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  // Fetch wishlist with infinite scroll
  useEffect(() => {
    const params = {
      page: 1,
      limit: 15
    };
    
    if (selectedCategory !== "All") {
      params.category = selectedCategory;
    }
    
    dispatch(fetchWishlistRequest(params));
  }, [dispatch, selectedCategory]);

  // Infinite scroll callback
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const params = {
        page: currentPage + 1,
        limit: 15
      };
      
      if (selectedCategory !== "All") {
        params.category = selectedCategory;
      }
      
      dispatch(fetchWishlistRequest(params, true)); // true for load more
    }
  }, [dispatch, loadingMore, hasMore, currentPage, selectedCategory]);

  // Intersection Observer for infinite scroll
  const lastProductRef = useCallback(node => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loadingMore, hasMore, loadMore]);

  // Build categories array with fetched categories
  const categories = [
    { id: "All", name: "All" },
    ...(parentCategories || []).map(category => ({ id: category._id, name: category.name }))
  ];

  // Use Redux loading state
  if (loading && products.length === 0) {
    return <WishlistSkeleton />;
  }

    return (
    <>
      {isMobile ? (
        // Mobile layout with breadcrumbs and categories
        <div className="min-h-screen bg-[#F8F9FB]">
          <div className="max-w-md mx-auto">
            {/* Breadcrumb */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Home</span>
                <ChevronRight className="w-4 h-4" />
                <span>Wishlist</span>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="px-4 pb-4">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="px-4 pb-6">
              {/* Page Title */}
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === "All" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name} ({products.length})
                </h1>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3">
                {products?.map((product, index) => (
                  <div key={product.id} ref={index === products.length - 1 ? lastProductRef : null}>
                    <ProductCard 
                      product={product}
                      desktop={false}
                    />
                  </div>
                ))}
              </div>

              {/* Loading More Skeleton */}
              {loadingMore && (
                <InfiniteScrollSkeleton />
              )}

              {/* No More Products Message */}
              {!hasMore && products.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No more products to load</p>
                </div>
              )}

              {/* Empty State */}
              {products?.length === 0 && !loadingMore && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-500">
                    Start adding products to your wishlist to see them here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Desktop/Tablet layout
        <div className="min-h-screen bg-[#F8F9FB]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Home</span>
                <ChevronRight className="w-4 h-4" />
                <span>Wishlist</span>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="px-4 pb-4">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="px-4 pb-6">
              {/* Page Title */}
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === "All" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name} ({products.length})
                </h1>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {products.map((product, index) => (
                  <div key={product.id} ref={index === products.length - 1 ? lastProductRef : null}>
                    <ProductCard 
                      product={product}
                      desktop={true}
                    />
                  </div>
                ))}
              </div>

              {/* Loading More Skeleton */}
              {loadingMore && (
                <InfiniteScrollSkeleton />
              )}

              {/* No More Products Message */}
              {!hasMore && products.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No more products to load</p>
                </div>
              )}

              {/* Empty State */}
              {products?.length === 0 && !loadingMore && (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-500">
                    Start adding products to your wishlist to see them here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist; 
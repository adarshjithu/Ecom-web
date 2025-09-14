import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "@/components/mobile/product/ProductCard";
import CategoriesSkeleton from "@/components/skeletons/CategoriesSkeleton";
import InfiniteScrollSkeleton from "@/components/skeletons/InfiniteScrollSkeleton";
import {
  getCategoriesRequest,
  getSubcategoriesRequest,
  getProductsByCategoryRequest,
  setSelectedCategory,
  setSelectedSubcategory,
  clearProducts,
  loadMoreProductsByCategoryRequest
} from "@/store/Category/actions";

const Categories = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');
  const dispatch = useDispatch();
  const observerRef = useRef();

  // Redux selectors
  const {
    parentCategories,
    subCategories,
    products,
    selectedCategory,
    selectedSubcategory,
    loadingCategories,
    loadingSubcategories,
    loadingProducts,
    categoriesError,
    subcategoriesError,
    productsError,
    currentPage = 1,
    hasMore = true,
    loadingMore = false
  } = useSelector((state) => state.Category);

  // Fetch all parent categories on component mount
  useEffect(() => {
    dispatch(getCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (parentCategories.length > 0 && !selectedCategory) {
      let categoryToSelect;
      
      if (categoryId) {
        // Find the category by ID from URL parameter
        categoryToSelect = parentCategories.find(cat => cat._id === categoryId);
      }
      
      // If category not found in URL or no URL parameter, use first category
      if (!categoryToSelect) {
        categoryToSelect = parentCategories[0];
      }
      
      dispatch(setSelectedCategory(categoryToSelect));
      dispatch(getSubcategoriesRequest(categoryToSelect._id));
    }
  }, [parentCategories, selectedCategory, dispatch, categoryId]);

  // Handle categoryId changes (when navigating from home page)
  useEffect(() => {
    if (parentCategories.length > 0 && categoryId && selectedCategory) {
      const categoryToSelect = parentCategories.find(cat => cat._id == selectedCategory?._id);
      if (categoryToSelect) {
        dispatch(setSelectedCategory(categoryToSelect));
        dispatch(clearProducts());
        dispatch(getSubcategoriesRequest(categoryToSelect._id));
      }
    }
  }, [categoryId, parentCategories, selectedCategory, dispatch]);

  useEffect(() => {
    if (subCategories.length > 0 && !selectedSubcategory && !loadingSubcategories) {
      const firstSubcategory = subCategories[0];
      dispatch(setSelectedSubcategory(firstSubcategory));
      dispatch(getProductsByCategoryRequest(firstSubcategory._id));
    }
  }, [subCategories, selectedSubcategory, loadingSubcategories, dispatch]);

  // Infinite scroll callback
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore && selectedSubcategory) {
      dispatch(loadMoreProductsByCategoryRequest(selectedSubcategory._id, currentPage + 1));
    }
  }, [dispatch, loadingMore, hasMore, selectedSubcategory, currentPage]);

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

  // Handle parent category selection
  const handleParentCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    dispatch(clearProducts());
    dispatch(getSubcategoriesRequest(category._id));
  };

  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory) => {
    dispatch(setSelectedSubcategory(subCategory));
    dispatch(clearProducts());
    dispatch(getProductsByCategoryRequest(subCategory._id));
  };

  if (loadingCategories) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="px-4 py-2 bg-gray-50">
          <p className="text-sm text-gray-600"><span className="cursor-pointer" onClick={() => navigate("/home")}>Home</span> &gt; <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Categories</span></p>
        </div>

        {/* Error Display */}
        {categoriesError && (
          <div className="px-4 py-2 bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">Error loading categories: {categoriesError}</p>
          </div>
        )}

        {/* Main Category Tabs */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {parentCategories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleParentCategorySelect(category)}
                className={`whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium ${
                  selectedCategory?._id === category._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Content */}
        {selectedCategory && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{selectedCategory.name}</h2>
            
            {/* Subcategory Error Display */}
            {subcategoriesError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-600">Error loading subcategories: {subcategoriesError}</p>
              </div>
            )}
            
            {/* Sub-category Scroll */}
            {subCategories.length > 0 && (
              <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-6">
                {subCategories.map((subCategory) => (
                  <button
                    key={subCategory._id}
                    onClick={() => handleSubCategorySelect(subCategory)}
                    className={`flex flex-col items-center gap-2  min-w-[80px] ${
                      selectedSubcategory?._id === subCategory._id ? "text-blue-600 " : "text-black"
                    }`}
                  >
                    <div className={`w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden ${
                      selectedSubcategory?._id === subCategory._id ? "border border-blue-600":"border-none"
                    }`}>
                      {subCategory.image ? (
                        <img
                          src={subCategory.image}
                          alt={subCategory.name}
                          className="w-32 h-20 object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-12 h-12 bg-gray-200 rounded  flex items-center justify-center text-gray-500 text-xs" style={{ display: subCategory.image ? 'none' : 'flex' }}>
                        {subCategory.name.charAt(0)}
                      </div>
                    </div>
                    <span className="text-md text-center fw-bold">{subCategory.name}</span>
                  </button>
                ))}
              </div>
            )}

             {/* No Subcategories */}
            {subCategories.length === 0 && !loadingSubcategories && !subcategoriesError && (
              <div className="text-center py-8">
                <p className="text-gray-500">No subcategories found for this category.</p>
              </div>
            )}

            {/* Loading Subcategories */}
            {loadingSubcategories && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading subcategories...</span>
              </div>
            )}

            {/* Products Section */}
            {selectedSubcategory && (
              <div>
                {/* Promotional Heading */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedSubcategory.name} Products
                  </h3>
                </div>

                {/* Products Error Display */}
                {productsError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-600">Error loading products: {productsError}</p>
                  </div>
                )}

                {/* Loading Products */}
                {loadingProducts && products.length === 0 && (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading products...</span>
                  </div>
                )}

                {/* Product Grid */}
                {!loadingProducts && products.length > 0 && (
                  <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-5 pb-5">
                    {products.map((product, index) => (
                      <div key={product._id} ref={index === products.length - 1 ? lastProductRef : null}>
                        <ProductCard
                          desktop
                          product={{
                            _id: product._id,
                            wishlist:product?.wishlist ? true :false,
                            name: product.name,
                            shortDescription: product.description,
                            thumbnail: product.image,
                            basePrice: {
                              sellingPrice: `${product.basePrice.sellingPrice}`,
                              mrp: `${product.basePrice.mrp}`
                            },
                            rating: 4.5, // Default rating since API doesn't provide it
                            reviews: "1K", // Default reviews since API doesn't provide it
                            offer: product.offer, // Use offer instead of discount
                            delivery: "Get by tomorrow" // Default delivery info
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}
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
                  </>
                )}

                {/* No Products */}
                {!loadingProducts && products.length === 0 && !productsError && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No products found in this category.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* No Categories */}
        {parentCategories.length === 0 && !loadingCategories && !categoriesError && (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-500">No categories available.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Categories;

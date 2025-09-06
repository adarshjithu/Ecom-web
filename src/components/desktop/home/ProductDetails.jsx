import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductCard from "@/components/mobile/product/ProductCard";
import ProductListSkeleton from "@/components/skeletons/ProductListSkeleton";
import InfiniteScrollSkeleton from "@/components/skeletons/InfiniteScrollSkeleton";
import {
  fetchProductsRequest,
  fetchFiltersRequest,
  setFilters,
  clearFilters,
  setSort,
  loadMoreProductsRequest,
  resetProducts
} from "@/store/Product/actions";

const SORT_OPTIONS = [
  { value: "createdAt", label: "Relevance" },
  { value: "rating", label: "Avg customer rating" },
  { value: "basePrice.sellingPrice", label: "Price low to high" },
  { value: "-basePrice.sellingPrice", label: "Price high to low" },
  { value: "offer", label: "Discount" },
];

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.Product);
  const observerRef = useRef();
  
  // Provide default values if state is not initialized yet
  const {
    products = [],
    loading = false,
    error = null,
    totalCount = 0,
    currentPage = 1,
    filters = { categories: [], brands: [] },
    filtersLoading = false,
    availableFilters = { brands: [], categories: [] },
    limit = 15,
    loadingMore = false,
    hasMore = true
  } = productState || {};

  // Local state for UI
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  // Fetch initial data
  useEffect(() => {
    try {
      dispatch(fetchFiltersRequest());
      dispatch(resetProducts());
      dispatch(fetchProductsRequest());
    } catch (error) {
      console.error('Error dispatching initial actions:', error);
    }
  }, [dispatch]);

  // Fetch products when filters/sort changes
  useEffect(() => {
    try {
      dispatch(resetProducts());
      dispatch(fetchProductsRequest());
    } catch (error) {
      console.error('Error dispatching fetch products:', error);
    }
  }, [dispatch, filters, selectedSort]);

  // Infinite scroll callback
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      dispatch(loadMoreProductsRequest());
      dispatch(fetchProductsRequest({ page: currentPage + 1 }));
    }
  }, [dispatch, loadingMore, hasMore, currentPage]);

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

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters };
    
    if (type === 'brand') {
      newFilters.brands = filters.brands.includes(value)
        ? filters.brands.filter(b => b !== value)
        : [...filters.brands, value];
    } else if (type === 'category') {
      newFilters.categories = filters.categories.includes(value)
        ? filters.categories.filter(c => c !== value)
        : [...filters.categories, value];
    }
    
    dispatch(setFilters(newFilters));
  };

  // Handle sort change
  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
    const [sortBy, sortOrder] = sortOption.value.startsWith('-') 
      ? [sortOption.value.slice(1), 'desc']
      : [sortOption.value, 'asc'];
    dispatch(setSort(sortBy, sortOrder));
  };

  // Clear all filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSelectedSort(SORT_OPTIONS[0]);
  };

  // Clear specific filter
  const handleClearFilter = (type, value) => {
    const newFilters = { ...filters };
    if (type === 'brand') {
      newFilters.brands = filters.brands.filter(b => b !== value);
    } else if (type === 'category') {
      newFilters.categories = filters.categories.filter(c => c !== value);
    }
    dispatch(setFilters(newFilters));
  };

  // Filter available options based on search
  const filteredBrands = availableFilters.brands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );
  
  const filteredCategories = availableFilters.categories.filter(category =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Check if any filters are applied
  const hasActiveFilters = filters?.brands?.length > 0 || filters?.categories?.length > 0 || selectedSort.value !== 'createdAt';

  // Safety check for undefined state
  if (!productState) {
    return <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>;
  }

  if (loading && products?.length === 0) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Mobile: Sort and Filter buttons at the top */}
      <div className="md:hidden flex gap-2 px-4 mt-3 pb-0 justify-start">
        <Button 
          className="py-1 text-xs w-auto rounded-sm" 
          variant="outline" 
          size="sm" 
          style={{minWidth:'auto'}} 
          onClick={() => { setSortOpen(true); setSidebarOpen(false); }}
        >
          Sort By
        </Button>
        <Button 
          className="py-1 text-xs w-auto rounded-sm" 
          variant="default" 
          size="sm" 
          style={{minWidth:'auto'}} 
          onClick={() => { setSidebarOpen(true); setSortOpen(false); }}
        >
          All Filters
        </Button>
      </div>

      {/* Main Content Layout */}
      <div className="flex gap-4 px-2 md:px-6 lg:px-12 transition-all duration-200">
        {/* Sidebar (Desktop/Tablet) */}
        <aside className="hidden md:block w-64 shrink-0 pt-4">
          <Card className="mb-4">
            <CardContent>
              {/* Categories */}
              <div className="mb-4">
                <div className="font-semibold mb-2">Categories</div>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search categories"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm pl-8"
                  />
                  <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                </div>
                <div className="max-h-32 overflow-y-auto pr-1">
                  {filteredCategories.map((category) => (
                    <label key={category._id} className="flex items-center gap-2 mb-1 text-sm cursor-pointer">
                      <Checkbox
                        checked={filters.categories.includes(category._id)}
                        onCheckedChange={() => handleFilterChange('category', category._id)}
                        id={`category-${category._id}`}
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-4">
                <div className="font-semibold mb-2">Brands</div>
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search brands"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm pl-8"
                  />
                  <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                </div>
                <div className="max-h-32 overflow-y-auto pr-1">
                  {filteredBrands.map((brand) => (
                    <label key={brand._id} className="flex items-center gap-2 mb-1 text-sm cursor-pointer">
                      <Checkbox
                        checked={filters.brands.includes(brand._id)}
                        onCheckedChange={() => handleFilterChange('brand', brand._id)}
                        id={`brand-${brand._id}`}
                      />
                      {brand.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <div className="font-semibold mb-2">Sort By</div>
                <div className="flex flex-col gap-1">
                  {SORT_OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="sortBy"
                        checked={selectedSort.value === option.value}
                        onChange={() => handleSortChange(option)}
                        className="accent-blue-600"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Product Grid and Content */}
        <main className="flex-1 py-4 w-full">
          <div className="px-4 py-4 pb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Page Title */}
          <div className="px-4 pb-2 text-xl font-semibold hidden md:block">
            Products ({totalCount})
          </div>

          {/* Selected Filters */}
          {hasActiveFilters && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 items-center">
              {filters.brands.map((brandId) => {
                const brand = availableFilters.brands.find(b => b._id === brandId);
                return brand && (
                  <span key={brandId} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    {brand.name}
                    <button onClick={() => handleClearFilter('brand', brandId)} className="ml-1 text-blue-700 hover:text-blue-900">×</button>
                  </span>
                );
              })}
              {filters.categories.map((categoryId) => {
                const category = availableFilters.categories.find(c => c._id === categoryId);
                return category && (
                  <span key={categoryId} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    {category.name}
                    <button onClick={() => handleClearFilter('category', categoryId)} className="ml-1 text-green-700 hover:text-green-900">×</button>
                  </span>
                );
              })}
              {selectedSort.value !== 'createdAt' && (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  {selectedSort.label}
                  <button onClick={() => handleSortChange(SORT_OPTIONS[0])} className="ml-1 text-gray-700 hover:text-gray-900">×</button>
                </span>
              )}
              <button onClick={handleClearFilters} className="ml-2 text-xs underline text-blue-600">Clear all filters</button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="px-4 py-2 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600">Error: {error}</p>
            </div>
          )}

          {/* Product Grid */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-1 md:mt-2">
            {products.map((product, index) => (
              <div key={product._id} ref={index === products?.length - 1 ? lastProductRef : null}>
                <ProductCard 
                  product={product} 
                  desktop 
                />
              </div>
            ))}
          </div>

          {/* Loading More Skeleton */}
          {loadingMore && (
            <InfiniteScrollSkeleton />
          )}

          {/* No More Products Message */}
          {!hasMore && products?.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No more products to load</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile: Filter Bottom Sheet */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-2xl p-4 pb-8 z-50 shadow-lg animate-slideUp"
            style={{ maxHeight: '90vh', minHeight: '60vh', overflowY: 'auto' }}
          >
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setSidebarOpen(false)}
            >
              ×
            </button>
            <div className="font-bold text-lg mb-4">Filter</div>
            
            {/* Categories */}
            <div className="mb-4">
              <div className="font-semibold mb-2">Categories</div>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search categories"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm pl-8"
                />
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              </div>
              <div className="max-h-32 overflow-y-auto pr-1">
                {filteredCategories.map((category) => (
                  <label key={category._id} className="flex items-center gap-2 mb-1 text-sm cursor-pointer">
                    <Checkbox
                      checked={filters.categories.includes(category._id)}
                      onCheckedChange={() => handleFilterChange('category', category._id)}
                      id={`category-m-${category._id}`}
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-4">
              <div className="font-semibold mb-2">Brands</div>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm pl-8"
                />
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
              </div>
              <div className="max-h-32 overflow-y-auto pr-1">
                {filteredBrands.map((brand) => (
                  <label key={brand._id} className="flex items-center gap-2 mb-1 text-sm cursor-pointer">
                    <Checkbox
                      checked={filters.brands.includes(brand._id)}
                      onCheckedChange={() => handleFilterChange('brand', brand._id)}
                      id={`brand-m-${brand._id}`}
                    />
                    {brand.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <div className="font-semibold mb-2">Sort By</div>
              <div className="flex flex-col gap-1">
                {SORT_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="sortByMobile"
                      checked={selectedSort.value === option.value}
                      onChange={() => handleSortChange(option)}
                      className="accent-blue-600"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between gap-2 mt-6">
              <Button variant="outline" className="flex-1" onClick={handleClearFilters}>Clear all</Button>
              <Button variant="default" className="flex-1" onClick={() => setSidebarOpen(false)}>Show results</Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile: Sort Bottom Sheet */}
      {sortOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSortOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-2xl p-4 pb-8 z-50 shadow-lg animate-slideUp"
            style={{ maxHeight: '60vh', minHeight: '30vh', overflowY: 'auto' }}
          >
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setSortOpen(false)}
            >
              ×
            </button>
            <div className="font-bold text-lg mb-4">Sort By</div>
            <div className="flex flex-col gap-3">
              {SORT_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center gap-2 text-base cursor-pointer py-2 border-b last:border-b-0">
                  <input
                    type="radio"
                    name="sortByMobile"
                    checked={selectedSort.value === option.value}
                    onChange={() => { handleSortChange(option); setSortOpen(false); }}
                    className="accent-blue-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

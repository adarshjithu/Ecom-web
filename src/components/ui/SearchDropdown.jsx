import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { searchProductsForHeader } from '@/api/productApi';
import { useNavigate } from 'react-router-dom';

const SearchDropdown = ({ placeholder = "Search medicines, cosmetics", className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  // Debounced search function
  const debouncedSearch = (query) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await searchProductsForHeader(query);
          console.log('Search API response:', response); // Debug log
          // Handle the actual API response structure
          const products = response.results || response.data?.results || [];
          setSearchResults(Array.isArray(products) ? products : []);
          setSelectedIndex(-1);
          setIsOpen(true);
        } catch (err) {
          console.error('Search error:', err);
          setError('Failed to search products');
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setIsOpen(false);
      }
    }, 300); // 300ms debounce delay
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);
    debouncedSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleProductClick(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle product click
  const handleProductClick = (product) => {
    setIsOpen(false);
    setSearchQuery('');
    // Navigate to product details page using productId from the API response
    if (product._id || product.id || product?.productId) {
      window.location.href = `/product/${product._id || product.id || product?.productId}`;
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div ref={searchRef} className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-[#F7F7F7] text-sm placeholder-[#898F92] focus:ring-1 focus:ring-gray-500 focus:border-gray-500 ${className}`}
        />
      </div>

      {/* Search Dropdown */}
      {isOpen && (searchResults.length > 0 || error) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto"
        >
          {error ? (
            <div className="p-4 text-center text-red-500 text-sm">
              {error}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No products found
            </div>
          ) : (
            <div className="py-2">
              {searchResults.map((product, index) => (
                
                <div
                  key={product.productId || product._id || product.id || index}
                  onClick={() => handleProductClick(product)}
                  className={`flex items-center px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                    selectedIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                 
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-12 h-12 mr-3">
                    <img
                      src={product.thumbnail || product.images?.[0]?.url || product.image || '/images/no-item-found-here.png'}
                      alt={product.name || product.title}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = '/images/no-item-found-here.png';
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {product.name || product.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {product.brand?.name || product.brand || 'No brand available'}
                    </p>
                    {product.price && (
                      <p className="text-sm font-semibold text-green-600">
                        ${product.price}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

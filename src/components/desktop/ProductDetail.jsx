import { useState, useEffect } from "react";
import { Star, Flame, ChevronRight, Heart, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductHighlight from "../mobile/product/ProductHighlight";
import ProductDetailSkeleton from "../skeletons/ProductDetailSkeleton";
import { getProductById, getProductBySlug } from "../../api/productApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartRequest } from "../../store/Cart/actions";
import { addToWishlistRequest, removeFromWishlistRequest } from "@/store/actions";
import axiosInstance from "@/api/axiosintercepter";
import { showError } from "@/helpers/notification_helper";

const ProductDetail = () => {
  const { productId, slug } = useParams();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [availableCombinations, setAvailableCombinations] = useState({});
  const [lastClickedButton, setLastClickedButton] = useState('increment');
  const [isLoading, setIsLoading] = useState(true);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.Auth);
  const [reviews,setReviews] =useState([]);
  const [page,setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true);
  const isWishlisted = useSelector(
    state => state.Wishlist.wishlist.some(item => item._id === productId)
  );

  // Redux selectors
  const { addingToCart } = useSelector((state) => state.Cart);
  const { isAuthenticated } = useSelector((state) => state.Auth);

  const fetchProduct = async () => {
    const response = await getProductById(productId);
    setIsLoading(false);
    setProduct(response.product);
    initializeProductData(response.product);
  };

  useEffect(() => {
    fetchProduct()
  }, []); // Remove dependencies to run only once on mount

  const initializeProductData = (productData) => {
    // Initialize selected attributes with first available values
    const initialAttributes = {};
    const combinations = {};

    // Handle products without variants
    if (!productData.variants || productData.variants.length === 0) {
      // For products without variants, use the base price and inventory
      setSelectedVariant(null);
      setSelectedAttributes({});
      setAvailableCombinations({});
      return;
    }

    productData.variantAttributes.forEach(attr => {
      if (attr.isVariantAttribute) {
        // Get all unique values for this attribute from variants
        const availableValues = [...new Set(
          productData.variants
            .filter(variant => variant.isActive && variant.isPublished)
            .map(variant => {
              const attrValue = variant.attributes.find(a => a.attribute === attr._id);
              return attrValue ? attrValue.value : null;
            })
            .filter(Boolean)
        )];

        combinations[attr.name] = availableValues;

        // Set first available value as default
        if (availableValues.length > 0) {
          initialAttributes[attr.name] = availableValues[0];
        }
      }
    });

    setSelectedAttributes(initialAttributes);
    setAvailableCombinations(combinations);

    // Find the first available variant that matches initial attributes
    const firstVariant = findMatchingVariant(productData.variants, initialAttributes);
    setSelectedVariant(firstVariant);
  };

  const findMatchingVariant = (variants, attributes) => {
    if (!variants || variants.length === 0) return null;

    return variants.find(variant => {
      if (!variant.isActive || !variant.isPublished) return false;

      return Object.entries(attributes).every(([attrName, attrValue]) => {
        const variantAttr = variant.attributes.find(a => {
          const attr = product?.variantAttributes?.find(va => va._id === a.attribute);
          return attr && attr.name === attrName;
        });
        return variantAttr && variantAttr.value === attrValue;
      });
    });
  };

  const handleAttributeChange = (attributeName, value) => {
    const newAttributes = { ...selectedAttributes, [attributeName]: value };
    setSelectedAttributes(newAttributes);

    // Find matching variant
    const matchingVariant = findMatchingVariant(product?.variants, newAttributes);
    setSelectedVariant(matchingVariant);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!user.isAuthenticated) {
      navigate('/login')
      return;
    }
    if (!product?.wishlist && !isWishlisted) {
      dispatch(addToWishlistRequest(productId))
    } else {
      dispatch(removeFromWishlistRequest(productId))
    }
  }
  const isAttributeValueAvailable = (attributeName, value) => {
    // Check if this value is available in any active variant
    if (!product?.variants || product.variants.length === 0) return false;

    return product.variants.some(variant => {
      if (!variant.isActive || !variant.isPublished) return false;

      const variantAttr = variant.attributes.find(a => {
        const attr = product?.variantAttributes?.find(va => va._id === a.attribute);
        return attr && attr.name === attributeName;
      });

      return variantAttr && variantAttr.value === value;
    });
  };

  const isAttributeValueSelectable = (attributeName, value) => {
    // Check if this value can be selected with current other selections
    if (!product?.variants || product.variants.length === 0) return false;

    const testAttributes = { ...selectedAttributes, [attributeName]: value };
    return findMatchingVariant(product.variants, testAttributes) !== undefined;
  };

  const handleQuantityChange = (increment) => {
    setQuantity((q) => Math.max(1, q + increment));
    setLastClickedButton(increment > 0 ? 'increment' : 'decrement');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      window.location.href = '/login';
      return;
    }

    // Use selectedVariant if available, otherwise use the first variant or handle products without variants
    const variantToUse = selectedVariant || (product.variants && product.variants.length > 0 ? product.variants[0] : null);

    const cartData = {
      productId: product._id,
      variantId: variantToUse?._id,
      quantity: quantity.toString()
    };

    dispatch(addToCartRequest(cartData));
  };

  const fetchReviews = async (pageNo) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `user/product/reviews/${productId}?page=${pageNo}&limit=10`
      );

      const newData = response?.data?.data || [];

      if (newData.length === 0) {
        setHasMore(false); // No more data → hide Load More
      } else {
        // Append new data to old reviews
        setReviews((prev) => [...prev, ...newData]);
      }
    } catch (error) {
      if (error?.message) {
        showError(error?.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page); // fetch first page on mount
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) return <ProductDetailSkeleton />;
  if (error) return <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
      <p className="text-gray-600">{error}</p>
    </div>
  </div>;
  if (!product) return <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
      <p className="text-gray-600">The product you're looking for doesn't exist.</p>
    </div>
  </div>;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    // { name: product.category?.name || "Category", href: `/category?categoryId=${product.category?._id}` },
    { name: product.name, href: `/product/${product.slug}` },
  ];

  const currentPrice = selectedVariant?.price?.sellingPrice || product.basePrice?.sellingPrice;
  const currentMRP = selectedVariant?.price?.mrp || product.basePrice?.mrp;
  const discount = currentMRP && currentPrice ? Math.round(((currentMRP - currentPrice) / currentMRP) * 100) : 0;
  const isOutOfStock = selectedVariant?.inventory?.stock === 0;

  // Handle case where product has no images
  const productImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const hasMultipleImages = productImages.length > 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Breadcrumb */}
      <div className="md:hidden px-4 pt-4 pb-4">
        <nav className="flex items-center flex-wrap gap-1 text-xs sm:text-sm text-gray-600" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, idx) => (
            <span key={item.name} className="flex items-center">
              <a
                href={item.href}
                className={`hover:underline truncate max-w-[120px] sm:max-w-none ${idx === breadcrumbItems.length - 1
                  ? "font-semibold text-[#845C04] bg-[#FFF9E7] px-2 py-1 rounded-[6px] text-xs sm:text-sm"
                  : ""
                  }`}
              >
                {item.name}
              </a>
              {idx < breadcrumbItems.length - 1 && (
                <ChevronRight size={12} className="mx-1 text-gray-400 flex-shrink-0" />
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:block px-6 md:px-16 pt-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 py-8" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, idx) => (
            <span key={item.name} className="flex items-center">
              <a
                href={item.href}
                className={`hover:underline ${idx === breadcrumbItems.length - 1
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
      </div>

      {/* Mobile Product Image Section */}
      <div className="md:hidden relative">
        <div className="aspect-square bg-gray-100">
          <img
            src={productImages[selectedImage]}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-sm" onClick={handleWishlistClick}>
          <Heart
            className={`${(user.isAuthenticated && (product?.wishlist || isWishlisted || location.pathname === '/wishlist'))
              ? "text-[#C60000] fill-[#C60000]"
              : "text-[var(--icon)]"
              } transition-colors  w-5 h-5`}
            strokeWidth={"1.5px"}
          />
        </button>
        {/* Navigation arrows */}
        {hasMultipleImages && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              onClick={() =>
                setSelectedImage((i) =>
                  i === 0 ? productImages.length - 1 : i - 1
                )
              }
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              onClick={() =>
                setSelectedImage((i) =>
                  i === productImages.length - 1 ? 0 : i + 1
                )
              }
            >
              <ChevronRight size={16} />
            </button>
            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {productImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === selectedImage ? "bg-white" : "bg-gray-400/50"
                    }`}
                />
              ))}
            </div>
            {/* Image counter */}
            <div className="absolute bottom-4 right-4 text-white text-xs px-2 rounded">
              {selectedImage + 1}/{productImages.length}
            </div>
          </>
        )}
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden md:block mx-auto bg-white w-full px-6 md:px-16 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Image Gallery */}
          <div className="md:col-span-1 lg:col-span-5 space-y-4">
            <div className="aspect-square border border-[var(--border)] rounded-[16px] overflow-hidden relative">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              {/* Wishlist Icon for Desktop/Tablet */}
              <button className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-sm" onClick={handleWishlistClick}>
                <Heart
                  className={`${(user.isAuthenticated && (isWishlisted || location.pathname === '/wishlist'))
                    ? "text-[#C60000] fill-[#C60000]"
                    : "text-[var(--icon)]"
                    } transition-colors  w-5 h-5`}
                  strokeWidth={"1.5px"}
                />
              </button>
            </div>
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-3 pt-4">
                {productImages.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square border border-[var(--border)] rounded-[8px] overflow-hidden transition-all duration-200 flex items-center justify-center cursor-pointer ${selectedImage === index
                      ? "border-[var(--tertiary)]"
                      : "border-[var(--border)] hover:border-gray-300"
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Variants */}
          <div className="md:col-span-1 lg:col-span-7 space-y-4">
            {/* Badges */}
            <div className="flex items-center space-x-2">
              {product.isFeatured && (
                <div className="flex items-center space-x-2 bg-[#F3F6FF] rounded-full px-2 py-1 w-fit">
                  <Flame size={16} className="text-[var(--tertiary)] fill-[var(--tertiary)]" />
                  <span className="text-[var(--tertiary)] text-base">Featured!</span>
                </div>
              )}
              {selectedVariant?.inventory?.stock === 1 && (
                <div className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full w-fit">Only 1 left</div>
              )}
              {isOutOfStock && (
                <div className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full w-fit">Out of Stock</div>
              )}
            </div>
            <h1 className="text-xl md:text-2xl text-[var(--primary)] leading-tight">{product.name}</h1>
            <div className="text-lg text-[var(--secondary)]">
              {product.shortDescription}
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-3xl md:text-4xl font-medium text-[var(--primary)]">₹{currentPrice?.toFixed(2)}</span>
              {currentMRP && currentMRP !== currentPrice && (
                <span className="text-base md:text-lg text-[var(--secondary)] line-through">₹{currentMRP?.toFixed(2)}</span>
              )}
              {discount > 0 && (
                <span className="text-[#22784F] font-medium bg-[#E5FFF3] rounded-full px-2 py-1 text-sm md:text-base">
                  {discount}% Off
                </span>
              )}
            </div>
            {/* Add to Cart Button */}
            <Button
              className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm md:text-base disabled:opacity-50"
              disabled={isOutOfStock || addingToCart}
              onClick={handleAddToCart}
            >
              {addingToCart ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : isOutOfStock ? (
                'OUT OF STOCK'
              ) : (
                'ADD TO CART'
              )}
            </Button>
            {/* Dynamic Variant Selectors (Desktop/Tablet) */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 md:space-y-4">
                {product.variantAttributes
                  .filter(attr => attr.isVariantAttribute)
                  .map((variant, variantIndex) => (
                    <div key={variantIndex} className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-900 capitalize">{variant.name}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {availableCombinations[variant.name]?.map((option, optionIndex) => {
                          const isAvailable = isAttributeValueAvailable(variant.name, option);
                          const isSelectable = isAttributeValueSelectable(variant.name, option);
                          const isSelected = selectedAttributes[variant.name] === option;

                          return (
                            <button
                              key={optionIndex}
                              onClick={() => isSelectable && handleAttributeChange(variant.name, option)}
                              disabled={!isSelectable}
                              className={`px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border rounded-md md:rounded-lg transition-all ${isSelected
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : isSelectable
                                  ? "border-gray-300 text-gray-700 hover:border-gray-400"
                                  : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                                }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {/* Quantity Selector */}
            <div className="pt-2">
              <span className="text-sm font-medium text-gray-900 mb-4 block">Quantity:</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={`w-8 h-8 lg:w-10 lg:h-10 border rounded-md flex items-center justify-center transition-all ${lastClickedButton === 'decrement'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 bg-white'
                    }`}
                >
                  -
                </button>
                <span className="text-lg lg:text-xl font-medium text-gray-500">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className={`w-8 h-8 lg:w-10 lg:h-10 border rounded-md flex items-center justify-center transition-all ${lastClickedButton === 'increment'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 bg-white'
                    }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Product Info Section */}
      <div className="md:hidden px-4 py-4 space-y-3 md:space-y-4">
        {/* Badges */}
        <div className="flex items-center space-x-2">
          {product.isFeatured && (
            <div className="flex items-center space-x-2 bg-[#F3F6FF] rounded-full px-2 py-1 w-fit">
              <Flame size={16} className="text-[var(--tertiary)] fill-[var(--tertiary)]" />
              <span className="text-[var(--tertiary)] text-base">Featured!</span>
            </div>
          )}
          {selectedVariant?.inventory?.stock === 1 && (
            <div className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full w-fit">Only 1 left</div>
          )}
          {isOutOfStock && (
            <div className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full w-fit">Out of Stock</div>
          )}
        </div>
        {/* Product Name */}
        <h1 className="text-base md:text-lg font-medium text-gray-900">{product.name}</h1>
        {/* Description */}
        <div className="text-sm text-gray-600">
          {product.shortDescription}
        </div>
        {/* Pricing */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <span className="text-xl md:text-2xl font-semibold text-gray-900">₹{currentPrice}</span>
          {currentMRP && currentMRP !== currentPrice && (
            <span className="text-base md:text-lg text-gray-500 line-through">₹{currentMRP}</span>
          )}
          {discount > 0 && (
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs md:text-sm">
              {discount}% Off
            </span>
          )}
        </div>
        {/* Add to Cart Button */}
        <Button
          className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm md:text-base disabled:opacity-50"
          disabled={isOutOfStock || addingToCart}
          onClick={handleAddToCart}
        >
          {addingToCart ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : isOutOfStock ? (
            'OUT OF STOCK'
          ) : (
            'ADD TO CART'
          )}
        </Button>
        {/* Mobile Variant Selectors */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            {product.variantAttributes
              .filter(attr => attr.isVariantAttribute)
              .map((variant, variantIndex) => (
                <div key={variantIndex} className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900 capitalize">{variant.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableCombinations[variant.name]?.map((option, optionIndex) => {
                      const isAvailable = isAttributeValueAvailable(variant.name, option);
                      const isSelectable = isAttributeValueSelectable(variant.name, option);
                      const isSelected = selectedAttributes[variant.name] === option;

                      return (
                        <button
                          key={optionIndex}
                          onClick={() => isSelectable && handleAttributeChange(variant.name, option)}
                          disabled={!isSelectable}
                          className={`px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm border rounded-md md:rounded-lg transition-all ${isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : isSelectable
                              ? "border-gray-300 text-gray-700 hover:border-gray-400"
                              : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                            }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}
        {/* Quantity Selector */}
        <div className="pt-2">
          <span className="text-sm font-medium text-gray-900 mb-4 block">Quantity:</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              className={`w-8 h-8 lg:w-10 lg:h-10 border rounded-md flex items-center justify-center transition-all ${lastClickedButton === 'decrement'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50 bg-white'
                }`}
            >
              -
            </button>
            <span className="text-lg lg:text-xl font-medium text-gray-500">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className={`w-8 h-8 lg:w-10 lg:h-10 border rounded-md flex items-center justify-center transition-all ${lastClickedButton === 'increment'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50 bg-white'
                }`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section - Shared between mobile and desktop */}
      <div className="px-4 md:px-8 lg:px-16 md:pb-0">
        <Tabs defaultValue="highlights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-10 md:h-12">
            <TabsTrigger value="highlights" className="text-xs md:text-sm">Highlights</TabsTrigger>
            <TabsTrigger value="packaging" className="text-xs md:text-sm">Packaging</TabsTrigger>
            <TabsTrigger value="details" className="text-xs md:text-sm">Product Details</TabsTrigger>
          </TabsList>
          <TabsContent value="highlights" className="mt-4 space-y-3">
            {<ProductHighlight hasMore={hasMore} handleLoadMore={handleLoadMore} loading={loading} reviews={reviews} desktop={window.innerWidth >= 768} />}
          </TabsContent>
          <TabsContent value="packaging" className="mt-4 space-y-3">
            <div className="text-center text-gray-500 py-8">
              Packaging information will be displayed here
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-4 space-y-6">
            <div className="space-y-6">
              {/* Product Description */}
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Description</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Brand Information */}
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Brand</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {product.brand?.name}
                </p>
              </div>

              {/* Category Information */}
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">Category</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {product.category?.name}
                </p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Information */}
              {selectedVariant ? (
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Selected Variant</h3>
                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-gray-600">
                      <strong>SKU:</strong> {selectedVariant.sku}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      <strong>Stock:</strong> {selectedVariant.inventory.stock} units
                    </p>
                    {selectedVariant.inventory.stock <= selectedVariant.inventory.lowStockThreshold && (
                      <p className="text-sm md:text-base text-orange-600">
                        <strong>Low Stock Alert!</strong>
                      </p>
                    )}
                  </div>
                </div>
              ) : product.baseInventory && (
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">Product Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-gray-600">
                      <strong>Stock:</strong> {product.baseInventory.stock} units
                    </p>
                    {product.baseInventory.stock <= product.baseInventory.lowStockThreshold && (
                      <p className="text-sm md:text-base text-orange-600">
                        <strong>Low Stock Alert!</strong>
                      </p>
                    )}
                    {product.baseInventory.backorder && (
                      <p className="text-sm md:text-base text-blue-600">
                        <strong>Backorder Available</strong>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;

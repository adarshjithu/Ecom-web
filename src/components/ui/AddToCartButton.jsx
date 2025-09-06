import React from 'react';
import { Loader2, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartRequest } from '@/store/Cart/actions';
import { Button } from './button';

const AddToCartButton = ({ 
  product, 
  variant, 
  quantity = 1, 
  className = "",
  size = "default",
  children,
  showIcon = false,
  disabled = false
}) => {
  const dispatch = useDispatch();
  const { addingToCart } = useSelector((state) => state.Cart);
  const { isAuthenticated } = useSelector((state) => state.Auth);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    if (!variant && product.variants && product.variants.length > 0) {
      alert('Please select a variant before adding to cart');
      return;
    }

    const cartData = {
      productId: product._id || product.id,
      variantId: variant?._id || product.variants?.[0]?._id,
      quantity: quantity.toString()
    };

    dispatch(addToCartRequest(cartData));
  };

  const isDisabled = disabled || addingToCart || (!variant && product.variants && product.variants.length > 0);

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`${className} disabled:opacity-50`}
      size={size}
    >
      {addingToCart ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          {showIcon && <Plus className="w-4 h-4 mr-2" />}
          {children || 'Add to Cart'}
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;




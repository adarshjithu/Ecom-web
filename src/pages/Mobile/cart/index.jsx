import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Minus, Plus, ShoppingBag, Loader2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  getCartRequest,
  updateCartQuantityRequest,
  removeFromCartRequest
} from "@/store/Cart/actions";


const Cart = ({ desktop, setIsCartOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const {
    cart,
    items,
    totalMRP,
    totalPrice,
    savedAmount,
    itemCount,
    loading,
    updatingQuantity,
    removingFromCart
  } = useSelector(state => state.Cart);

  // Load cart on component mount
  useEffect(() => {
    dispatch(getCartRequest());
  }, [dispatch]);

  const updateQuantity = (productId, variantId, action) => {
    dispatch(updateCartQuantityRequest(productId, variantId, action));
  };

  const removeItem = (productId, variantId) => {
    dispatch(removeFromCartRequest(productId, variantId));
  };

  // Calculate totals from Redux state
  const handlingFee = 10;
  const totalToPay = totalPrice + handlingFee;

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white flex flex-col w-full max-w-md mx-auto relative min-h-[90vh]">
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  // Show empty cart
  if (!items || items.length === 0) {
    return (
      <div className="bg-white flex flex-col w-full max-w-md mx-auto relative min-h-[90vh]">
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some products to get started</p>
          <Button
            onClick={() => { navigate("/products"); setIsCartOpen(false) }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white flex flex-col w-full max-w-md mx-auto relative min-h-[90vh]">
      {/* Scrollable Content Area */}
      <div className="flex-1  pb-20 ">
        {/* Cart Items - Scrollable Section */}
        <div className="p-4 space-y-4 overflow-y-auto max-h-[430px]">
          {items.map((item) => (
            <div key={`${item.productId._id}-${item.variantId}`} className="flex pb-3 border-b-1 cursor-pointer gap-4" onClick={() =>{ 
              setIsCartOpen(false); 
              window.location.href = `/product/${item?.productId?._id}`;
            }}>
              <div className="bg-gray-100 rounded-lg p-2 w-28  h-28 flex items-center justify-center flex-shrink-0">
                <img
                  src={item.productId.thumbnail || "/images/no-item-found-here.png"}
                  alt={item.productId.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.src = "/images/no-item-found-here.png";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--primary)] leading-tight line-clamp-2 mb-1">
                  {item.productId.name}
                </p>

                {/* Variant info */}
                {item.variant && item.variant.attributes && item.variant.attributes.length > 0 && (
                  <p className="text-xs text-gray-500 mb-1">
                    {item.variant.attributes.map(attr => attr.value).join(', ')}
                  </p>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="line-through text-sm text-[var(--secondary)]">
                    ₹{item.mrp.toFixed(2)}
                  </span>
                  <span className="text-base font-semibold text-[var(--primary)]">
                    ₹{item.sellingPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault(); updateQuantity(item.productId._id, item.variantId, 'decrement')
                      }}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                      disabled={item.quantity <= 1 || updatingQuantity}
                    >

                      <Minus className="w-3 h-3" />

                    </button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault(); updateQuantity(item.productId._id, item.variantId, 'increment')
                      }}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                      disabled={updatingQuantity}
                    >

                      <Plus className="w-3 h-3" />

                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault(); removeItem(item.productId._id, item.variantId)
                    }}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                    disabled={removingFromCart}
                  >
                  
                      <Trash2 className="w-3 h-3" />
                    
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gift Card / Coupon Section */}
        {/* <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Code or gift card"
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            />
            <button className="px-4 py-2 bg-gray-700 text-white rounded text-sm font-medium">
              Apply
            </button>
          </div>
        </div> */}

        {/* Payment Details */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
            <h3 className="font-semibold text-base text-[var(--primary)]">
              Payment details
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-[var(--secondary)]">Subtotal</span>
              <div>
                <span className="line-through text-[var(--secondary)] mr-1">
                  ₹{totalMRP?.toFixed(2)}
                </span>
                <span className="text-[var(--primary)] font-medium">
                  ₹{totalPrice?.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[var(--secondary)]">Discount</span>
              <span className="text-[var(--primary)] font-medium">₹{savedAmount?.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[var(--secondary)]">Handling Fee</span>
              <span className="text-[var(--primary)] font-medium">₹{handlingFee}.00</span>
            </div>

            <div className="flex justify-between text-sm text-[var(--secondary)]">
              <span>Shipping</span>
              <span>To be calculated at checkout</span>
            </div>

            <hr className="border-dashed border-gray-200" />

            <div className="flex justify-between items-center font-semibold text-[var(--primary)]">
              <span>To Pay</span>
              <div>
                <span className="line-through text-[var(--secondary)] font-normal mr-1">
                  ₹{(totalToPay + (savedAmount || 0)).toFixed(2)}
                </span>
                <span className="text-[var(--primary)] font-normal">₹{totalToPay?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total and Checkout Button - Fixed Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <div>
          <div className="text-xl font-bold text-[var(--primary)]">
            ₹{totalToPay?.toFixed(2)}
          </div>
          <div className="text-xs text-[var(--secondary)]">
            Price inclusive of all taxes
          </div>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
          onClick={() => { navigate("/checkout"); setIsCartOpen(false) }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;

import { useState } from "react";
import { ArrowLeft, Bell, Minus, Plus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const initialItems = [
  {
    id: 1,
    image: "/images/item1.png",
    title:
      "Pain Relief Spray for Lower Back Pain, Joint Pain, Neck Pain & Sprain",
    size: "100 ml",
    originalPrice: 295,
    discountedPrice: 165,
    quantity: 10,
  },
  {
    id: 2,
    image: "/images/item2.png",
    title:
      "Pain Relief Spray for Lower Back Pain, Joint Pain, Neck Pain & Sprain",
    size: "100 ml",
    originalPrice: 295,
    discountedPrice: 165,
    quantity: 1,
  },
  {
    id: 3,
    image: "/images/item3.png",
    title:
      "Pain Relief Spray for Lower Back Pain, Joint Pain, Neck Pain & Sprain",
    size: "100 ml",
    originalPrice: 295,
    discountedPrice: 165,
    quantity: 1,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialItems);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} className="text-[var(--icon)]" />
          </button>
          <h1 className="text-lg font-semibold text-[var(--primary)]">Cart</h1>
        </div>
        <button
          className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={20} className="text-[var(--icon)]" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="font-medium text-base mb-4 text-[var(--primary)]">
          Order Summary
        </h2>

        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 mb-6">
            <div className="bg-[#F5F5F5] rounded-[8px] p-2 w-[122px] h-[130px] flex items-center justify-center">
              <img
                src="https://rukminim2.flixcart.com/image/400/400/xif0q/shampoo/h/6/p/-original-imah5z3rchzaazn8.jpeg?q=90&crop=false"
                alt={item.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm  text-[var(--primary)] leading-tight line-clamp-2">
                {item.title}
              </p>
              <p className="text-xs text-[var(--secondary)] mt-1">
                Size: {item.size}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="line-through text-base text-[var(--secondary)]">
                  ₹{item.originalPrice}
                </span>
                <span className="text-lg font-medium text-[var(--primary)]">
                  ₹{item.discountedPrice}.00
                </span>
              </div>

              <div className="flex justify-between gap-3 mt-2">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 disabled:opacity-50 border border-[var(--border)] rounded-xs flex items-center justify-center"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-2 h-2 text-[var(--icon)]" />
                  </button>

                  <span className="px-3 text-base">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 disabled:opacity-50 border border-[var(--border)] rounded-xs flex items-center justify-center"
                  >
                    <Plus className="w-2 h-2 text-[var(--icon)]" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-[var(--primary)] underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <div className="p-4 border rounded-[16px] bg-white text-sm space-y-3">
          <h3 className="font-medium text-base text-[var(--primary)]">
            Payment details
          </h3>

          <div className="flex justify-between text-sm text-[var(--secondary)]">
            <span>Subtotal</span>
            <div>
              <span className="line-through text-[var(--secondary)] mr-1 text-sm">
                ₹758
              </span>
              <span className="text-[var(--primary)] text-sm font-medium">
                ₹718
              </span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[var(--secondary)]">Discount</span>
            <span className="text-[var(--primary)] font-medium">₹718</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[var(--secondary)]">Handing Fee</span>
            <span className="text-[var(--primary)] font-medium">₹10.00</span>
          </div>

          <div className="flex justify-between text-sm text-[var(--secondary)]">
            <span>Shipping</span>
            <span>To be calculated at checkout</span>
          </div>

          <hr className="border-dashed border-t border-gray-200" />

          <div className="flex justify-between items-center font-medium text-[var(--primary)] text-sm">
            <span>To Pay</span>
            <div>
              <span className="line-through text-[var(--secondary)] font-normal mr-1">
                ₹1570.56
              </span>
              <span className="text-[var(--primary)] font-normal">₹1438</span>
            </div>
          </div>
        </div>
      </div>
      <div className=" fixed bottom-0 left-0 right-0 bg-white p-2 border-t border-[var(--border)] pt-4 flex flex-row justify-between">
        <div className="flex justify-between items-center mb-4 w-1/2">
          <div>
            <div className="text-2xl font-bold text-gray-900">₹1200</div>
            <div className="text-xs text-[var(--secondary)]">
              Price inclusive of all taxes
            </div>
          </div>
        </div>

        <Button
          className={"w-1/2"}
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;

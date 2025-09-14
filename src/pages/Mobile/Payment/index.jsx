import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCartRequest,
  updateCartQuantityRequest,
} from "@/store/Cart/actions";
import { fetchAddressesRequest } from "@/store/actions";
import AddressForm from "../Address/AddressForm";
import { showError, showSuccess } from "@/helpers/notification_helper";
import axiosInstance from "@/api/axiosintercepter";
import { getCart } from "@/api/cartApi";

// --- move this OUTSIDE the Payment component ---
const OrderSummary = ({ items, cart, totalMRP, savedAmount, totalPrice, couponCode, setCouponCode, updateQuantity }) => (
  <div className="bg-[#F6F8FF] rounded-lg shadow p-4 w-full">
    {items?.map((item) => (
      <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
        {/* item details */}
        <div className="flex items-center">
          <img
            src={item.productId?.thumbnail}
            alt={item?.productId?.name}
            className="w-16 h-16 rounded mr-4"
          />
          <div>
            <p className="text-sm font-medium">{item.productId?.name}</p>
            {item.variant?.attributes?.length > 0 && (
              <p className="text-xs text-gray-500 mb-1">
                {item.variant.attributes.map((attr) => attr.value).join(", ")}
              </p>
            )}

            <div className="flex items-center gap-2 mb-2">
              <span className="line-through text-sm text-[var(--secondary)]">
                AED {item.mrp.toFixed(2)}
              </span>
              <span className="text-base font-semibold text-[var(--primary)]">
                AED {item.sellingPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center mt-2">
              <button
                onClick={() => updateQuantity(item.productId._id, item.variantId, "decrement")}
                className="border p-1 rounded"
              >
                <Minus size={14} />
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId._id, item.variantId, "increment")}
                className="border p-1 rounded"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}

    <div className="border-t mt-4 pt-4">
      <input
        type="text"
        value={couponCode}
        placeholder="Code or gift card"
        className="w-full border bg-white rounded p-2 text-sm mb-3"
        onChange={(e) => setCouponCode(e.target.value)}
      />

      <div className="mt-4 text-sm space-y-1">
        <div className="flex justify-between">
          <span>Subtotal - {items?.length} items</span>
          <span>AED {totalMRP?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>AED {savedAmount?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{cart?.shipping ? `AED ${cart?.shipping}` : "FREE"}</span>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-lg mt-4">
        <span>Total</span>
        <span>AED {totalPrice}</span>
      </div>
    </div>
  </div>
);


const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const {
    cart,
    items,
    totalMRP,
    totalPrice,
    savedAmount,
  } = useSelector((state) => state.Cart);
  const addresses = useSelector((state) => state.Address.addresses);
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses[0]?._id
  );

  useEffect(() => {
    dispatch(fetchAddressesRequest());
  }, [dispatch]);

  const updateQuantity = (productId, variantId, action) => {
    dispatch(updateCartQuantityRequest(productId, variantId, action));
  };
  console.log(couponCode)
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleCheckout = async () => {
    if (!name.trim()) {
      showError("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      showError("Please enter your phone number");
      return;
    }

    if (!selectedAddressId) {
      showError("Please select an address");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "user/cart/checkout",
        {
          addressId: selectedAddressId,
          paymentMethod,
          couponCode,
          name,
          phone,
        }
      );

      showSuccess("Order placed successfully!");
      window.location.href = '/order-success'
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to place order");
    }
  };




  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
        <ShoppingBag className="w-26 h-26 text-gray-400 mb-4" />
        <h2 className="text-lg font-semibold mb-2">No items in your cart</h2>
        <p className="text-gray-500 mb-4">
          Looks like you haven’t added anything yet.
        </p>
        <Button onClick={() => navigate("/products")}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">

            {/* Name & Phone Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="mb-2">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone" className="mb-2">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Address Selection */}
            {addresses.length === 0 ? (
              <div className="flex flex-col items-center text-center border rounded-lg p-6">
                <p className="text-gray-500 mb-3">
                  No addresses found. Please add one to proceed.
                </p>
                <Button onClick={() => setIsFormOpen(true)}>
                  + Add New Address
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-base font-semibold mb-4">Select Address</h2>
                <RadioGroup value={selectedAddressId} className="grid grid-cols-2 sm:grid-cols-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`p-4 border items-start rounded-lg mb-2 cursor-pointer ${selectedAddressId === addr._id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                        }`}
                      onClick={() => setSelectedAddressId(addr?._id)}
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem
                          value={addr._id}
                          id={`addr-${addr._id}`}
                          className="mt-1"
                        />
                        <Label
                          htmlFor={`addr-${addr._id}`}
                          className="cursor-pointer"
                        >
                          <div className="font-medium">{addr.name}</div>
                          <div className="text-sm text-gray-600">
                            {addr?.apartment +
                              ", " +
                              addr?.building +
                              ", " +
                              addr?.landmark +
                              ", " +
                              addr?.street +
                              ", " +
                              addr?.city +
                              ", " +
                              addr?.emirate}
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                <Button
                  variant="outline"
                  className="mt-3"
                  onClick={() => setIsFormOpen(true)}
                >
                  + Add New Address
                </Button>
              </div>
            )}

            {/* Payment Method */}
            <div>
              <h2 className="text-base font-medium mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(val) => setPaymentMethod(val)}
              >
                <div className="p-4 border border-blue-500 bg-blue-50 rounded-lg flex items-center">
                  <RadioGroupItem value="COD" id="cod" className="mr-2" />
                  <Label htmlFor="cod" className="text-[var(--primary)] font-normal">
                    Cash on Delivery (AED 40)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full mt-4" onClick={handleCheckout}>
              Complete Order
            </Button>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <OrderSummary
              items={items}
              cart={cart}
              totalMRP={totalMRP}
              savedAmount={savedAmount}
              totalPrice={totalPrice}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              updateQuantity={updateQuantity}
              isDesktop= {true}
            />
          </div>
        </div>

        {/* Address Form Modal */}
        <AddressForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          editData={editingAddress}
          isEditing={!!editingAddress}
        />
      </div>
    </div>
  );
};

export default Payment;

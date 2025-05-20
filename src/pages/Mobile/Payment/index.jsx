import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const Payment = () => {
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [email, setEmail] = useState("");
  const [emailOffers, setEmailOffers] = useState(true);

  const orderItems = [
    {
      id: 1,
      name: "Pain Relief Spray for Lower Back Pain, Joint Pain, Neck...",
      quantity: 2,
      price: 165.0,
      volume: "100 ml",
      image:
        "https://www.matrixprofessional.in/-/media/project/loreal/brand-sites/matrix/apac/in/product-information/product-images/haircare/opti/opti-care-shampoo/8901526401222-1.jpg?rev=681873011b0b4faf965d12b89532e64e",
    },
    {
      id: 2,
      name: "Pain Relief Spray for Lower Back Pain, Joint Pain, Neck...",
      quantity: 2,
      price: 165.0,
      volume: "100 ml",
      image:
        "https://img.tatacliq.com/images/i22//658Wx734H/MP000000019896603_658Wx734H_202501131614001.jpeg",
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 40;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
            <ArrowLeft size={20} className="text-[#71717A]" />
          </button>
          <h1 className="text-lg font-semibold text-[#09090B]">Payment</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white">
        <div className="border-b border-gray-200 bg-[#F6F8FF]">
          <button
            onClick={() => setIsOrderSummaryExpanded(!isOrderSummaryExpanded)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <span className="text-base font-medium text-[#71717A]">
              Order summary
            </span>
            {isOrderSummaryExpanded ? (
              <ChevronUp size={20} className="text-[#71717A]" />
            ) : (
              <ChevronDown size={20} className="text-[#71717A]" />
            )}
          </button>

          {isOrderSummaryExpanded && (
            <div className="pb-4">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-3 px-4 py-3"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-15 h-20 object-cover rounded-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#71717A] line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#71717A] mt-1">{item.volume}</p>
                    <button className="text-sm text-[#71717A] underline mt-1">
                      Edit
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-medium text-[#71717A]">
                      ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-b border-gray-200 bg-[#F6F8FF]">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Code or gift card"
              className="bg-white w-full"
            />
            <Button
              onClick={handleApplyCoupon}
              variant={"secondary"}
              className="whitespace-nowrap"
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 space-y-3 bg-[#F6F8FF]">
          <div className="flex justify-between text-sm">
            <span className="text-[#71717A]">
              Subtotal- {orderItems.length} items
            </span>
            <span className="text-[#71717A]">₹ {subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#71717A]">Discount</span>
            <span className="text-[#71717A]">₹ {discount}</span>
          </div>
          <div className="flex justify-between text-sm text-[#71717A]">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold ">Contact</h2>
            <button className="text-[#0D2C8D] text-sm font-medium">
              Log in
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div className="flex items-center space-x-2">
            <Checkbox />
              <label htmlFor="emailOffers" className="text-sm text-gray-700">
                Email me offers
              </label>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-base font-semibold text-[#71717A] mb-4">
            Delivery address
          </h2>
          <div className="text-sm text-gray-500">
            Address form would be implemented here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

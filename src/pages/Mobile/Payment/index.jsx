import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Payment = () => {
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("prepaid");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [billingAddressOption, setBillingAddressOption] = useState("same");

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
  const shipping = shippingMethod === "cod" ? 40 : 0;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-[var(--border)] p-4">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50">
            <ArrowLeft size={20} className="text-[var(--icon)]" />
          </button>
          <h1 className="text-lg font-semibold text-[var(--primary)]">Payment</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white">
        <div className="border-b border-[var(--border)] bg-[#F6F8FF]">
          <button
            onClick={() => setIsOrderSummaryExpanded(!isOrderSummaryExpanded)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <span className="text-base font-normal text-[var(--primary)]">
              Order summary
            </span>
            {isOrderSummaryExpanded ? (
              <ChevronUp size={20} className="text-[var(--icon)]" />
            ) : (
              <ChevronDown size={20} className="text-[var(--icon)]" />
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
                    <h3 className="text-sm font-normal text-[#4E4E4E] line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--secondary)] mt-1">{item.volume}</p>
                    <button className="text-sm text-[#353535] underline mt-1">
                      Edit
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-normal text-[var(--primary)]">
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

        <div className="p-4 border-b border-[var(--border)] space-y-3 bg-[#F6F8FF]">
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
            <span>{shipping === 0 ? "FREE" : `₹ ${shipping}`}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-medium text-[var(--primary)] ">Contact</h2>
            <button className="text-[#0D2C8D] text-sm font-medium">
              Log in
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#09090B] mb-2">
              Email
            </label>
            <Input type="email" placeholder="Enter email" />

            <div className="flex items-center space-x-2">
              <Checkbox id="emailOffers" />
              <label htmlFor="emailOffers" className="text-sm text-[#09090B]">
                Email me offers
              </label>
            </div>
            <h2 className="text-base font-semibold ">Delivery address</h2>

            <label className="block text-sm font-medium text-[#09090B] mb-2">
              First name
            </label>
            <Input type="text" placeholder="Enter" />
            <label className="block text-sm font-medium text-[#09090B] mb-2">
              Last name
            </label>
            <Input type="text" placeholder="Enter" />
            <label className="block text-sm font-medium text-[#09090B] mb-2">
              Address
            </label>
            <Input type="text" placeholder="Enter" />
            <label className="block text-sm font-medium text-[#09090B] mb-2">
              City
            </label>
            <Input type="text" placeholder="Enter" />
            <label className="block text-sm font-medium text-[#09090B] mb-2">
              State
            </label>
            <Input type="text" placeholder="Enter" />
            <label className="block text-sm font-medium text-[#09090B] mb-2">
              Pincode
            </label>
            <Input type="text" placeholder="Enter" />
            <div className="flex items-center space-x-2">
              <Checkbox id="saveAddress" />
              <label htmlFor="saveAddress" className="text-sm text-[#09090B]">
                Save this information for next time
              </label>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-base font-medium mb-4">Shipping method</h2>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <RadioGroup
                value={shippingMethod}
                onValueChange={setShippingMethod}
                className="divide-y divide-[var(--border)]"
              >
                <div
                  className={`flex items-center justify-between px-4 py-3 ${
                    shippingMethod === "prepaid"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="prepaid"
                      id="prepaid"
                      className={
                        shippingMethod === "prepaid" ? "text-blue-600" : ""
                      }
                    />
                    <Label htmlFor="prepaid" className={shippingMethod === "prepaid" ? "text-[var(--primary)] font-normal" : "text-[var(--secondary)] font-normal"}>
                      Prepaid - Net banking, UPI, Debit/Credit Card
                    </Label>
                  </div>
                  <span className="text-sm font-normal">FREE</span>
                </div>
                <div
                  className={`flex items-center justify-between px-4 py-3 ${
                    shippingMethod === "cod" ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cod"
                      id="cod"
                      className={
                        shippingMethod === "cod" ? "text-blue-600" : ""
                      }
                    />
                    <Label htmlFor="cod " className={shippingMethod === "cod" ? "text-[var(--primary)] font-normal" : "text-[var(--secondary)] font-normal"}>Cash on Delivery</Label>
                  </div>
                  <span className="text-sm font-normal">₹ 40</span>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-base font-medium mb-1">Payment</h2>
            <p className="text-sm text-gray-500 mb-4">
              All transactions are secure and encrypted
            </p>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="divide-y divide-gray-200"
              >
                <div
                  className={`flex items-center justify-between px-4 py-3 ${
                    paymentMethod === "razorpay"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="razorpay"
                      id="razorpay"
                      className={
                        paymentMethod === "razorpay" ? "text-blue-600" : ""
                      }
                    />
                    <Label htmlFor="razorpay" className={paymentMethod === "razorpay" ? "text-[var(--primary)] font-normal" : "text-[var(--secondary)] font-normal"}>
                      Razorpay Secure(UPI, Cards, Wallets, NetBanking)
                    </Label>
                  </div>
                  <span className="text-xs font-normal text-gray-500">
                    ICONS OF CARDS
                  </span>
                </div>
                <div
                  className={`flex items-center justify-between px-4 py-3 ${
                    paymentMethod === "other"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="other"
                      id="other"
                      className={
                        paymentMethod === "other" ? "text-blue-600" : ""
                      }
                    />
                    <Label htmlFor="other" className={paymentMethod === "other" ? "text-[var(--primary)] font-normal" : "text-[var(--secondary)] font-normal"}>Cards, UPI, NB, Wallets, BNPL</Label>
                  </div>
                  <span className="text-xs font-normal text-gray-500">
                    ICONS OF CARDS
                  </span>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-base font-medium mb-4">Billing address</h2>
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <RadioGroup
                value={billingAddressOption}
                onValueChange={setBillingAddressOption}
                className="divide-y divide-gray-200"
              >
                <div
                  className={`flex items-center px-4 py-3 ${
                    billingAddressOption === "same"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="same"
                      id="same"
                      className={
                        billingAddressOption === "same" ? "text-blue-600" : ""
                      }
                    />
                    <Label htmlFor="same" className={billingAddressOption === "same" ? "text-[var(--primary)] font-normal" : "text-[var(--secondary)] font-normal"}>
                      Same as shipping address
                    </Label>
                  </div>
                </div>
                <div
                  className={`flex items-center px-4 py-3 ${
                    billingAddressOption === "different"
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="different"
                      id="different"
                      className={
                        billingAddressOption === "different"
                          ? "text-blue-600"
                          : ""
                      }
                    />
                    <Label htmlFor="different" className={billingAddressOption === "different" ? "text-[var(--primary)] font-normal" : "text-[var(--secondary)] font-normal"}>
                      Use a different billing address
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full">Pay Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

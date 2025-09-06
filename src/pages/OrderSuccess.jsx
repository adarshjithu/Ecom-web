
import { CheckCircle2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        {/* Icon with circle + confetti */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <CheckCircle2Icon className="w-20 h-20 text-green-500" />
            <div className="absolute -top-3 -left-3 w-3 h-3 bg-purple-400 rounded-full"></div>
            <div className="absolute -top-2 left-10 w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute bottom-0 -right-3 w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Payment Confirmed
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Payment successful! Booking confirmed.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

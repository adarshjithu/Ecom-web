import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[800px] flex flex-col items-center justify-center bg-gray-50 ">

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 ">
        <h1 className="text-9xl font-extrabold text-[#1ABC9C]">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-600 max-w-md">
          The page you’re looking for doesn’t exist or has been moved.  
          Try going back to the home page.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow hover:opacity-90 transition"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

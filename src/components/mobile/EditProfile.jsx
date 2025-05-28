import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const EditProfile = () => {
  // Example state for form fields
  const [fullName, setFullName] = useState("RONALD RICHARDS");
  const [email, setEmail] = useState("ronald.richards@gmail.com");
  const [mobile, setMobile] = useState("354123678");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-[var(--border)] p-4">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <button className="p-2 rounded-full border border-[var(--border)] hover:bg-gray-50">
            <ArrowLeft size={20} className="text-[var(--icon)]" />
          </button>
          <h1 className="text-lg font-semibold text-[var(--primary)]">
            Personal Information
          </h1>
        </div>
      </div>

      <div className="relative flex flex-col items-center pt-6 pb-2">
        {/* Blurred background using the profile image */}
        <div
          className="absolute inset-0 w-full h-full z-0  overflow-hidden"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/munkee/image/upload/v1689371378/instasize-website/learn/headshot-red-woman.webp")',
            backgroundSize: "cover",
            backgroundPosition: "contain",
            filter: "blur(2px)",
          }}
        ></div>

        {/* Profile content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full   shadow-lg mb-2 overflow-hidden">
            <img
              src="https://res.cloudinary.com/munkee/image/upload/v1689371378/instasize-website/learn/headshot-red-woman.webp"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-base  text-white">Ronald Richards</div>
          <div className="text-[var(--secondary)] text-xs mb-6">
            ronald.richards@gmail.com
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md mx-auto bg-white rounded-lg p-4 space-y-6 shadow">
        {/* Full Name */}
        <div>
          <label className="block text-[var(--primary)] font-medium text-sm mb-1">
            Full Name
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={fullName}
                disabled={!isEditingName}
                onChange={(e) => setFullName(e.target.value)}
                className={`
      w-full border rounded-[8px] px-3 py-2 pr-14
      ${isEditingName ? "border-[var(--tertiary)]" : "border-[var(--border)]"}
      text-base
    `}
              />
              <div
                className="absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-[var(--tertiary)]  focus:outline-none"
                onClick={() => setIsEditingName(true)}
              >
                EDIT
              </div>
            </div>
          </div>
          {isEditingName && (
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => setIsEditingName(false)}>Update</Button>
              <Button variant={"ghost"} onClick={() => setIsEditingName(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-gray-600 mb-1">Email Address</label>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              value={email}
              disabled={!isEditingEmail}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 border rounded px-3 py-2 ${
                isEditingEmail ? "border-blue-500" : "border-gray-200"
              }`}
            />
            <button
              className="text-blue-600 font-medium"
              onClick={() => setIsEditingEmail(true)}
            >
              EDIT
            </button>
          </div>
          {isEditingEmail && (
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-blue-700 text-white px-4 py-1 rounded"
                onClick={() => setIsEditingEmail(false)}
              >
                Update
              </button>
              <button
                className="bg-gray-100 text-gray-600 px-4 py-1 rounded"
                onClick={() => setIsEditingEmail(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-gray-600 mb-1">Mobile Number</label>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-2 border border-gray-200 rounded-l bg-gray-50 text-gray-600">
              +971
            </span>
            <input
              type="text"
              value={mobile}
              disabled={!isEditingMobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`flex-1 border rounded-r px-3 py-2 ${
                isEditingMobile ? "border-blue-500" : "border-gray-200"
              }`}
            />
            <button
              className="text-blue-600 font-medium"
              onClick={() => setIsEditingMobile(true)}
            >
              EDIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

import React from "react";
import {
  ArrowLeft,
  Home,
  Briefcase,
  Search,
  ChevronRight,
  Navigation,
  HousePlus,
} from "lucide-react";

const addresses = [
  {
    label: "HOME",
    address: "12th Main, 4th Block, Koramangala, Bangalore, Karnataka 560034",
    selected: true,
  },
  {
    label: "WORK",
    address:
      "Villa No. 12, Palm Meadows, Varthur Road, Whitefield, Bengaluru, Karnataka - 560066",
    selected: false,
  },
  {
    label: "HOME 2",
    address:
      "Flat No. B-201, Nandini Apartments, 2nd Cross, Bannerghatta Road, Opposite Meenakshi Temple, Bengaluru, Karnataka - 560076",
    selected: false,
  },
];

const AddressScreen = () => (
  <div className="max-w-md mx-auto bg-white min-h-screen">
    <div className="bg-white border-b border-[var(--border)] p-4">
      <div className="flex items-center space-x-4 max-w-md mx-auto">
        <button className="p-2 rounded-full border border-[var(--border] hover:bg-gray-50">
          <ArrowLeft size={20} className="text-[var(--icon)]" />
        </button>
        <h1 className="text-lg font-semibold text-[var(--primary)]">
          Enter Your Appartment Name
        </h1>
      </div>
    </div>

    <div className="px-4 py-4">
      <div className="flex items-center w-full rounded-lg border border-[var(--border] px-3 py-4">
        <span className="text-gray-400 mr-2">
          <Search className="w-6 h-6 text-gray-800" />
        </span>
        <input
          type="text"
          placeholder="Whitefield, Bengaluru, Karnataka etc...."
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>
    </div>

    <div className="space-y-2">
      <div className="border-b px-4 py-2 border-b-[var(--border)]  ">
        <button className="flex items-center w-full text-[var(--tertiary)] py-1 text-base font-medium">
          <Navigation className="w-5 h-5 mr-2 fill-[var(--tertiary)]" />
          Use my current location
          <ChevronRight className="w-5 h-5 ml-auto text-[var(--icon)]" />
        </button>
      </div>
      <div className="border-b px-4 py-2 border-b-[var(--border)]">
        <button className="flex items-center w-full text-[var(--tertiary)] py-1 text-base font-medium">
          <HousePlus className="w-5 h-5 mr-2" />
          Add new address
        </button>
      </div>
    </div>

    <div className="px-4 py-4">
      <div className="text-sm text-[var(--secondary)] mb-2">SAVED ADDRESSES</div>
      {addresses.map((addr, idx) => (
        <div key={idx} className="mb-4">
          <div className="flex items-center">
            <span className="text-base mr-2 font-bold text-[var(--primary)]">{addr.label}</span>
            {addr.selected && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded ml-1">
                Currently Selected
              </span>
            )}
          </div>
          <div className="text-sm text-[var(--primary)] mt-1">{addr.address}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AddressScreen;

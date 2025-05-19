import React from "react";
import { ArrowLeft, Home, Briefcase, Search, ChevronRight, Navigation, HousePlus } from "lucide-react";

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
  <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden font-sans">
    <div className="flex items-center px-4 py-4 border-b mb-4">
      <button className="mr-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 bg-white mr-4">
          <ArrowLeft className="w-6 h-6 text-gray-500" />
        </div>
      </button>
      <h2 className="text-lg">Enter your apartment name</h2>
    </div>

    <div className="px-4 py-1">
      <div className="flex items-center w-full rounded-lg border border-gray-300 px-3 py-4">
        <span className="text-gray-400 mr-2">
          <Search className="w-6 h-6 text-gray-800"/>
        </span>
        <input
          type="text"
          placeholder="Whitefield, Bengaluru, Karnataka etc...."
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>
    </div>

    <div className="space-y-2">
      <div className="border-b px-4 py-2 ">
        <button className="flex items-center w-full text-[#0D2C8D] py-1">
          <Navigation className="w-5 h-5 mr-2 fill-[#0D2C8D]"/>
          Use my current location
          <ChevronRight className="w-5 h-5 ml-auto text-gray-400" />
        </button>
      </div>
      <div className="border-b px-4 py-2">
        <button className="flex items-center w-full text-[#0D2C8D] py-1">
          <HousePlus className="w-5 h-5 mr-2"/>
          Add new address
        </button>
      </div>
    </div>

    <div className="px-4 py-4">
      <div className="text-xs text-gray-500 mb-2">
        SAVED ADDRESSES
      </div>
      {addresses.map((addr, idx) => (
        <div key={idx} className="mb-4">
          <div className="flex items-center">
            <span className="text-base mr-2 font-semibold">{addr.label}</span>
            {addr.selected && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded ml-1">
                Currently Selected
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700 mt-1">{addr.address}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AddressScreen;

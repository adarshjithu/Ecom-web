import { Button } from "@/components/ui/button";
import AddressScreen from "@/pages/Mobile/Address";
import Cart from "@/pages/Mobile/cart";
import Profile from "@/pages/Mobile/Profile";
import {
  Search,
  Heart,
  ShoppingCart,
  Languages,
  UserRound,
  MapPinHouse,
  Grip,
  BriefcaseMedical,
  Hospital,
  BadgePercent,
  X,
} from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const toggleLocation = () => {
    setIsLocationOpen(!isLocationOpen);
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <header className="w-full bg-white ">
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-12">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 hidden md:block">
                  <h1 className="text-2xl font-bold text-[#0D2C8D]">MEDCO</h1>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <div
                    onClick={toggleLocation}
                    className=" border border-[var(--border)] hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center align-middle"
                  >
                    <MapPinHouse
                      className="text-[var(--icon)] w-6 h-6"
                      strokeWidth="1.5px"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-[var(--secondary)]">
                      Location
                    </span>
                    <span className="text-sm text-[var(--primary)]">
                      Kochi, Kerala, India
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                    <Search
                      className="h-4 w-4 text-[var(--icon)] "
                      strokeWidth={"1.5px"}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Search medicines, cosmetics"
                    className="block w-full pl-10 pr-3 py-2 border border-[var(--border] rounded-md leading-5 bg-[#F7F7F7] text-sm placeholder-[#898F92] focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className=" border border-[var(--border)] hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center align-middle">
                  <Languages
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth="1.5px"
                  />
                </div>
                <div className=" border border-[var(--border)] hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center align-middle">
                  <Heart
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth="1.5px"
                  />
                </div>

                <div
                  onClick={toggleCart}
                  className=" border border-[var(--border)] cursor-pointer hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center align-middle"
                >
                  <ShoppingCart
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth="1.5px"
                  />
                </div>
                <div
                  onClick={toggleProfile}
                  className=" border border-[var(--border)] hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center align-middle"
                >
                  <UserRound
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth="1.5px"
                  />
                </div>
                <Button>Login/Register</Button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(90deg, #1ABC9C 0%, #0D8ABC 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col md:flex-row md:items-center md:space-x-8 py-4 md:py-0">
              <a
                href="#"
                className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Grip className="w-5 h-5" strokeWidth={"1.5px"} />
                <span className="text-sm font-medium">All Categories</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <BriefcaseMedical className="w-5 h-5" strokeWidth={"1.5px"} />
                <span className="text-sm font-medium">Consult Doctor</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Hospital className="w-5 h-5" strokeWidth={"1.5px"} />
                <span className="text-sm font-medium">Health Care Center</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Hospital className="w-5 h-5" strokeWidth={"1.5px"} />
                <span className="text-sm font-medium">Beauty Products</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Hospital className="w-5 h-5" strokeWidth={"1.5px"} />
                <span className="text-sm font-medium">Gym Equipment's</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <BadgePercent className="w-5 h-5" strokeWidth={"1.5px"} />
                <span className="text-sm font-medium">Flash sales</span>
              </a>
            </nav>
          </div>
        </div>
      </header>
      {isProfileOpen && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 transition-opacity"
            onClick={toggleProfile}
          />

          <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
              <button
                onClick={toggleProfile}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <Profile desktop />
            </div>
          </div>
        </>
      )}{" "}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)]  z-40"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed top-0 right-0 w-[400px] max-w-full h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>{" "}
            <div className="h-full overflow-y-auto">
              <Cart desktop />
            </div>
          </div>
        </>
      )}
      {isLocationOpen && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 transition-opacity"
            onClick={toggleLocation}
          />
          <div className="fixed top-0 left-0 w-96 max-w-full h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">
               Enter Your Appartment Name
              </h2>
              <button
                onClick={toggleLocation}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <AddressScreen desktop />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SearchDropdown from "@/components/ui/SearchDropdown";
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
  Award,
  Menu,
  Home,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from '@/context/LocationContext';
import { useSelector, useDispatch } from "react-redux";
import { getCartRequest } from "@/store/Cart/actions";
import { fetchWishlistRequest } from "@/store/actions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLocation } = useLocation();
  const user = useSelector((state) => state.Auth);
  const { itemCount } = useSelector((state) => state.Cart);
  const { wishlist } = useSelector((state) => state.Wishlist);

  // Load cart on component mount to get item count
  useEffect(() => {
    if (user.isAuthenticated) {
      dispatch(getCartRequest());
      dispatch(fetchWishlistRequest())
    }
  }, [dispatch, user.isAuthenticated]);

  const toggleLocation = () => setIsLocationOpen(!isLocationOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="w-full bg-white shadow">
        {/* Top Row for mobile & tablet */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 lg:hidden">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-[#0D2C8D] cursor-pointer" onClick={() => navigate("/")}>MEDCO</h1>
            </div>

            {/* Right: Location + Icons (mobile & tablet) */}
            <div className="flex items-center space-x-2">
              {/* Mobile only: Location */}
              <div className="sm:hidden">
                <div
                  onClick={toggleLocation}
                  className="flex items-center cursor-pointer space-x-2"
                >
                  <span className="flex items-center justify-center w-9 h-9 border border-gray-300 rounded-full">
                    <MapPinHouse className="text-gray-500 w-5 h-5" strokeWidth="1.5px" />
                  </span>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm text-gray-400 font-normal leading-none">Location</span>
                    <span className="text-sm text-black font-semibold leading-none">
                      {currentLocation?.area && currentLocation.area !== "Business Bay" ? currentLocation.area : 
                       currentLocation?.city && currentLocation.city !== "Dubai" ? currentLocation.city : 
                       'Select your location'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tablet only: Location */}
              <div className="hidden sm:flex lg:hidden">
                <div
                  onClick={toggleLocation}
                  className="flex items-center cursor-pointer space-x-3"
                  style={{ minWidth: '0' }}
                >
                  <span className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full">
                    <MapPinHouse className="text-gray-500 w-6 h-6" strokeWidth="1.5px" />
                  </span>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm text-gray-400 font-normal leading-none">Location</span>
                    <span className="text-base text-black font-semibold leading-none">
                      {currentLocation?.area && currentLocation.area !== "Business Bay" ? currentLocation.area : 
                       currentLocation?.city && currentLocation.city !== "Dubai" ? currentLocation.city : 
                       'Select your location'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Mobile only: */}
              <div className="flex items-center space-x-2 sm:hidden">
              </div>
              {/* Tablet only: */}
              <div className="hidden sm:flex lg:hidden items-center space-x-2">
                <div
                  onClick={() => navigate("/wishlist")}
                  className="border relative border-gray-300 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                  <Heart className="text-gray-600 w-5 h-5" strokeWidth="1.5px" />
                  {wishlist?.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[25px] h-[25px] flex items-center justify-center border-2 border-white">
                      {wishlist?.length}
                    </span>
                  )}
                </div>
                <div
                  onClick={toggleCart}
                  className="relative border border-gray-300 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                  <ShoppingCart className="text-gray-600 w-5 h-5" strokeWidth="1.5px" />
                  {/* Cart item count badge */}
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[25px] h-[25px] flex items-center justify-center border-2 border-white">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div
                  onClick={toggleProfile}
                  className="border border-gray-300 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                >
                  <UserRound className="text-gray-600 w-5 h-5" strokeWidth="1.5px" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Row for mobile & tablet (full width) */}
          <div className="px-4 pb-4 lg:hidden">
            <SearchDropdown placeholder="Search medicines, cosmetics" />
          </div>

          {/* Desktop top row */}
          <div className="hidden lg:flex items-center justify-between px-12 py-4 border-b border-gray-200">
            {/* Left: Logo */}
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-[#0D2C8D] cursor-pointer" onClick={() => navigate("/")}>MEDCO</h1>

              {/* Location left side of search (new design) */}
              <div
                onClick={toggleLocation}
                className="hidden lg:flex items-center cursor-pointer space-x-3"
              >
                <span className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full">
                  <MapPinHouse className="text-gray-500 w-6 h-6" strokeWidth="1.5px" />
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-sm text-gray-400 font-normal leading-none">Location</span>
                                      <span className="text-base text-black font-semibold leading-none">
                      {currentLocation?.area && currentLocation.area !== "Business Bay" ? currentLocation.area : 
                       currentLocation?.city && currentLocation.city !== "Dubai" ? currentLocation.city : 
                       'Select your location'}
                    </span>
                </div>
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-4">
              <SearchDropdown placeholder="Search medicines, cosmetics" />
            </div>

            {/* Right: Icons + Login */}
            <div className="flex items-center space-x-4">
              <div
                onClick={() => navigate("/wishlist")}
                className="border relative border-gray-300 hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer"
              >
                <Heart className="text-gray-600 w-6 h-6" strokeWidth="1.5px" />
                  {wishlist?.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[25px] h-[25px] flex items-center justify-center border-2 border-white">
                      {wishlist?.length}
                    </span>
                  )}
              </div>
              <div
                onClick={toggleCart}
                className="relative border border-gray-300 cursor-pointer hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center"
              >
                <ShoppingCart className="text-gray-600 w-6 h-6" strokeWidth="1.5px" />
                {/* Cart item count badge */}
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[25px] h-[25px] flex items-center justify-center border-2 border-white">
                    {itemCount}
                  </span>
                )}
              </div>
              {user.isAuthenticated && <div
                onClick={toggleProfile}
                className="border border-gray-300 hover:bg-gray-100 rounded-full w-11 h-11 flex items-center justify-center cursor-pointer"
              >
                <UserRound className="text-gray-600 w-6 h-6" strokeWidth="1.5px" />
              </div>}
              {!user.isAuthenticated &&<Button className="cursor-pointer" onClick={() => navigate("/login")}>Login/Register</Button>}
            </div>
          </div>
        </div>

        {/* Desktop navigation below header */}
        <div
          className="hidden lg:block"
          style={{ background: "linear-gradient(90deg, #1ABC9C 0%, #0D8ABC 100%)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-row items-center space-x-8 py-2">
              {[
                { icon: <Grip />, label: "All Categories", path: "/category" },
                // { icon: <BriefcaseMedical />, label: "Consult Doctor", path: "#" },
                // { icon: <Hospital />, label: "Health Care Center", path: "#" },
                { icon: <Award />, label: "Brands", path: "/brands" },
                // { icon: <Hospital />, label: "Gym Equipment's", path: "#" },
                // { icon: <BadgePercent />, label: "Flash Sales", path: "#" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.path !== "#" ? navigate(item.path) : null}
                  className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {React.cloneElement(item.icon, { className: "w-5 h-5", strokeWidth: 1.5 })}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile side menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent bg-opacity-60 z-40"
            onClick={toggleMobileMenu}
          />
          <aside className="fixed top-0 left-0 w-72 max-w-full h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 mb-6">
              {[
                { icon: <Grip />, label: "All Categories", path: "/category" },
                { icon: <Award />, label: "Brands", path: "/brands" },
                // { icon: <BriefcaseMedical />, label: "Consult Doctor", path: "#" },
                // { icon: <Hospital />, label: "Health Care Center", path: "#" },
                // { icon: <Hospital />, label: "Beauty Products", path: "#" },
                // { icon: <Hospital />, label: "Gym Equipment's", path: "#" },
                // { icon: <BadgePercent />, label: "Flash Sales", path: "#" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.path !== "#") {
                      navigate(item.path);
                      toggleMobileMenu();
                    }
                  }}
                  className="flex items-center space-x-3 text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                >
                  {React.cloneElement(item.icon, { className: "w-6 h-6", strokeWidth: 1.5 })}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

           {!user.isAuthenticated && <Button className="w-full cursor-pointer" onClick={() => navigate("/login")}>Login/Register</Button>}
          </aside>
        </>
      )}

      {/* Side panels */}
      {(isProfileOpen && user.isAuthenticated) && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(255,255,255,0.7)] z-[999]"
            onClick={toggleProfile}
          />
          <section className="fixed top-0 right-0 w-96 max-w-full h-full bg-white shadow-2xl z-[999] flex flex-col">
            <header className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Profile</h2>
              <button
                onClick={toggleProfile}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close profile"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </header>
            <main className="overflow-y-auto flex-grow">
              <Profile setIsProfileOpen={setIsProfileOpen} desktop />
            </main>
          </section>
        </>
      )}

      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(255,255,255,0.7)] z-[999]"
            onClick={toggleCart}
          />
          <section className="fixed top-0 right-0 w-96 max-w-full h-full bg-white shadow-2xl z-[999] flex flex-col">
            <header className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </header>
            <main className="overflow-y-auto flex-grow">
              <Cart desktop setIsCartOpen={setIsCartOpen} />
            </main>
          </section>
        </>
      )}

      {isLocationOpen && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(255,255,255,0.7)] z-[999]"
            onClick={toggleLocation}
          />
          <section className="fixed top-0 left-0 w-96 max-w-full h-full bg-white shadow-2xl z-[999] flex flex-col">
            <header className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Enter Your Apartment Name</h2>
              <button
                onClick={toggleLocation}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close location"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </header>
            <main className="overflow-y-auto flex-grow">
              <AddressScreen desktop />
            </main>
          </section>
        </>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden rounded-full px-2 fixed bottom-5 left-5 right-5 z-50 pb-2" style={{background: 'rgba(240,242,247,0.95)'}}>
        <div className="flex items-center justify-around py-2">
          {/* Home (active) */}
          <button
            onClick={() => {navigate('/')}}
            className="flex flex-col items-center space-y-1"
          >
            <span className="rounded-full bg-white shadow flex items-center justify-center w-12 h-12 border-2 border-[#0D2C8D]">
              <Home className="w-5 h-5" strokeWidth="2.2px" fill="#0D2C8D" color="#0D2C8D" />
            </span>
          </button>

          {/* Cart with badge */}
          <button
            onClick={toggleCart}
            className="flex flex-col items-center space-y-1 relative"
          >
            <span className="relative rounded-full bg-white shadow flex items-center justify-center w-12 h-12 border border-gray-200">
              <ShoppingCart className="w-5 h-5 text-gray-600" strokeWidth="2.2px" />
              {/* Cart item count badge */}
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[25px] h-[25px] flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {navigate("/wishlist")}}
            className="flex flex-col items-center space-y-1"
          >
            <span className="rounded-full relative bg-white shadow flex items-center justify-center w-12 h-12 border border-gray-200">
              <Heart className="text-gray-600 w-6 h-6" strokeWidth="1.5px" />
                  {wishlist?.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full min-w-[25px] h-[25px] flex items-center justify-center border-2 border-white">
                      {wishlist?.length}
                    </span>
                  )}
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={toggleProfile}
            className="flex flex-col items-center space-y-1"
          >
            <span className="rounded-full bg-white shadow flex items-center justify-center w-12 h-12 border border-gray-200">
              <UserRound className="w-5 h-5 text-gray-600" strokeWidth="2.2px" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;

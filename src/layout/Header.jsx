
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
  Bell,
} from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white ">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 hidden md:block">
                <h1 className="text-2xl font-bold text-[#0D2C8D]">MEDCO</h1>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <button className=" sm:block p-2 text-gray-600 border border-[#D5D5D5] hover:bg-gray-100 rounded-full">
                  <MapPinHouse size={20} className="text-gray-500" />
                </button>
                <div className="flex flex-col">
                  <span className="text-xs text-[#9C9C9C]">Location</span>

                  <span className="text-sm">Kochi, Kerala, India</span>
                </div>
              </div>
            </div>
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search medicines, cosmetics"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-[#F7F7F7] text-sm placeholder-[#898F92] focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden sm:block p-2 text-gray-600 border border-[#D5D5D5] hover:bg-gray-100 rounded-full">
                <Languages size={20} />
              </button>
              <button className="hidden sm:block p-2 text-gray-600 border border-[#D5D5D5] hover:bg-gray-100 rounded-full">
                <Heart size={20} />
              </button>

              <button className="hidden sm:block p-2 text-gray-600 border border-[#D5D5D5] hover:bg-gray-100 rounded-full">
                <ShoppingCart size={20} />
              </button>
              <button className="hidden sm:block p-2 text-gray-600 border border-[#D5D5D5] hover:bg-gray-100 rounded-full">
                <UserRound size={20} />
              </button>
              <button className=" hidden sm:block bg-[#0D2C8D] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0D2C8D] transition-colors">
                Login/Register
              </button>

              <button className="sm:hidden p-2 text-gray-600 border border-[#D5D5D5] hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-white px-4 py-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search medicines, cosmetics"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(90deg, #1ABC9C 0%, #0D8ABC 100%)",
        }}
        className={"hidden md:block"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col md:flex-row md:items-center md:space-x-8 py-4 md:py-0">
            <a
              href="#"
              className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Grip size={20} />
              <span>All Categories</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <BriefcaseMedical size={20} />
              <span>Consult Doctor</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Hospital size={20} />
              <span>Health Care Center</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Hospital size={20} />
              <span>Beauty Products</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Hospital size={20} />
              <span>Gym Equipment's</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-white hover:bg-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <BadgePercent size={20} />
              <span>Flash sales</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

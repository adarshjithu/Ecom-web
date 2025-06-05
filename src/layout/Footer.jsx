import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="hidden md:flex justify-between items-start gap-12 mb-8">
          <div className="w-1/3">
            <h2 className="text-3xl font-medium mb-4">MEDCO</h2>
            <p className="text-sm mb-6 max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do t
              ur adipiscing elit, sed do eiusmod.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-gray-300"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-300" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-gray-300 cursor-pointer">About us</li>
              <li className="hover:text-gray-300 cursor-pointer">Why us</li>
              <li className="hover:text-gray-300 cursor-pointer">Security</li>
              <li className="hover:text-gray-300 cursor-pointer">
                Testimonials
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-gray-300 cursor-pointer">About us</li>
              <li className="hover:text-gray-300 cursor-pointer">Why us</li>
              <li className="hover:text-gray-300 cursor-pointer">Security</li>
              <li className="hover:text-gray-300 cursor-pointer">
                Testimonials
              </li>
            </ul>
          </div>
        </div>
        <div className="md:hidden">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-medium mb-1">MEDCO</h2>
            <p className="text-sm">{currentYear}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-2xl mx-auto p-4 rounded text-base mb-6">
            <div className="space-y-4">
              <p className="hover:text-gray-300 cursor-pointer">About Us</p>
              <p className="hover:text-gray-300 cursor-pointer">Contact Us</p>
              <p className="hover:text-gray-300 cursor-pointer">Why Us</p>
              <p className="hover:text-gray-300 cursor-pointer">Security</p>
              <p className="hover:text-gray-300 cursor-pointer">Testimonials</p>
            </div>
            <div className="space-y-4">
              <p className="hover:text-gray-300 cursor-pointer">Categories</p>
              <p className="hover:text-gray-300 cursor-pointer">
                Editorial Policy
              </p>
              <p className="hover:text-gray-300 cursor-pointer">
                Privacy Policy
              </p>
              <p className="hover:text-gray-300 cursor-pointer">Feedback</p>
              <p className="hover:text-gray-300 cursor-pointer">Help</p>
            </div>
          </div>
          <div className="text-center mb-6">
            <p className="mb-2 font-medium text-base">MEDCO is available in</p>
            <div className="flex justify-center gap-2 items-center text-gray-300">
              <span className="hover:text-white cursor-pointer">English</span>
              <span className="text-gray-400">|</span>
              <span className="hover:text-white cursor-pointer">Arab</span>
            </div>
          </div>
          <div className="text-center mb-6">
            <p className="mb-2 font-medium">Follow Us</p>
            <div className="flex justify-center gap-6">
              <div className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors cursor-pointer">
                <Facebook className="h-6 w-6 text-black" />
              </div>
              <a
                href="#"
                className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Instagram className="h-6 w-6 text-black" />
              </a>
              <a
                href="#"
                className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Twitter className="h-6 w-6 text-black" />
              </a>
            </div>
          </div>
          <hr className="border-gray-700 mb-4 mt-6" />
          <div className="text-xs text-gray-400 text-center">
            MEDCO © {currentYear}. All Rights Reserved.
          </div>
        </div>

        <hr className="border-gray-700 mb-12 mt-6" />
        <div className="text-xs text-gray-400  md:text-left text-center">
          MEDCO © {currentYear}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

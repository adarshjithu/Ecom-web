import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-1">MEDCO</h2>
          <p className="text-sm">{currentYear}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-2xl  p-8 rounded text-base">
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
            <p className="hover:text-gray-300 cursor-pointer">Privacy Policy</p>
            <p className="hover:text-gray-300 cursor-pointer">Feedback</p>
            <p className="hover:text-gray-300 cursor-pointer">Help</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="mb-2">MEDCO is available in</p>
          <div className="flex justify-center gap-2 items-center">
            <span className="hover:text-gray-300 cursor-pointer">English</span>
            <span className="text-gray-400">|</span>
            <span className="hover:text-gray-300 cursor-pointer">Arab</span>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-4">Follow Us</p>
          <div className="flex justify-center gap-6">
            <div className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <Facebook className="h-6 w-6 text-black" />
            </div>
            <div className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <Instagram className="h-6 w-6 text-black" />
            </div>
            <div className="bg-white rounded-full p-3 hover:bg-gray-200 transition-colors cursor-pointer">
              <Twitter className="h-6 w-6 text-black" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

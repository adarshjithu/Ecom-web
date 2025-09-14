import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { ChevronRight } from "lucide-react";

const LogOutModal = ({ handleLogout,showModal, setShowModal }) => {
  const confirmLogout = () => {
    setShowModal(false);
    handleLogout();
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showModal && <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Are you sure?
            </h2>
            <p className="text-gray-500 mb-6">
              Do you really want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LogOutModal;

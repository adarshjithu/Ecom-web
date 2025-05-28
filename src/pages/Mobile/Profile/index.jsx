import { useState } from "react";
import {
  ChevronRight,
  Bell,
  Flag,
  Star,
  MessageCirclePlus,
  ScanBarcode,
  MapPinPlus,
  Languages,
  Headset,
  MessagesSquare,
  UserRoundPlus,
  Package,
  Handshake,
  FileText,
} from "lucide-react";

const Profile = ({ desktop }) => {
  const [user, setUser] = useState({
    name: "Ronald Richards",
    email: "ronald.richards@gmail.com",
    avatar: "/api/placeholder/40/40",
    language: "English",
    country: "India",
  });

  return (
    <>
      <div
        className={`min-h-screen bg-white ${desktop ? "overflow-y-auto" : ""}`}
      >
        {!desktop && (
          <div className="bg-white p-4 flex items-center justify-between border-b border-gray-200">
            <h1 className="text-lg font-semibold">Profile</h1>
            <button className="p-2">
              <Bell size={20} />
            </button>
          </div>
        )}

        <div className="bg-[#F6F8FF] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-medium text-base text-[#09090B]">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            className="bg-blue-100 text-[#0D2C8D] px-3 py-1 rounded-md text-sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white px-4 py-2 ">
          <h3 className="text-sm font-medium text-[#71717A] mb-1">
            MEDCO SERVICES
          </h3>

          <div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <MessageCirclePlus
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">Medi Advisor</span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <ScanBarcode
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">Quick Scan</span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <MapPinPlus
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">Locate Meds</span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white px-4 py-2 ">
          <h3 className="text-sm font-medium text-[#71717A] mb-1">
            MY PREFERENCES
          </h3>

          <div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <Languages
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">{user.language}</span>
                <ChevronRight className="text-[var(--icon)] w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <Flag
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">Country</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <img
                    src="/api/placeholder/16/16"
                    alt="India flag"
                    className="w-4 h-4 mr-1"
                  />
                  <span className="text-gray-500">{user.country}</span>
                </div>
                <ChevronRight className="text-[var(--icon)] w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className={`bg-white px-4 py-2 ${desktop && "mb-40"}`}>
          <h3 className="text-sm font-medium text-[#71717A] mb-1">
            HELP & SUPPORT
          </h3>

          <div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <Headset
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">Contact us</span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <MessagesSquare
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">
                  Frequently asked questions
                </span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <Star
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]"> Rate our app</span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <UserRoundPlus
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">Invite Friends</span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <Package
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">
                  Delivery Information
                </span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <Handshake
                    className="text-[var(--icon)] w-6 h-6"
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">
                  Terms & Conditions
                </span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-[var(--border] border rounded-full flex items-center justify-center">
                  <FileText
                    className="text-[var(--icon)] w-6 h-6  "
                    strokeWidth={"1.5px"}
                  />
                </div>
                <span className="text-[var(--primary)]">
                  Exchange & Return Policy
                </span>
              </div>
              <ChevronRight className="text-[var(--icon)] w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import {
  ArrowLeft,
  CircleUserRound,
  CreditCard,
  Dumbbell,
  Percent,
  ShoppingBag,
  WalletMinimal,
} from "lucide-react";
import React from "react";

const notifications = [
  {
    date: "Today",
    items: [
      {
        icon: <Percent className="w-6 h-6 text-gray-500" />,
        title: "30% Special discount!",
        subtitle: "Special promotion",
        time: "8:24 PM",
      },
      {
        icon: <WalletMinimal className="w-6 h-6 text-gray-500" />,
        title: "Top up e-wallet successfully!",
        subtitle: "You have top up your e-wallet",
        time: "5:00 PM",
      },
    ],
  },
  {
    date: "Yesterday",
    items: [
      {
        icon: <ShoppingBag className="w-6 h-6 text-gray-500" />,
        title: "Flash Sale: 50% Off!",
        subtitle: "On gym gear & cosmetics",
        time: "7:15 PM",
      },
      {
        icon: <Dumbbell className="w-6 h-6 text-gray-500" />,
        title: "Gym Essentials Restocked",
        subtitle: "Resistance bands are back!",
        time: "12:00 PM",
      },
    ],
  },
  {
    date: "25/05/2025",
    items: [
      {
        icon: <CreditCard className="w-6 h-6 text-gray-500" />,
        title: "Credit card connected!",
        subtitle: "Credit card has been linked",
        time: "5:10 PM",
      },
      {
        icon: <CircleUserRound className="w-6 h-6 text-gray-500" />,
        title: "Account setup successfully!",
        subtitle: "Your account has been created",
        time: "9:00 AM",
      },
    ],
  },
];

const Notifications = () => (
  <div className="max-w-md mx-auto bg-white rounded-lg min-h-screen">
    <div className="bg-white border-b border-gray-200 p-4 mb">
      <div className="flex items-center space-x-4 max-w-md mx-auto">
        <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
          <ArrowLeft size={20} className="text-[#71717A]" />
        </button>
        <h1 className="text-lg font-semibold text-[#09090B]">Notifications</h1>
      </div>
    </div>

    <div className="pb-30">
      {notifications.map((section, idx) => (
        <div key={section.date}>
          <div className="px-4 py-2 text-gray-500 text-sm">{section.date}</div>
          {section.items.map((item, i) => (
            <div key={i} className="flex items-center px-4 py-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 bg-white mr-4">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-900">{item.title}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    {item.time}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{item.subtitle}</div>
              </div>
            </div>
          ))}
          {idx < notifications.length - 1 && (
            <hr className="my-2 border-gray-200" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Notifications;

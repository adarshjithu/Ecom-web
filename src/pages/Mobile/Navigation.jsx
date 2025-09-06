import React from "react";
import { Home, ShoppingBag, Heart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  {
    label: "Home",
    route: "/home",
    icon: Home,
  },
  {
    label: "Cart",
    route: "/cart",
    icon: ShoppingBag,
    badge: 2,
  },
  {
    label: "Wishlist",
    route: "/wishlist",
    icon: Heart,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: User,
  },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(13, 67, 115, 0.12) 0%, rgba(13, 44, 141, 0.12) 100%)",
        borderRadius: "9999px",
        padding: "8px 16px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        width: "fit-content",
        margin: "0 auto",
        position: "fixed",
        left: "50%",
        bottom: "24px",
        transform: "translateX(-50%)",
        zIndex: 50,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1.5px solid rgba(180, 190, 210, 0.12)",
      }}
    >
      {navItems.map(({ label, route, icon: Icon, badge }) => {
        const isActive = location.pathname === route;
        const iconProps = {
          width: "24px",
          height: "24px",
          stroke: isActive ? "#0D2C8D" : "#222",
          strokeWidth: "1.5px",
          fill: isActive ? "#0D2C8D" : "none",
        };

        return (
          <button
            key={label}
            onClick={() => navigate(route)}
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #D5D5D5",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              position: "relative",
            }}
            aria-label={label}
          >
            <Icon {...iconProps} />
            {/* Badge for Cart */}
            {badge && badge > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  background: "#C60000",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: "bold",
                  border: "2px solid #fff",
                  boxSizing: "border-box",
                  lineHeight: 1,
                }}
              >
                {badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;

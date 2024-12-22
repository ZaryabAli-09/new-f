import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUserCog, FaTag } from "react-icons/fa"; // Import necessary icons
import $GS from "../../styles/constants"; // Import styles
import logo from "../../assets/logo.png"; // Update the path to your logo

const adminMenuItems = [
  {
    path: "/admin/dashboard",
    icon: <FaTachometerAlt className="mr-2" />,
    label: "Dashboard",
  },
  {
    path: "/admin/user-management",
    icon: <FaUserCog className="mr-2" />,
    label: "User Management",
  },
  {
    path: "/admin/order-label-management",
    icon: <FaTag className="mr-2" />,
    label: "Order Label Management",
  },
];

const AdminSidebar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div
      className={`w-[250px] bg-custom-background border-thin border-custom-border text-white h-full p-0 ${$GS.cardContainer}`}
    >
      {/* Logo Section */}
      <Link
        to="/admin/dashboard"
        className={`${$GS.textHeading_2} mt-10 flex items-center`}
      >
        <img src={logo} alt="Icarus Ships Logo" className="h-10 mr-2" />
        <h1 className={`text-xl transition-colors duration-300`}>
          Icarus Admin
        </h1>
      </Link>
      <ul className="w-full">
        {adminMenuItems.map((item, index) => {
          // Check if the current item's path matches the current location
          const isActive = location.pathname === item.path;
          return (
            <li
              className={`${$GS.Box_1} ${isActive ? $GS.ActiveBox : ""}`}
              key={index}
            >
              <Link className={`${$GS.SidebarItem}`} to={item.path}>
                <span
                  className={`${
                    isActive ? $GS.hoverText : ""
                  } flex items-center`}
                >
                  {item.icon} {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;

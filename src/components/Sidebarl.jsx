import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaUserCog, FaVideo, FaUserTimes, FaComment, FaLightbulb, FaQrcode, FaSearch, FaBook } from "react-icons/fa";

const links = [
  { to: "/", label: "Welcome", icon: <FaBook /> },
  { to: "/complaint", label: "Complaint", icon: <FaComment /> },
  { to: "/deactivate", label: "Deactivate Staff", icon: <FaUserTimes /> },
  { to: "/zoom", label: "Zoom Links", icon: <FaVideo /> },
  { to: "/suggestion", label: "Suggestions", icon: <FaLightbulb /> },
  { to: "/schedule-meeting", label: "Schedule Meeting", icon: <FaUserCog /> },
  { to: "/lead-checker", label: "Lead Checker", icon: <FaSearch /> },
  { to: "/qr-generator", label: "QR Generator", icon: <FaQrcode /> },
  { to: "/demo-video", label: "How to Use", icon: <FaBook /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white shadow-md hidden md:block">
      <div className="p-4 text-xl font-bold border-b">Gtext IT Agent</div>
      <ul className="space-y-2 p-4">
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <Link
              to={to}
              className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                location.pathname === to ? "bg-gray-300" : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

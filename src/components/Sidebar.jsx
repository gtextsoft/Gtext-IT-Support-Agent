import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars, FaUserCog, FaVideo, FaUserTimes, FaComment,
  FaLightbulb, FaQrcode, FaSearch, FaBook
} from "react-icons/fa";

const links = [ 
  { to: "/", label: "Welcome", icon: <FaBook /> },
  { to: "/create", label: "Create GtextMail & Erp", icon: <FaBook /> },
  { to: "/deactivate", label: "Deactivate Staff Mail ", icon: <FaUserTimes /> },
  { to: "/complaint", label: "Complaint", icon: <FaComment /> },
  { to: "/schedule-meeting", label: "Schedule Meeting", icon: <FaUserCog /> },
  // { to: "/delete", label: "Delete Staff ERP", icon: <FaUserTimes /> },
  // { to: "/zoom", label: "Zoom Links", icon: <FaVideo /> },
  // { to: "/suggestion", label: "Suggestions", icon: <FaLightbulb /> },
  // { to: "/lead-checker", label: "Lead Checker", icon: <FaSearch /> },
  // { to: "/qr-generator", label: "QR Generator", icon: <FaQrcode /> },
  // { to: "/demo-video", label: "How to Use", icon: <FaBook /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden bg-white p-4 shadow flex flex-col justify-between items-center">
        {/* <div className="text-xl font-bold">Gtext Agent</div> */}
        <button onClick={() => setShowMenu(!showMenu)} className="text-xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`md:block ${showMenu ? "block" : "hidden"} w-64 min-h-screen bg-white shadow-md`}>
        <div className="p-4 text-xl font-bold border-b hidden md:block">Gtext IT Agent</div>
        <ul className="space-y-2 p-4">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-200 ${
                  location.pathname === to ? "bg-gray-300" : ""
                }`}
                onClick={() => setShowMenu(false)}
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

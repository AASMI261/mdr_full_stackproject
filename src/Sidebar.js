import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaUserCircle } from "react-icons/fa";

function Sidebar({ isOpen }) {
  const location = useLocation(); // get current URL
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">Dashboard</h2>

      {/* USER PROFILE BOX */}
      <div className="profile-box">
        <FaUserCircle className="profile-icon" />
        <p className="profile-name">{user?.name || "User"}</p>
      </div>

      <ul className="menu">
        <li className={location.pathname === "/home" ? "active" : ""}>
          <Link to="/home">Home</Link>
        </li>
        <li className={location.pathname === "/staff" ? "active" : ""}>
  <Link to="/staff">Staff</Link>
</li>
        <li className={location.pathname === "/report" ? "active" : ""}>
          <Link to="/report">Reports & Analysis</Link>
        </li>
        <li className={location.pathname === "/recovery" ? "active" : ""}>
          <Link to="/recovery">Recovery</Link>
        </li>
        <li className={location.pathname === "/contact-tracing" ? "active" : ""}>
          <Link to="/contact-tracing">Contact Tracing</Link>
        </li>
         <li className={location.pathname === "/mdr-linkage" ? "active" : ""}>
        <Link to="/mdr-linkage">MDR Linkage Graph</Link>
      </li>
        <li className={location.pathname === "/suspected-dashboard" ? "active" : ""}>
          <Link to="/suspected-dashboard">Suspected Dashboard</Link>
        </li>
        <li>
          <Link to="/login/admin">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

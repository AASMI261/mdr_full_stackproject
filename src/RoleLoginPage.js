import React from "react";
import "./RoleLoginPage.css";
import { FaUserMd, FaUserNurse, FaUserTie, FaVials } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function RoleLoginPage() {
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="role-page">
      <div className="intro-section">
        <div className="intro-box">
          <img
            src="https://acsonnet.com/wp-content/uploads/2021/05/Hospital-Management-System.jpg"
            alt="Hospital Interface"
            className="intro-image"
          />
          <div className="intro-text">
            <h1>Digital Contact Tracing & MDR Screening System</h1>
            <p>
              This intelligent hospital management platform is designed to monitor,
              track, and manage Multi-Drug Resistant (MDR) cases efficiently.
              The system integrates AI-powered voice translation, real-time
              patient tracking, contact tracing alerts, and smart risk analysis
              to support doctors and healthcare staff.
            </p>
          </div>
        </div>
      </div>

      <div className="role-grid">
        <div className="role-box" onClick={() => handleRoleClick("Doctor")}>
          <div className="role-icon"><FaUserMd /></div>
          <div className="role-label">Doctor</div>
        </div>

        <div className="role-box" onClick={() => handleRoleClick("Admin")}>
          <div className="role-icon"><FaUserTie /></div>
          <div className="role-label">Admin</div>
        </div>

        <div className="role-box" onClick={() => handleRoleClick("Nurse")}>
          <div className="role-icon"><FaUserNurse /></div>
          <div className="role-label">Nurse</div>
        </div>

        <div className="role-box" onClick={() => handleRoleClick("Staff")}>
          <div className="role-icon"><FaUserTie /></div>
          <div className="role-label">Staff</div>
        </div>

        <div className="role-box" onClick={() => handleRoleClick("Lab Technician")}>
          <div className="role-icon"><FaVials /></div>
          <div className="role-label">Lab Technician</div>
        </div>
      </div>
    </div>
  );
}

export default RoleLoginPage;
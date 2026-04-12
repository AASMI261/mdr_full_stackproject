// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleLoginPage from "./RoleLoginPage";
import LoginPage from "./LoginPage"; // new login page component
import ForgotPassword from "./ForgotPassword";
import SignUpPage from "./SignUpPage";
import PatientDetailsPage from "./PatientDetailsPage";
import ReportPage from "./ReportPage";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Notification from "./Notification";   // ✅ your notification component
import timeAgo from "./timeAgo";
import Recovery from "./Recovery";
import ContactTracing from "./ContactTracing";
import SuspectedDashboard from "./SuspectedDashboard";
import Staff from "./Staff";
import MdrLinkageGraph from './MdrLinkageGraph';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleLoginPage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/details" element={<PatientDetailsPage />} />
        <Route path="/ReportPage" element={<ReportPage.js />} />
        <Route path="/ReportPage" element={<ReportPage />} /> 
        <Route path="/notifications" element={<Notification />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/contact-tracing" element={<ContactTracing />} />
        <Route path="/suspected-dashboard" element={<SuspectedDashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/mdr-linkage" element={<MdrLinkageGraph />} />
        <Route
          path="/timeago"
          element={
            <div style={{ padding: "20px" }}>
              <h2>TimeAgo Demo</h2>
              <p>{timeAgo(new Date(Date.now() - 5 * 60 * 1000))}</p>
            </div>
          }
        />
        <Route
          path="/details"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <div style={{ marginLeft: "220px", width: "100%" }}>
                <PatientDetailsPage />
              </div>
            </div>
          }
        />
        <Route
  path="/report"
  element={
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", width: "100%" }}>
        <ReportPage />
      </div>
    </div>
  }
/>
        <Route
  path="/Home"
  element={
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "0px", width: "100%" }}>
        <Home />
      </div>
    </div>
  }
/>
      </Routes> 
    </Router>
  );
}

export default App;
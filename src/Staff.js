// src/MDRDashboard.js
import React, { useState } from "react";
 import { useEffect } from "react";
import "./Staff.css";
import Sidebar from "./Sidebar";

const MDRDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
   // rename state to avoid conflict with global open
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  

useEffect(() => {
  fetch("http://localhost:5000/api/mdr")
    .then(res => res.json())
    .then(data => {
      setRooms(data);
    })
    .catch(err => console.error(err));
}, []);
   
   const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen); 
  const toggleSidebar = () => setIsSidebarOpen(v => !v);
    
  const markClean = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/mdr/clean/${id}`, {
      method: "PUT",
    });

    // Refresh data after update
    const res = await fetch("http://localhost:5000/api/mdr");
    const data = await res.json();
    setRooms(data);

  } catch (error) {
    console.error("Error marking clean:", error);
  }
};

  return (
    <div
  style={{
    marginLeft: isSidebarOpen ? "280px" : "0",
    transition: "margin-left 0.3s"
  }}
   >
    <div className="app-root" style={{ marginLeft: isSidebarOpen ? "20px" : "0" }}>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* HEADER */}
      <div className="header-content">

        {/* LEFT 3-LINE BUTTON (☰) */}
        <button className="hamburger-btn" onClick={handleSidebar}>☰</button>

    <div className="page-container">

      <h2 className="page-title">MDR Room Allotment & Cleaning Status</h2>

      {/* Summary Cards */}
      <div className="summary-container">
        <div className="summary-card">
          <p>Total Rooms</p>
          <h3>18</h3>
        </div>
        <div className="summary-card">
          <p>Occupied</p>
          <h3>11</h3>
        </div>
        <div className="summary-card">
          <p>Contaminated</p>
          <h3>4</h3>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ATTENDER ID</th>
              <th>ATTENDER ACCOMPANYING</th>
              <th>WARD NO</th>
              <th>ROOM NO</th>
              <th>BED NO</th>
              <th>OCCUPIED</th>
              <th>CONTAMINATED</th>
              <th>LAST CLEANED DATE</th>
              <th>TIMESTAMP</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>
                  <select className="drop">
                    <option>{room.attender_id}</option>
                    <option>A11</option>
                    <option>A12</option>
                  </select>
                  
                </td>

                <td>
                  <select className="drop">
                    <option>{room.accompanying}</option>
                    <option>S205</option>
                  </select>
                </td>

                <td>{room.ward_no}</td>
                <td>{room.room_no}</td>
                <td>{room.bed_no}</td>

                <td>
                  <span className={`status ${room.occupied ? "yes" : "no"}`}>
                    {room.occupied ? "Yes" : "No"}
                  </span>
                </td>

                <td>
                  <span
                    className={`status ${room.contaminated ? "no" : "yes"}`}
                  >
                    {room.contaminated ? "Yes" : "No"}
                  </span>
                </td>

                <td>{room.cleaned_date}</td>
                <td>{room.time}</td>

                <td>
                  <button
                    className="clean-btn"
                    onClick={() => markClean(room.id)}
                  >
                    Mark Clean
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default MDRDashboard;

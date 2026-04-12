// src/ContactTracing.js
import React, { useState, useEffect } from "react";
import "./ContactTracing.css";
import Sidebar from "./Sidebar";

const ContactTracing = () => {
  const [searchInput, setSearchInput] = useState("");
  const [graphData, setGraphData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
 
  useEffect(() => {
  fetch("http://localhost:5000/api/contact-tracing")
    .then((res) => res.json())
    .then((data) => {
      console.log("API DATA:", data);
      setTableData(data);
    })
    .catch((err) => console.error(err));
}, []);

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);



  // 🔍 SEARCH FILTER
  const filteredData =
  searchInput.trim() === ""
    ? tableData
    : tableData.filter((row) => {
        const input = searchInput.toLowerCase();
        return (
          row.id?.toLowerCase().includes(input) ||
          row.name?.toLowerCase().includes(input) ||
          row.suspectId?.toLowerCase().includes(input) ||
          row.suspectName?.toLowerCase().includes(input)
        );
      });

  // 📊 GRAPH LOGIC (FRONTEND ONLY)
  const showGraph = (row) => {
    const relatedContacts = tableData.filter(
      (r) => r.id === row.id && r.mdr === row.mdr && r.date === row.date
    );

    setGraphData({
      mdr: row.mdr,
      initial: {
        id: row.id,
        name: row.name,
        time: row.time,
      },
      contacts: relatedContacts.map((r) => ({
        id: r.suspectId,
        name: r.suspectName,
        time: r.time,
        date: r.date,
      })),
    });
  };

  return (
    <div
      style={{
        marginLeft: isSidebarOpen ? "280px" : "0",
        transition: "margin-left 0.3s",
      }}
    >
      <div className="app-root" style={{ marginLeft: isSidebarOpen ? "20px" : "0" }}>
        <Sidebar isOpen={isSidebarOpen} />

        <div className="header-content">
          <button className="hamburger-btn" onClick={handleSidebar}>☰</button>

          <div className="contact-tracing-container">
            <h1>CONTACT TRACING</h1>
            <h3>Suspected Transmission Chain</h3>

            {/* SEARCH */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Patient / Doctor / Staff"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {/* GRAPH */}
            {graphData && (
              <div className="graph-container">
                <h3>MDR Group: {graphData.mdr}</h3>

                <div className="node initial">
                  Initial Case<br />
                  <b>{graphData.initial.id}</b><br />
                  {graphData.initial.name}<br />
                  {graphData.initial.time}
                </div>

                <div className="branch-line"></div>

                <div className="primary-row">
                  {graphData.contacts.map((c, i) => (
                    <div key={i} className="node primary">
                      Contact<br />
                      <b>{c.id}</b><br />
                      {c.name}<br />
                      {c.date} - {c.time}
                    </div>
                  ))}
                </div>

                <div className="branch-line"></div>

                <div className="node secondary">
                  Secondary Contact<br />
                  <b>AI Prediction</b><br />
                  Future Exposure
                </div>
              </div>
            )}

            {/* TABLE */}
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>MDR</th>
                  <th>Check-in Date</th>
                  <th>Check-in Time</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Suspected ID</th>
                  <th>Suspected Name</th>
                  <th>Location</th>
                  <th>Checkout Date</th>
                  <th>Checkout Time</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.mdr}</td>
                    <td>
  {row.checkInDate
    ? new Date(row.checkInDate).toLocaleDateString()
    : ""}
</td>
                    <td>{row.checkInTime}</td>
                    <td>
                      <button onClick={() => showGraph(row)}>
                        {row.date}
                      </button>
                    </td>
                    <td>{row.time}</td>
                    <td>{row.suspectId}</td>
                    <td>{row.suspectName}</td>
                    <td>{row.location}</td>
                    <td>{row.checkoutDate}</td>
                    <td>{row.checkoutTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTracing;

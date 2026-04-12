import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Sidebar from "./Sidebar";
import "./ReportPage.css";

const ReportAnalysis = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (lineChartInstance.current) lineChartInstance.current.destroy();
    if (barChartInstance.current) barChartInstance.current.destroy();

    // 📈 LINE CHART
    lineChartInstance.current = new Chart(lineChartRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "MDR Cases",
            data: [40, 55, 48, 70, 65, 80],
            borderColor: "#0055cc",
            backgroundColor: "rgba(0,85,204,0.2)",
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    // 📊 BAR CHART
    barChartInstance.current = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Daily Contact Tracking",
            data: [20, 18, 25, 22, 19],
            backgroundColor: "#003f99",
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    return () => {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, []);

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
          <button className="hamburger-btn" onClick={handleSidebar}>
            ☰
          </button>

          <div className="report-container">
            <div className="header-section">
              <h2>Report & Analysis</h2>

              <div className="filters">
                <select>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>

                <input type="date" />
                <input type="date" />
                <button className="btn-blue">Generate PDF</button>
              </div>
            </div>

            {/* STATS */}
            <div className="stats-row">
              <div className="stat-card">
                <h4>Active MDR Cases</h4>
                <p>120</p>
              </div>
              <div className="stat-card">
                <h4>Total Exposed Cases</h4>
                <p>79</p>
              </div>
              <div className="stat-card">
                <h4>High-Risk Contacts</h4>
                <p>45</p>
              </div>
              <div className="stat-card">
                <h4>Recovery Rate</h4>
                <p>89%</p>
              </div>
            </div>

            {/* GRAPHS */}
            <div className="graphs-container">
              <div className="graph-box">
                <h4>MDR Cases Over Time</h4>
                <div className="graph-wrapper">
                  <canvas ref={lineChartRef}></canvas>
                </div>
              </div>

              <div className="graph-box">
                <h4>Daily Contact Tracking Activity</h4>
                <div className="graph-wrapper">
                  <canvas ref={barChartRef}></canvas>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <h3 className="section-title">Treatment Efficiency Table</h3>
            <table className="efficiency-table">
              <thead>
                <tr>
                  <th>Treatment</th>
                  <th>Total Patients</th>
                  <th>Recovered</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Treatment A</td>
                  <td>120</td>
                  <td>95</td>
                  <td>79%</td>
                </tr>
                <tr>
                  <td>Treatment B</td>
                  <td>80</td>
                  <td>60</td>
                  <td>75%</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;

import React, { useEffect, useState, useRef } from "react";
import "./Recovery.css";
import Chart from "chart.js/auto";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Recovery() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   
const [patientsData, setPatientsData] = useState([]);
const [filteredPatients, setFilteredPatients] = useState([]);

     useEffect(() => {
  fetch("http://localhost:5000/api/recovery/patients")
    .then(res => res.json())
    .then(data => {

      const formattedData = data.map(p => ({
        ...p,
        awareness: p.awareness ? p.awareness.split(",") : []
      }));

      setPatientsData(formattedData);
      setFilteredPatients(formattedData);
    })
    .catch(err => console.error(err));
}, []);

   const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigate = useNavigate();  
  const toggleSidebar = () => setIsSidebarOpen(v => !v);
  

  // Chart refs (BEST PRACTICE)
  const doctorChartRef = useRef(null);
  const medicineChartRef = useRef(null);
  const immunityChartRef = useRef(null);
  const awarenessChartRef = useRef(null);

  // -----------------------------
  // HELPER FUNCTIONS
  // -----------------------------
  const awarenessScore = (arr) => {
    let maditation = 0, mental = 0, food = 0;
    arr.forEach(a => {
      if (a.toLowerCase().includes("maditation")) maditation = 30;
      if (a.toLowerCase().includes("mental")) mental = 60;
      if (a.toLowerCase().includes("food") || a.toLowerCase().includes("diet") || a.toLowerCase().includes("nutrition")) food = 50;
    });
    return { maditation, mental, food };
  };

  const awarenessAvg = (arr) => arr.length * 20;

  const daysBetween = (a, b) =>
    Math.ceil((new Date(b) - new Date(a)) / (1000 * 60 * 60 * 24));

  const aiAnalyzePatient = (p) => {
    let score = p.immunity + awarenessAvg(p.awareness) * 0.3;
    const medEffect = { "Medicol Forte": 70, "Flexon": 80, "Antiviral X": 60, "Paracetamol": 75, "ImmuneBoost": 65 };
    score += (medEffect[p.medicine] || 50) * 0.2;
    const predictedRisk = score >= 70 ? "Low" : score >= 50 ? "Medium" : "High";
    return { predictedRisk, recoveryScore: Math.round(score) };
  };

  // -----------------------------
  // FILTER FUNCTION
  // -----------------------------
  const filterPatients = (type) => {
    if (type === "All") setFilteredPatients(patientsData);
    else setFilteredPatients(patientsData.filter(p => p.risk === type));
  };

  // -----------------------------
  // DRAW CHARTS
  // -----------------------------
  useEffect(() => {
    const list = filteredPatients;

    // DESTROY OLD CHARTS BEFORE RECREATING
    if (doctorChartRef.current) doctorChartRef.current.destroy();
    if (medicineChartRef.current) medicineChartRef.current.destroy();
    if (immunityChartRef.current) immunityChartRef.current.destroy();
    if (awarenessChartRef.current) awarenessChartRef.current.destroy();

    // ----- DOCTOR CHART -----
    const doctorMap = {};
    list.forEach(p => {
      const ai = aiAnalyzePatient(p);
      if (!doctorMap[p.doctor]) doctorMap[p.doctor] = [];
      doctorMap[p.doctor].push(ai.recoveryScore);
    });

    const doctorLabels = Object.keys(doctorMap);
    const doctorScores = doctorLabels.map(d =>
      Math.round(doctorMap[d].reduce((a, b) => a + b, 0) / doctorMap[d].length)
    );

    doctorChartRef.current = new Chart(document.getElementById("doctorChart"), {
      type: "bar",
      data: {
        labels: doctorLabels,
        datasets: [{
          label: "Recovery Score (%)",
          data: doctorScores,
          backgroundColor: "#4C9AFF"
        }]
      }
    });

    // ----- MEDICINE CHART -----
    const medMap = {};
    list.forEach(p => {
      const ai = aiAnalyzePatient(p);
      if (!medMap[p.medicine]) medMap[p.medicine] = [];
      medMap[p.medicine].push(ai.recoveryScore);
    });

    const medLabels = Object.keys(medMap);
    const medScores = medLabels.map(m =>
      Math.round(medMap[m].reduce((a, b) => a + b, 0) / medMap[m].length)
    );

    medicineChartRef.current = new Chart(document.getElementById("medicineChart"), {
      type: "bar",
      data: {
        labels: medLabels,
        datasets: [{
          label: "Effectiveness (%)",
          data: medScores,
          backgroundColor: "#FFB347"
        }]
      },
      options: { indexAxis: "y" }
    });

    // ----- IMMUNITY CHART -----
    immunityChartRef.current = new Chart(document.getElementById("immunityChart"), {
      type: "bar",
      data: {
        labels: list.map(p => p.name),
        datasets: [{
          label: "Immunity Score",
          data: list.map(p => p.immunity),
          backgroundColor: "#4CAF50"
        }]
      },
      options: { indexAxis: "y" }
    });

    // ----- AWARENESS CHART -----
    awarenessChartRef.current = new Chart(document.getElementById("awarenessChart"), {
      type: "bar",
      data: {
        labels: list.map(p => p.name),
        datasets: [
          { label: "maditation", data: list.map(p => awarenessScore(p.awareness).maditation), backgroundColor: "rgba(54,162,235,0.8)" },
          { label: "Mental Health", data: list.map(p => awarenessScore(p.awareness).mental), backgroundColor: "rgba(75,192,192,0.8)" },
          { label: "Food Awareness", data: list.map(p => awarenessScore(p.awareness).food), backgroundColor: "rgba(153,102,255,0.8)" }
        ]
      },
      options: { indexAxis: "y" }
    });

    // CLEANUP ON UNMOUNT
    return () => {
      if (doctorChartRef.current) doctorChartRef.current.destroy();
      if (medicineChartRef.current) medicineChartRef.current.destroy();
      if (immunityChartRef.current) immunityChartRef.current.destroy();
      if (awarenessChartRef.current) awarenessChartRef.current.destroy();
    };

  }, [filteredPatients]);

  // -----------------------------
  // UI RENDER
  // -----------------------------
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
    <div className="recovery-container">

      <h2>AI Hospital Recovery Dashboard</h2>

      {/* FILTER BUTTONS */}
      <div className="filters">
        <button onClick={() => filterPatients("All")}>All</button>
        <button onClick={() => filterPatients("High")}>High Risk</button>
        <button onClick={() => filterPatients("Medium")}>Medium Risk</button>
      </div>

      {/* PATIENT CARDS */}
      <div className="grid">
        {filteredPatients.map((p, i) => {
          const ai = aiAnalyzePatient(p);
          const riskClass =
            ai.predictedRisk === "High"
              ? "predictedHigh"
              : ai.predictedRisk === "Medium"
              ? "predictedMedium"
              : "predictedLow";

          return (
            <div className="patient-box" key={i}>
              <div className="title">{p.name}</div>
              <div className="info-grid">
                <div className="info"><strong>Current:</strong> {p.risk}</div>
                <div className={`info ${riskClass}`}><strong>Predicted:</strong> {ai.predictedRisk}</div>
                <div className="info"><strong>Recovery Score:</strong> {ai.recoveryScore}%</div>
                <div className="info"><strong>Doctor:</strong> {p.doctor}</div>
                <div className="info"><strong>Medicine:</strong> {p.medicine}</div>
                <div className="info"><strong>Immunity:</strong> {p.immunity}</div>
                <div className="info"><strong>Awareness:</strong> {p.awareness.join(", ")}</div>
                <div className="info"><strong>Symptoms:</strong> {p.symptoms}</div>
                <div className="info"><strong>Admit:</strong> {p.admit}</div>
                <div className="info"><strong>Discharge:</strong> {p.discharge}</div>
                <div className="info"><strong>Days:</strong> {daysBetween(p.admit, p.discharge)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
        <div className="chart-section">
            <div className="chart-row">
        <div className="chart-container">
          <h4>Doctor Recovery Performance</h4>
          <canvas id="doctorChart"></canvas>
        </div>

        <div className="chart-container">
          <h4>Medicine Effectiveness</h4>
          <canvas id="medicineChart"></canvas>
        </div>
        </div>

        <div className="chart-row">
        <div className="chart-container">
          <h4>Immunity Levels</h4>
          <canvas id="immunityChart"></canvas>
        </div>

        <div className="chart-container">
          <h4>Awareness Score</h4>
          <canvas id="awarenessChart"></canvas>
        </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Recovery;
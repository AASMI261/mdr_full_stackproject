import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientManagementPage.css";

function PatientDetailsPage() {
  const navigate = useNavigate();
const [patientData, setPatientData] = useState({});

useEffect(() => {
  fetch("http://localhost:5000/patientdetails")
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        setPatientData(data[0]); // First patient load
      }
    })
    .catch((err) => console.error("Error fetching patients:", err));
}, []);

/* ================= COMPONENT ================= */


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  try {
    const response = await fetch("http://localhost:5000/patientdetails", {
  method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });

    const result = await response.json();
    console.log("Saved:", result);
    alert("Patient details saved successfully!");
    navigate("/Home");

  } catch (error) {
    console.error("Error saving patient:", error);
    alert("Error saving patient");
  }
};
if (!patientData) return <p>Loading...</p>;
  return (
    <div className="details-container">
      <h2>Patient Details</h2>

      <div className="details-grid">
        {Object.entries(patientData).map(([key, value]) => (
          key !== "patientId" && (
            <label key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1")}:</strong>

              {key === "pastHistory" || key === "antibioticHistory" ? (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={
                    key.includes("Date") ? "date" :
                    key === "age" || key === "immunity" ? "number" :
                    "text"
                  }
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              )}
            </label>
          )
        ))}
      </div>

      <div className="button-row">
        <button onClick={() => navigate("/Home")}>Cancel</button>
        <button onClick={handleSave}>Save Patient</button>
      </div>
    </div>
  );
}

export default PatientDetailsPage;

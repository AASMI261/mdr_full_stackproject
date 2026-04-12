import "./Home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Notification from "./Notification";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

function Home() {

  useEffect(() => {
  fetch("http://localhost:5000/patients")
    .then(res => res.json())
    .then(data => setRows(data))
    .catch(err => console.error("Error fetching patients:", err));
}, []);

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showMicPopup, setShowMicPopup] = useState(false);
  const [patientText, setPatientText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("hi-IN");

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const startMicTranslation = () => {
    setShowMicPopup(true);
    setPatientText("");
    setTranslatedText("");

    const speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
      "use your own azure key(translater)",
      "azure key region"
    );

    speechConfig.speechRecognitionLanguage = language;
    speechConfig.addTargetLanguage("en");

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.TranslationRecognizer(
      speechConfig,
      audioConfig
    );

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === SpeechSDK.ResultReason.TranslatedSpeech) {
        const original = result.text;
        const english = result.translations.get("en");

        setPatientText(original);
        setTranslatedText(english);
        speakEnglish(english);
      }
      recognizer.close();
    });
  };

  const speakEnglish = (text) => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
          "use your own azure key(translater)",
      "azure key region"
    );

    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(text);
  };
   
 const [rows, setRows] = useState([]);
  
    // Add Row
    const addRow = () => {
      const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
      const newRow = {
        id: newId,
        name: "New Patient",
        pid: String(100 + newId),
        ward: "",
        status: "Unknown",
        mdr: "Low",
        admit: new Date().toISOString().slice(0, 10)
      };
      setRows(prev => [...prev, newRow]);
    };
  

  return (
    <div
      style={{
        marginLeft: isSidebarOpen ? "280px" : "0",
        transition: "margin-left 0.3s",
      }}
    >
      <div
        className="app-root"
        style={{ marginLeft: isSidebarOpen ? "20px" : "0" }}
      >
        <Sidebar isOpen={isSidebarOpen} />

        <div className="header-content">
          <button className="hamburger-btn" onClick={handleSidebar}>
            ☰
          </button>

          <div className="home-container">
            <div className="header">
              <h1>Patient Management</h1>
            </div>

            <div className="boxes-container">
  <div className="role-box">
    <div className="role-label" data-count="45">Total MDR Positive</div>
  </div>

  <div className="role-box">
    <div className="role-label" data-count="30">Suspected Cases</div>
  </div>

  <div className="role-box">
    <div className="role-label" data-count="25">Active Alerts</div>
  </div>

  <div className="role-box">
    <div className="role-label" data-count="17">Contact Tracing Alert</div>
  </div>
</div>


            <div className="header-right">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ marginRight: "10px", padding: "6px" }}
              >
                <option value="hi-IN">Hindi</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
              </select>

              <span
                className="call-icon-box"
                onClick={startMicTranslation}
                title="Start Voice Translation"
              >
                🎤
              </span>

              <Notification />

              <button className="add-btn" onClick={() => navigate("/details")}>
                + Add Patient
              </button>
            </div>

            <div className="search-filters">
              <input type="text" placeholder="Search by Name or ID" />
              <input type="text" placeholder="Search by Ward" />
            </div>

            <table className="patient-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Ward / Room</th>
                  <th>Status</th>
                  <th>MDR</th>
                  <th>Admit Date</th>
                  <th>Update</th>
                </tr>
              </thead>
                  <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.ward}</td>
                  <td>{r.status}</td>
                  <td>{r.mdr}</td>
                  <td>{r.admit}</td>
                  <td>
                    <button className="update-btn" onClick={() => navigate("/details", { state: { patient: r } })}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>

      {showMicPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            width: "350px",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            zIndex: 9999
          }}
        >
          <h3 style={{ color: "#0d6efd" }}>🎤 Live Patient Translation</h3>

          <p><strong>Patient Said:</strong></p>
          <div style={{ background: "#f1f1f1", padding: "8px" }}>
            {patientText || "Listening..."}
          </div>

          <p style={{ marginTop: "10px" }}><strong>Translated (English):</strong></p>
          <div style={{ background: "#e7f1ff", padding: "8px" }}>
            {translatedText || "Waiting for translation..."}
          </div>

          <button
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "8px",
              background: "#0d6efd",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={() => setShowMicPopup(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";

export default function SuspectDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Voice Bot states
  const [listening, setListening] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [step, setStep] = useState(1);
  const [allAnswers, setAllAnswers] = useState([]);
   const [suspects, setSuspects] = useState([]);
const [selectedConversation, setSelectedConversation] = useState([]);
const [selectedSuspect, setSelectedSuspect] = useState(null);
useEffect(() => {
  fetch("http://localhost:5000/api/suspects")
    .then(res => res.json())
    .then(data => {
      console.log("API DATA:", data);   // 👈 ADD THIS
      setSuspects(data);
    })
    .catch(err => console.error(err));
}, []);

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // 🔊 AI SPEAK (browser)
  const speak = (text, callback) => {
    const synth = window.speechSynthesis;

    const speakNow = () => {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = "en-US";
      msg.rate = 0.9;

      msg.onend = () => {
        if (callback) callback(); // bolne ke baad mic on
      };

      synth.speak(msg);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = speakNow;
    } else {
      speakNow();
    }
  };

  // 🎤 USER VOICE → TEXT
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);
    recognition.start();

      recognition.onresult = async (event) => {
  const text = event.results[0][0].transcript;

  setAnswerText(text);

  const question = getQuestion();

  try {
    await fetch("http://localhost:5000/api/suspects/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suspect_id: selectedSuspect || "S-001",  // dynamic suspect
        question: question,
        answer: text
      })
    });
  } catch (err) {
    console.error("Error saving conversation:", err);
  }

  setListening(false);

  setStep(prev => prev + 1);
};

    recognition.onerror = () => setListening(false);
  };

  const getQuestion = () => {
    if (step === 1) return "Hello, Please describe your symptoms.";
    if (step === 2) return "Since when are you feeling this?";
    if (step === 3) return "Do you have breathing difficulty?";
    return "Thank you for your response.";
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

          <div className="page">
            {/* HEADER */}
            <header className="header">
              <h1>Suspect Monitoring Dashboard</h1>
              <input className="search" placeholder="Search..." />
              <div className="profile"></div>
            </header>

            {/* 🔹 VOICE BOT CARD (UPDATED LOGIC ONLY) */}
            <div className="card blue voice-card">
              <h3>AI Voice Call – Symptom Check</h3>

              <p>
                <b>Bot Question:</b> {getQuestion()}
              </p>

              <button
                onClick={() =>
                  speak(getQuestion(), startListening)
                }
                disabled={listening}
              >
                {listening ? "Listening..." : "Answer by Voice"}
              </button>

              {answerText && (
                <>
                  <h4>Converted Text:</h4>
                  <p className="answer-text">{answerText}</p>
                </>
              )}
            </div>
            {/* 📝 SAVED VOICE ANSWERS */}
{allAnswers.length > 0 && (
  <div className="card" style={{ marginTop: "20px" }}>
    <h3>Saved Voice Responses</h3>

    {allAnswers.map((item, index) => (
      <div
        key={index}
        style={{
          background: "#f5f7ff",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      >
        <p><b>Q:</b> {item.question}</p>
        <p><b>A:</b> {item.answer}</p>
        <small>⏰ {item.time}</small>
      </div>
    ))}
  </div>
)}


            {/* SUMMARY CARDS */}
            <div className="cards">
              <div className="card yellow"><p>Suspected</p><h2>19</h2></div>
              <div className="card green"><p>Contacted</p><h2>8</h2></div>
              <div className="card red"><p>Pending</p><h2>2</h2></div>
              <div className="card blue"><p>Total Cases</p><h2>25</h2></div>
            </div>

            {/* TABLE */}
            <div className="tableBox">
              <h3>Suspect List</h3>
              <table>
                <thead>
                  <tr>
                    <th>Suspect ID</th>
                    <th>Suspect Name</th>
                    <th>Contact No</th>
                    <th>Patient ID</th>
                    <th>Relation</th>
                    <th>Suspected Source</th>
                    <th>Timestamp</th>
                    <th>Answered?</th>
                    <th>Symptoms?</th>
                    <th>Details</th>
                  </tr>
                </thead>
               <tbody>
  {suspects.map((suspect, index) => (
    <tr key={index}>
      <td>{suspect.suspect_id}</td>
      <td>{suspect.name}</td>
      <td>{suspect.contact}</td>
      <td>{suspect.patient_id}</td>
      <td>{suspect.relation}</td>
      <td>{suspect.source}</td>
           <td>
        {suspect.timestamp
          ? new Date(suspect.timestamp).toLocaleString()
          : ""}
      </td>
      <td>{suspect.answered}</td>
      <td>{suspect.symptoms}</td>
      <td>
        <button
           onClick={async () => {
  setSelectedSuspect(suspect.suspect_id);  // DB column name

  const res = await fetch(
    `http://localhost:5000/api/suspects/conversation/${suspect.suspect_id}`
  );

  const data = await res.json();
  setSelectedConversation(data);

  setShowModal(true);
}}
          style={{
            padding: "4px 10px",
            borderRadius: "6px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer"
          }}
        >
          View
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>

            {/* MODAL */}
            {showModal && (
              <div className="modalOverlay" onClick={() => setShowModal(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <h2>Call Details</h2>
                  <p><strong>Call Status:Active</strong> —</p>
                  <p><strong>Duration:1min</strong> —</p>
                   <h3>Conversation History</h3>

{selectedConversation.length === 0 ? (
  <p>No conversation found</p>
) : (
  selectedConversation.map((item, index) => (
    <div key={index} style={{ marginBottom: "10px" }}>
      <p><b>Q:</b> {item.question}</p>
      <p><b>A:</b> {item.answer}</p>
      <hr />
    </div>
  ))
)}
                  <button className="closeBtn" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

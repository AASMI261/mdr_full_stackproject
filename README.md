# 🏥 PathoTrace 
### AI-Powered MDR Infection Tracing & Intelligent Hospital Surveillance System

<p align="left">
  <img alt="Status" src="https://img.shields.io/badge/status-prototype-blue" />
  <img alt="License" src="https://img.shields.io/badge/license-academic-lightgrey" />
  <img alt="Stack" src="https://img.shields.io/badge/stack-React%20%7C%20Node%20%7C%20Postgres%20%7C%20Kafka%20%7C%20Azure-blueviolet" />
</p>

---

## 📖 Overview
**PathoTrace SafeWard** is a scalable, cloud-native healthcare intelligence system designed to **detect, trace, and contain Multidrug-Resistant (MDR) infections** in hospitals.

It combines **real-time data streaming, graph-based contact tracing, and AI-powered multilingual voice interaction** to enable faster outbreak response, improved patient communication, and enhanced infection control workflows.

---

## 🚨 Problem Statement
Hospitals face critical challenges in managing MDR infections:

- ⏱ Manual contact tracing leads to **delayed detection and response**
- 📈 MDR infection rates are **increasing rapidly**
- 🕵️ Silent carriers remain **undetected at admission**
- 🔄 Lack of real-time systems causes **uncontrolled spread**

---

## 💡 Proposed Solution
PathoTrace SafeWard provides a **real-time, automated MDR tracing ecosystem** that:

- Digitizes and automates contact tracing  
- Uses AI for early detection and outbreak analysis  
- Enables voice-based patient interaction  
- Eliminates language barriers with multilingual processing  

---

## ⭐ Key Features

### 🔗 Dynamic Contact Tree Mapping
- Generates **live exposure graphs**
- Tracks:
  - Primary (doctors, nurses)
  - Secondary (staff)
  - Tertiary (visitors)

---

### 🧬 Source Linkage Graph with Timeline
- Identifies **infection origin**
- Builds **timestamped outbreak pathways**
- Highlights weak infection control points

---

### 🎤 Voice-Driven Contact Screening Bot (Contact Tracing Integrated)
- Automatically triggered when exposure is detected
- Calls **primary, secondary, tertiary contacts**
- Collects:
  - Symptoms (fever, cough, etc.)
  - Interaction history
  - Exposure confirmation
- Converts voice → text and stores data
- Provides:
  - Alerts
  - Medical guidance

👉 All responses are **saved in the web system/database**, helping doctors monitor patients and take faster decisions

---

### 🌐 Multilingual AI Communication System
- Accepts input in **regional languages (Gujarati, Hindi, etc.)**
- Performs:
  - Speech-to-text conversion
  - Language detection
  - Translation to English
- Responds back in **patient’s language**

👉 Ensures **inclusive healthcare communication**

---

### 🧠 AI-Based Early Recovery Analysis
- Predicts recovery trends
- Identifies high-risk patients
- Supports early medical decisions

---

## 🏗️ System Architecture

### 🔹 Tech Stack

| Layer            | Technology |
|------------------|-----------|
| Frontend         | React.js |
| Backend          | Node.js |
| Database         | PostgreSQL (Neon) |
| Real-Time Stream | Apache Kafka |
| Voice Bot        | Twilio + Azure Speech-to-Text |
| AI Services      | Azure Cognitive Services |

---

### 🔹 High-Level Flow

---

## 🔄 Workflow

1. Patient speaks in any language  
2. Speech converted to text  
3. Language detected & translated to English (to understand the doctor)
4. AI processes symptoms
5. Saves the patient data
6. Contact tracing graph updates
7. source linkage graph update 
8. Voice bot calls exposed individuals  
9. Responses stored in database  
10. Doctors access data via web system  

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL / Neon
- Apache Kafka
- Twilio Account
- Azure Speech & Cognitive Services

---

### Installation

```bash
https://github.com/AASMI261/mdr_full_stackproject.git
cd temp/temp/Aasmi
npm install

.env
PORT=5000
DATABASE_URL=your_postgres_url
TWILIO_SID=your_sid
TWILIO_AUTH=your_auth_token
AZURE_SPEECH_KEY=your_key
AZURE_REGION=your_region

Run Project
npm start
```

### Feasibility
Real-time tracking using streaming systems
Mature AI and NLP technologies
Scalable cloud deployment
Easy API integration with hospital systems

### Challenges
Data privacy (HIPAA, GDPR)
Integration with hospital systems
Handling accents and languages
Avoiding false positives
Infrastructure cost
### Impact
Faster outbreak detection
Real-time infection tracking
Reduced manual workload
Early detection of silent carriers
### Benefits
Reduces MDR spread
Improves patient safety
Saves time and resources
Supports scalable deployment
Builds trust with stakeholders
###Future Enhancements
Doctor/Admin dashboard
Advanced ML predictions
Wearable device integration
Advanced visualization

import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const DoctorTranslationPage = () => {
  const [status, setStatus] = useState("Click microphone to start");

  const startTranslation = async () => {
    setStatus("Listening to patient...");

    const speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(
      "YOUR_AZURE_SPEECH_KEY",
      "YOUR_AZURE_REGION"
    );

    // Patient language (example: Gujarati)
    speechConfig.speechRecognitionLanguage = "gu-IN";

    // Translate to English
    speechConfig.addTargetLanguage("en");

    // English voice output
    speechConfig.voiceName = "en-US-JennyNeural";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

    const translator = new SpeechSDK.TranslationRecognizer(
      speechConfig,
      audioConfig
    );

    translator.recognizeOnceAsync(result => {
      if (result.reason === SpeechSDK.ResultReason.TranslatedSpeech) {
        setStatus("Translation completed");

        const englishText = result.translations.get("en");

        // Speak translated English voice
        const speakerConfig = SpeechSDK.SpeechConfig.fromSubscription(
          "YOUR_AZURE_SPEECH_KEY",
          "YOUR_AZURE_REGION"
        );
        speakerConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

        const synthesizer = new SpeechSDK.SpeechSynthesizer(speakerConfig);
        synthesizer.speakTextAsync(englishText);
      } else {
        setStatus("Could not recognize speech");
      }

      translator.close();
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Doctor Voice Translator</h1>

      <button style={styles.micButton} onClick={startTranslation}>
        🎤
      </button>

      <p style={styles.status}>{status}</p>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#0a58ca",
    marginBottom: "40px"
  },
  micButton: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#0d6efd",
    color: "#ffffff",
    fontSize: "40px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
  },
  status: {
    marginTop: "30px",
    color: "#0a58ca",
    fontSize: "18px"
  }
};

export default DoctorTranslationPage;

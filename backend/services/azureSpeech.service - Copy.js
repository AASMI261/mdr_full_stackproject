const sdk = require("microsoft-cognitiveservices-speech-sdk");

const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.AZURE_KEY,
  process.env.AZURE_REGION
);

function speechToText(audioFilePath) {
  const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFilePath);
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizeOnceAsync(result => {
    console.log("TEXT:", result.text);
  });
}

module.exports = { speechToText };

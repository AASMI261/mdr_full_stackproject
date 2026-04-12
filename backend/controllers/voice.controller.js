const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfmpegPath(ffmpegPath);

exports.speechToText = async (req, res) => {
  try {
    if (!req.files || !req.files.audio) {
      return res.json({ text: "No audio received" });
    }

    const inputPath = path.join(__dirname, `input_${Date.now()}.webm`);
    const outputPath = path.join(__dirname, `output_${Date.now()}.wav`);

    await req.files.audio.mv(inputPath);

    ffmpeg(inputPath)
      .audioChannels(1)
      .audioFrequency(16000)
      .audioCodec("pcm_s16le")
      .format("wav")
      .save(outputPath)
      .on("end", async () => {
        try {
          const speechConfig = sdk.SpeechConfig.fromSubscription(
            process.env.AZURE_SPEECH_KEY,
            process.env.AZURE_SPEECH_REGION
          );

          speechConfig.speechRecognitionLanguage = "en-US";

          // ✅ CORRECT WAY (BUFFER)
           const pushStream = sdk.AudioInputStream.createPushStream();

const wavBuffer = fs.readFileSync(outputPath);
pushStream.write(wavBuffer);
pushStream.close();

const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

     
              

          recognizer.recognizeOnceAsync(result => {
            console.log("AZURE REASON:", result.reason);
            console.log("AZURE TEXT:", result.text);

            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);

            if (result.reason === sdk.ResultReason.RecognizedSpeech) {
              return res.json({ text: result.text });
            } else {
              return res.json({ text: "Speech not recognized" });
            }
          });
        } catch (err) {
          console.error("AZURE ERROR:", err);
          return res.status(500).json({ text: "Azure failed" });
        }
      })
      .on("error", err => {
        console.error("FFMPEG ERROR:", err);
        return res.status(500).json({ text: "Audio conversion failed" });
      });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ text: "Speech error" });
  }
};

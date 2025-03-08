require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: process.env.Frontend_URL, methods: ["GET", "POST"] }
});

// API Key for Gemini (assuming you have access to Gemini AI endpoints)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("codeUpdate", async (data) => {
    const { code, problemStatement } = data;
    console.log("Analyzing code...");

    // Call the Gemini API to review the code based on the problem statement
    const feedback = await analyzeCodeWithGeminiAI(code, problemStatement);

    // Send back the feedback received from Gemini AI
    io.emit("codeFeedback", { message: feedback });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Function to analyze code with Gemini AI
async function analyzeCodeWithGeminiAI(code, problemStatement) {
  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use "gemini-pro" or other available models.

    const prompt = `Problem: ${problemStatement}\nPartial js Code: ${code}\nAnalyze the partial code and determine whether the partial code is correct till now or need changes,also gives the hints to the next line of code  and give output in 30 words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error analyzing code.";
  }
}

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

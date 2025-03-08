import React, { useState, useEffect, useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import { io } from "socket.io-client";
import Loader from "./components/Loader";
import "./App.css";

const SERVER_URL = "http://localhost:5000";

function App() {
  const [socket, setSocket] = useState(null);
  const [problemStatement, setProblemStatement] = useState("");
  const [userCode, setUserCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const feedbackTimeout = useRef(null);
  const [displayedFeedback, setDisplayedFeedback] = useState(""); // Typing effect text


  useEffect(() => {
    // Simulate loading delay (e.g., fetching data, setting up WebSocket)
    setTimeout(() => setLoading(false), 2500);

    const newSocket = io(SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to server:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.warn("⚠️ Disconnected from server. Retrying...");
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ WebSocket Connection Error:", error.message);
    });

    newSocket.on("codeFeedback", (data) => {
      setFeedback(data.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const simulateTyping = (text) => {
    setDisplayedFeedback(""); // Clear previous text
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedFeedback((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 5); // Adjust speed of typing effect
  };
  // Handle code change and send to backend after 1-minute delay
  const handleCodeUpdate = (code) => {
    setUserCode(code);

    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }

    feedbackTimeout.current = setTimeout(() => {
      if (socket) {
        socket.emit("codeUpdate", { code, problemStatement });
      }
    }, 0.5 * 60 * 1000); // 30-second delay
  };

  if (loading) return <Loader />; // Show loader until app is ready

  return (
    <div className="app-container">
      <h1 className="app-title">Real-Time Code Guidance</h1>

      {/* Split-Screen Layout */}
      <div className="split-container">
        {/* Left Panel: Problem Statement & AI Feedback */}
        <div className="left-panel">
        <h3 className="ps-title">Problem Statement</h3>
          <textarea
            rows="6"
            placeholder="Enter your problem statement here..."
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            className="problem-input"
          ></textarea>

          <h2 className="feed">AI Feedback:</h2>
          <div className="feedback-box">
            <p>{feedback || "Start typing to receive feedback..."}</p>
          </div>
        </div>

        {/* Right Panel: Code Editor */}
        <div className="right-panel">
        <h2 className="code-editor-title"> Code Editor</h2>
          <CodeEditor onCodeChange={handleCodeUpdate} />
        </div>
      </div>
    </div>
  );
}

export default App;

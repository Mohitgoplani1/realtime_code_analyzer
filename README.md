Real-Time Code Analyzer

📌 Overview

The Real-Time Code Analyzer is a web-based tool that allows users to input a problem statement, write code in an embedded editor, and receive real-time AI-powered feedback on their code. The system evaluates whether the code aligns with the given problem statement and provides guidance as the user types.

🚀 Features

Real-Time Code Analysis: Get instant AI feedback as you write code.

Split-Screen Layout: Problem statement & AI feedback on the left, code editor on the right.

WebSocket Integration: Ensures real-time communication between the frontend and backend.

Monaco Code Editor: A powerful code editor with syntax highlighting.

Loading Screen: A hacker-style loading animation when the app starts.

Typing Effect in AI Feedback: Simulates AI typing the response for a better user experience.

🛠️ Tech Stack

Frontend

React.js

Monaco Editor (for code editing)

WebSockets (Socket.io)

Tailwind CSS (for styling)

Backend

Node.js with Express

Socket.io (for real-time communication)

OpenAI API / Gemini API (for AI-based code analysis)

📦 Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/Mohitgoplani1/realtime-code-analyzer.git
cd realtime-code-analyzer

2️⃣ Install dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install

3️⃣ Set up OpenAI/Gemini API Key

Create a .env file in the backend folder and add:

OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

4️⃣ Start the development servers

Backend

cd backend
npm start

Frontend

cd frontend
npm start

🎮 Usage

Enter a problem statement in the left panel.

Write your code in the Monaco Editor on the right.

AI feedback will appear in real-time as you type.

🎨 UI Preview

Loading Animation (Before the app loads)

Split-Screen Layout

Typing Effect for AI Feedback

🤝 Contributing

Feel free to open issues and submit pull requests. Contributions are always welcome! 🎉

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

📬 Contact

For any questions or suggestions, reach out via email at your-email@example.com.


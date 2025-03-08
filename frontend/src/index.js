import React from "react";
import ReactDOM from "react-dom/client";  // Change this import

import App from "./App";

// Create the root element for React to manage
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App using the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

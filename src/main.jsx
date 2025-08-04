import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Force wait before hiding loader
setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
}, 1000); // adjust the delay as needed

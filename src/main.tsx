import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (import.meta.env.VITE_GITHUB_TOKEN === 'development') {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

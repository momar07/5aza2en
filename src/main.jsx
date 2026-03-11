import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import "./i18n/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// ✅ أخفِ الـ inline loader فور ما React يكمل أول render
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    if (typeof window.__hideInlineLoader === "function") {
      window.__hideInlineLoader();
    }
  });
});

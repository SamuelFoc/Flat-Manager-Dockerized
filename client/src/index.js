import React from "react";
import ReactDOM from "react-dom/client";
// * Components
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// TODO: CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./pages/styles/SharedStyles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </div>
);

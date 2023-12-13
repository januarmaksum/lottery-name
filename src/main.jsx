import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demosatu from "./pages/Demosatu";
import Demotiga from "./pages/Demotiga";
import Demodua from "./pages/Demodua";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Demosatu />} />
      <Route path="/demo-2" element={<Demodua />} />
      <Route path="/demo-3" element={<Demotiga />} />
    </Routes>
  </Router>
);

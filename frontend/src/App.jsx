import React from "react";
import Home from "./components/pages/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedbacks from "./components/pages/Feedbacks";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedbacks />} />
      </Routes>
    </Router>
  );
};

export default App;

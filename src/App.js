
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Cells from "./pages/cells";
import RegisterCells from "./pages/RegisterCells";
import Assignment from "./pages/assignment";
import Attendance from "./pages/attendance";
import Class from "./pages/class";
import Facilitator from "./pages/facilitator";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cells" element={<Cells />} />
        <Route path="/RegisterCells" element={<RegisterCells />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/class" element={<Class />} />
        <Route path="/facilitator" element={<Facilitator />} />
      
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}

export default App;

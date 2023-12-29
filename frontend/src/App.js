import { useEffect } from "react";
import './App.css';
import axios from "axios";
import Home from "./pages/Home/homepage";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
};

const MainLayout = () => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}


export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login here
  };
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
        </header> */}
          <Routes>
            <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
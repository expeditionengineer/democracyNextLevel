import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CreateEvent from './CreateEvent';
import IotDeviceMap from './iotDeviceLocation';

import News from './pages/News';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
            <Route path="/" element={<Layout />}>
              <Route index element={!token ? <Login /> : <Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/iotdevices" element={<IotDeviceMap />} />
              <Route path="/news" element={<News />} />
            </Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
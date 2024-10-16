import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Registration from './pages/Registration';
import WorkshopSignup from './pages/WorkshopSignup';
import WorkshopSignupLegalInformation from './pages/WorkshopSignupLegalInformation';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CreateEvent from './CreateEvent';
import CreateContent from './pages/CreateContent';
import CreateProposal from './pages/CreateProposal';
import IotDeviceMap from './iotDeviceLocation';
import NoPage from "./pages/NoPage";
import News from './pages/News';
import DisplaySlideshow from './pages/DisplaySlideshow';
import CreateDebateCard from './pages/CreateDebateCard';

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
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={!token ? <Login /> : <Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/create-content" element={<CreateContent />} />
          <Route path="/iotdevices" element={<IotDeviceMap />} />
          <Route path="/news" element={<News />} />
          <Route path="/create-proposal" element={<CreateProposal />} />
          <Route path="/create-debate-card" element={<CreateDebateCard />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/display-slideshow" element={<DisplaySlideshow />} />
        <Route path="/dialog-based-conflict-resolution" element={<WorkshopSignup workshopVariant={1} />} />
        <Route path="/the-eye-the-game" element={<WorkshopSignup workshopVariant={2} />} />
        <Route path="/legal" element={<WorkshopSignupLegalInformation />} />
        //<Route path="*" element={<Navigate to="/dialog-based-conflict-resolution" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

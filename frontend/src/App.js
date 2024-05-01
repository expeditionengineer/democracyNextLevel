import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login here
  };

  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
        </header> */}
          <Routes>
            <ProtectedRoute path="/protected" />            
            <Route path="/signup" element={<Signup />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
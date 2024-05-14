// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup here
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/',
        {
            "username": username,
            "password1": password,
            "password2": password,
            "email": email,
            "group": role
        }
    )
  };

return (
    <form onSubmit={handleSignup}>
        <div>
            <label>
                Username:
                <input type="text" value={username} id="username" onChange={e => setUsername(e.target.value)} required />
            </label>
        </div>
        <div>
            <label>
                E-Mail:
                <input type="email" value={email} id="email" onChange={e => setEmail(e.target.value)} required />
            </label>
        </div>
        <div>
            <label>
                Role:
                <select value={role} id="groupSelection" onChange={e => setRole(e.target.value)} required>
                    <option value="Creator">Creator</option>
                    <option value="Messenger">Messenger</option>
                    <option value="Voter">Voter</option>
                    <option value="User">User</option>
                </select>
            </label>
        </div>
        <div>
            <label>
                Password:
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
        </div>
        <div>
            <input type="submit" id="submit" value="Sign Up" />
        </div>
    </form>
);
}

export default Signup;
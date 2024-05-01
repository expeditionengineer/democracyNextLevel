// Signup.js
import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup here
    axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/',
        {
            "username": username,
            "password1": password,
            // "password2": "newpassword",
            "email": email,
            "role": role
        }
    )
  };

return (
    <form onSubmit={handleSignup}>
        <div>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
        </div>
        <div>
            <label>
                E-Mail:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
        </div>
        <div>
            <label>
                Role:
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="creator">Creator</option>
                    <option value="messenger">Messenger</option>
                    <option value="voter">Voter</option>
                    <option value="user">User</option>
                </select>
            </label>
        </div>
        <div>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
        </div>
        <div>
            <input type="submit" value="Sign Up" />
        </div>
    </form>
);
}

export default Signup;
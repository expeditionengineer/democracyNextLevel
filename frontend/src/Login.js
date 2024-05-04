import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/dj-rest-auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad request');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.key);
            navigate('/');
        })
        .catch(error => {
            setError(error.message);
        });
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            {error && <div>{error}</div>}
            <input type="submit" value="Login" />
        </form>
    );
}

export default Login;
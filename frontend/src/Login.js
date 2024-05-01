import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/dj-rest-auth/login/', {
            username: username,
            password: password
        })
        .then(response => {
            // Save the token in local storage
            localStorage.setItem('token', response.data.key);
        })
        .catch(error => {
            // Handle error
            console.error('There was an error!', error);
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
            <input type="submit" value="Login" />
        </form>
    );
}

export default Login;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        else {
            // Fetch user data
            fetch('http://127.0.0.1:8000/dj-rest-auth/user/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                // Do something with user data
                setUser(data.username);
                console.log(data);
            })
            .catch(error => console.error(error));

            fetch('http://127.0.0.1:8000/events', {
                headers: {
                'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => setEvents(data))
            .catch(error => console.error(error));
        }
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            <h3>Hi, {user}! </h3>
            <p>You are currently in the </p>
            {events.map(event => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
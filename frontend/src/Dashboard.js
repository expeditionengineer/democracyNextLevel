import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

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
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
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
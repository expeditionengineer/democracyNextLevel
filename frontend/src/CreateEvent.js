import React, { useState } from 'react';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = 'http://127.0.0.1:8000/events/create';

        const event = {
            // Fill in your event data here
            title: title,
            description: description,
            dateTime: dateTime,
            location: location,
        };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });    };

    const [location, setLocation] = useState('');

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    
    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="dateTime">Date and Time:</label>
                    <input
                        type="datetime-local"
                        id="dateTime"
                        value={dateTime}
                        onChange={handleDateTimeChange}
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={handleLocationChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateEvent;
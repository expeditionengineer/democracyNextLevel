import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Calendar } from 'primereact/calendar';

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [eventText, setEventText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const navigate = useNavigate(); // Initialize the hook
  
  const sendNewsObjToBackend = () => {
  const token = localStorage.getItem('token');
  
  const formData = new FormData();
  formData.append('heading', title);
  formData.append('text', newsText);
  formData.append('image', file);  // Append the image as a file

  fetch("http://127.0.0.1:8000/news/", {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
    },
    body: formData,  // Send FormData object
    dataType: "jsonp"
  }).then(
    response => {
      if (!response.ok) {
        throw new Error('Bad request');
      } else {
        navigate("/dashboard");
      }
    }
  ).catch(error => {
    console.error('There was an error:', error);
  });
};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>Create a Event</h1>
      <div style={{display: 'flex', flexDirection: 'column', margin: '50px', width: '900px'}}> 
        <input id="eventTitle" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}  />
        <input id="eventDescription" type="text" placeholder="Event description" onChange={(e) => {setEventText(e.target.value)}} />
        <Calendar value={datetime12h} onChange={(e) => setStartDateTime(e.value)} showTime hourFormat="12" />
        <Calendar value={datetime12h} onChange={(e) => setEndDateTime(e.value)} showTime hourFormat="12" />
        <label>Upload a image: </label>
        <input type="file" id="imageInput" onChange={(e) => {
          console.log(e.target.files);
          setImage(URL.createObjectURL(e.target.files[0]));
          setFile(e.target.files[0]);
        }} />
        <img src={image} />
        <input type="submit" onClick={sendNewsObjToBackend} /> 
      </div>
    </div>
  )
}
export default CreateEvent;

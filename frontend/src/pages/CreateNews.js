import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [newsText, setNewsText] = useState("");
  const navigate = useNavigate(); // Initialize the hook
  
  const sendNewsObjToBackend = () => {
    const token = localStorage.getItem('token')
    fetch("http://127.0.0.1:8000/news/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        heading: title,
        text: newsText,
      })
    }).then(
      response => {
        if (!response.ok) {
          throw new Error('Bad request');
        }
        else {
          navigate("/news");
        }
      }
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>Create a news</h1>
      <div style={{display: 'flex', flexDirection: 'column', margin: '50px', width: '900px'}}> 
        <input id="newsTitle" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}  />
        <input id="newsText" type="text" placeholder="News Text" onChange={(e) => {setNewsText(e.target.value)}} />
        <input type="submit" onClick={sendNewsObjToBackend} /> 
      </div>
    </div>
  )
}
export default CreateNews;

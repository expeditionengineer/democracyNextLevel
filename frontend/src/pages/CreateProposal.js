import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Form from 'react-bootstrap/Form';

import CreateNews from '../components/CreateNews';
import CreateEvent from '../components/CreateEvent';

const CreateProposal = () => {
  const [title, setTitle] = useState("");
  const [newsText, setNewsText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState("");
  const navigate = useNavigate(); // Initialize the hook
  
  const [proposalType, setProposalType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);


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
        navigate("/news");
      }
    }
  ).catch(error => {
    console.error('There was an error:', error);
  });
};

  return (
    <>
      <div id="step1">
        <Form.Select aria-label="Default select example" onChange={(e) => { setProposalType(e.target.value); }}>
          <option>Open this select menu</option>
          <option value="News">News</option>
          <option value="Event">Event</option>
          <option value="Actors">Actors</option>
          <option value="Projects">Projects</option>
        </Form.Select>
      </div>
      {proposalType === "News" ? <CreateNews /> : null} 
      {proposalType === "Event" ? <CreateEvent /> : null} 
    </>
  )
}
export default CreateProposal;

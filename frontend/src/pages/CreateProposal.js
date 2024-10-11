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

  const [proposals, setProposals] = useState([]);

  const fetchAllProposals = () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/proposals", {
        method: "GET",
        headers {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        setProposals(json)
      }
    } catch (error) {
      console.error("Error when fetching proposals", error);
    }
  }

  const fetchAllProposals = () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "GET",
        headers {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      })
      if (response.ok) {
        const json = await response.json();
        setProposals(json)
      }
    } catch (error) {
      console.error("Error when fetching proposals", error);
    }
  }

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
        <Form.Group className="mb-3" controlId="selectPropososalCategory">
          <Form.Label style={{fontSize: "20px"}}>Select a proposal category:</Form.Label>  
          <Form.Select aria-label="Default select example" onChange={(e) => { setProposalType(e.target.value); }}>
            <option>Open this select menu</option>
            <option value="News">News</option>
            <option value="Event">Event</option>
            <option value="Actors">Actors</option>
            <option value="Projects">Projects</option>
          </Form.Select>
        </Form.Group>
      </div>
      {proposalType === "News" ? <CreateNews /> : null} 
      {proposalType === "Event" ? <CreateEvent proposals={proposals} /> : null} 
    </>
  )
}
export default CreateProposal;

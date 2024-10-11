import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Calendar } from 'primereact/calendar';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

const CreateEvent = ({ proposals, usernames }) => {
  const [title, setTitle] = useState("");
  const [eventText, setEventText] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [locationEvent, setLocationEvent] = useState("");
  
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEMail] = useState("");
  const [organizerPhone, setOrganizerPhone] = useState("");
  
  const [tags, setTags] = useState([]);
  const [tagsFetched, setTagsFetched] = useState(false);

  const navigate = useNavigate(); // Initialize the hook
  
  const sendNewsObjToBackend = () => {
  const token = localStorage.getItem('token');
  
  const formData = new FormData();
  formData.append('heading', title);
  formData.append('text', eventText);
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
  
  useEffect(() => {
    const loadTags = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/tags",
          {
            method: "GET",
            headers: {
              'Authorization': `Token ${token}`
            }
          })
        if (response.ok) {
          const data = await response.json();
          setTags(data);
          setTagsFetched(true);
        }
      } catch (error) {
        console.error("Error while fetching tags ", error)
      }
    }
    loadTags();
  }, []);
  
  const sendTagData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/tags/", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Token ${token}`,
          },
          body: JSON.stringify({
            name: tagName
          })
        }
      )
      if (response.ok) {
        setShow(false);
        const json = await response.json()
        const idsOfTags = tags.map((item, index) => {return(item.id)})
        if (!idsOfTags.includes(json.id)) {
          var copyOfTagsArray = [...tags];
          copyOfTagsArray.push(json);
          setTags(copyOfTagsArray);
        }
        debugger;
        var optionElement = document.createElement("option");
        optionElement.text = json.name;
        optionElement.value = json.id;
        const selectDOMelement = document.getElementById("tagsSelect")
      }
    } catch (error) {
      console.error("Error while POST to tags: ", error)
    }
  } 

  const [show, setShow] = useState(false);
  const [tagName, setTagName] = useState("");
  const handleClose = () => { setShow(false) };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>Create a Event</h1>
      <div style={{display: 'flex', flexDirection: 'column', margin: '50px', width: '900px'}}> 
        <Form.Group>
          <Form.Label>Event title:</Form.Label>
          <Form.Control id="eventTitle" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}  />
        </Form.Group>
        <Form.Group style={{marginTop: "20px"}}>
          <Form.Label>Description of the event:</Form.Label>
          <Form.Control type="text" rows={5} placeholder="Event description" onChange={(e) => {setEventText(e.target.value)}} />
        </Form.Group>
        
        <Form.Group style={{ marginTop: "20px" }}>
          <Form.Label>Date and time:</Form.Label>
          <Calendar placeholder="Start Date and time" value={startDateTime} panelStyle={{ backgroundColor: "white" }} onChange={(e) => setStartDateTime(e.value)} showIcon showTime hourFormat="12" />
          <Calendar value={endDateTime} placeholder="End date and time" panelStyle={{ backgroundColor: "white" }} onChange={(e) => setEndDateTime(e.value)} showIcon showTime hourFormat="12" />
        </Form.Group>
        
        <Form.Group style={{ marginTop: "20px" }}>
          <Form.Label>Location: </Form.Label>
          <Form.Control type="text" placeholder="location" onChange={(e) => setLocationEvent(e.target.value)} /> 
        </Form.Group>

        <Form.Group style={{ marginTop: "20px" }}>
          <Form.Label>Organizer: </Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(e) => setOrganizerName(e.target.value)} /> 
          <Form.Control type="email" placeholder="E-Mail" onChange={(e) => setOrganizerEMail(e.target.value)} /> 
          <Form.Control type="number" placeholder="Phone" onChange={(e) => setOrganizerPhone(e.target.value)} /> 
        </Form.Group>
        
        <Form.Group style={{ marginTop: "20px" }}>
          <Form.Label>Upload a image: </Form.Label>
          <Form.Control type="file" onChange={(e) => {
            setImage(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
          }} />
        <img src={image} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Select a tag: </Form.Label>
            <Form.Select id="tagsSelect">
              {tagsFetched ? tags.map((item, index) => {return (
              <option value={item.id}>{item.name}</option>
            )}): null}
          </Form.Select>
          <Button onClick={() => {setShow(true);}}>Create Tag</Button>
        </Form.Group>
        <Form.Group>
          <Form.Label>Verlinken Sie ihre Karte mit einer anderen Vorschlagskarte (Maximal eine andere Karte, optional): </Form.Label>
            <Form.Select id="proposalsSelect">
                <option>Vorschlagskarte wählen</option>
                {proposals.map((item, index) => {return (
              <option value={item.id}>{item.title}</option>
            )}): null}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Verlinken Sie ihre Karte mit einem anderen Nutzenden (Maximal 1 Person, optional): </Form.Label>
            <Form.Select id="userSelect">
                <option>Nutzenden wählen</option>
                {usernames.map((item, index) => {return (
              <option value={item.id}>{item.first_name} {item.last_name}</option>
            )}): null}
          </Form.Select>
        </Form.Group>

        <Offcanvas show={show} onHide={handleClose} placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Add tag</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Form.Group>
            <Form.Label>Tag name: </Form.Label>
            <Form.Control type="text" onChange={(e => setTagName(e.target.value))} />
            <Button onClick={sendTagData}>Create tag</Button>
          </Form.Group>
        </Offcanvas.Body>
        </Offcanvas>
        <input type="submit" onClick={sendNewsObjToBackend} /> 
      </div>
    </div>
  )
}
export default CreateEvent;

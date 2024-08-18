import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './Registration.css';
import {postRegistration, fetchCategories} from '../api';





function map(list, func) {
  const result = [];
  for (let item of list) {
    result.push(func(item))
  }
  return result;
}

function ContentChannels({
  contentCategories, selectedContents, selectedNews, selectedEvents, selectedProjects, selectedActors,
  setSelectedNews, setSelectedEvents, setSelectedProjects, setSelectedActors, setSelectedContents
}) {
 
    return (
    <Form.Group className="mb-3">
      <Form.Label>Wähle die Content-Channels aus, in denen du Inhalte erstellen möchtest.</Form.Label>
{
  contentCategories.map((channel, i) => (
    <Form.Switch
      key={i}
      value={channel.name}
      contentId={channel.id}
      label={channel.name}
      onChange={(e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
          setSelectedContents((prevSelectedContents) => [
            ...prevSelectedContents,
            channel.id,
          ]);
        } else {
          setSelectedContents((prevSelectedContents) =>
            prevSelectedContents.filter((id) => id !== channel.id)
          );
        }
      }}
    />
  ))
}
    </Form.Group>
  )
}

function MediaCategories({device, setDevice}, {mediaCategories, setMediaCategories}) {
     
    return (
    <Form.Group className="mb-3">
      <Form.Label>Wähle das Media-Device aus, das du hinzufügen möchtest.</Form.Label>
      <Form.Select value={device} onChange={(e) => setDevice(e.target.value)}>
      {mediaCategories.map(j => (
          <option mediaId={j.id}>{j.name}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

function Interests({interestCategories, setInterests}) {
    
    return (
    <Form.Group className="mb-3">
      <Form.Label>Wähle Interessensschwerpunkte aus, zu denen Du Inhalte erstellen möchtest. (Zum Hinzufügen eines weiteren Punktes zur Auswahl, <kbd>Strg</kbd> beim Auswählen gedrückt halten)</Form.Label>
      <Form.Select multiple={true} onChange={(e) => {setInterests(map(e.target.selectedOptions, i => i.innerText))}}> {/* onchange gets the selected elements before change */}
        {interestCategories.map(i => (
          <option interestId={i.id}>{i.name}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

function Registration() {
  const [status, setStatus] = useState(null); // for server response
  const [validated, setValidated] = useState(false);
  
  const [role, setRole] = useState('Creator');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedNews, setSelectedNews] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState(false);
  const [selectedActors, setSelectedActors] = useState(false);
  const [device, setDevice] = useState('');
  const [picture, setpicture] = useState('');
  const [interests, setInterests] = useState({});
  const [motivation, setMotivation] = useState('');
  const [bots, setBots] = useState([]);
  const [agents, setAgents] = useState([]);

  const [roleFeedback, setRoleFeedback] = useState('Creator');
  const [usernameFeedback, setUsernameFeedback] = useState('');
  const [password1Feedback, setPassword1Feedback] = useState('');
  const [password2Feedback, setPassword2Feedback] = useState('');
  const [nameFeedback, setNameFeedback] = useState('');
  const [streetFeedback, setStreetFeedback] = useState('');
  const [zipFeedback, setZipFeedback] = useState('');
  const [cityFeedback, setCityFeedback] = useState('');
  const [emailFeedback, setEmailFeedback] = useState('');
  const [phoneFeedback, setPhoneFeedback] = useState('');
  const [selectedNewsFeedback, setSelectedNewsFeedback] = useState(false);
  const [selectedEventsFeedback, setSelectedEventsFeedback] = useState(false);
  const [selectedProjectsFeedback, setSelectedProjectsFeedback] = useState(false);
  const [selectedActorsFeedback, setSelectedActorsFeedback] = useState(false);
  const [deviceFeedback, setDeviceFeedback] = useState('');
  const [pictureFeedback, setPictureFeedback] = useState('');
  const [interestsFeedback, setInterestsFeedback] = useState({});
  const [motivationFeedback, setMotivationFeedback] = useState('');
  const [botsFeedback, setBotsFeedback] = useState([]);
  
  const [selectedContents, setSelectedContents] = useState([]);
  const [contentCategories, setContentCategories] = useState([]);
    
  fetchCategories("content-categories").then(data => setContentCategories(data))
  const [mediaCategories, setMediaCategories] = useState([]);
    
  fetchCategories("media-categories").then(data => setMediaCategories(data)) 
  const [interestCategories, setInterestCategories] = useState([]);
  
  
  const [roleCategories, setRoleCategories] = useState([]);
  fetchCategories("roles").then(data => setRoleCategories(data)); 
  
  const [agentCategories, setAgentCategories] = useState([]);
  fetchCategories("agents").then(data => setAgentCategories(data)); 


  const steps = [
    {}, {}, {}, {}, {},
    {
      "Creator": <ContentChannels
        contentCategories={contentCategories}
        selectedContents={selectedContents}
        selectedNews={selectedNews}
        selectedEvents={selectedEvents}
        selectedProjects={selectedProjects}
        selectedActors={selectedActors}
        setSelectedNews={i => setSelectedNews(i)}
        setSelectedEvents={i => setSelectedEvents(i)}
        setSelectedProjects={i => setSelectedProjects(i)}
        setSelectedActors={i => setSelectedActors(i)}
        setSelectedContents={i => setSelectedContents(i)}
      />,
      "Messenger": <MediaCategories mediaCategories={mediaCategories} />
    }, {},
    {
      "Creator": <Interests
        interestCategories={interestCategories}
        setInterests={i => setInterests(i)}
      />,
      "Messenger": null
    }
  ];
  
  const handleRegistration = e => {
    e.preventDefault();
    setValidated(true);
    if (e.currentTarget.checkValidity() === false) {
      return;
    }
    const dataObj = {
      roles: role,
      username: username,
      password1: password1,
      password2: password2,
      first_name: firstName,
      last_name: lastName,
      street: street,
      street_number: streetNumber,
      postal_code: zip,
      city: city,
      email: email,
      phone_number: phone,
      selectedNews: selectedNews,
      selectedEvents: selectedEvents,
      selectedProjects: selectedProjects,
      selectedActors: selectedActors,
      profile_picture: picture,
      content_categories: selectedContents,
      media_categories: device,
      area_of_interest: interests,
      motivation: motivation,
      ai_agent: agents
    };
    postRegistration(dataObj)
    .then(res => {
      setStatus(res);
    })
    .catch(
      err => {
        setStatus(err);
      }
    );
  };
  
  return (
    <main style={{width: "300px"}}>
      <Form onSubmit={handleRegistration} noValidate validated={validated}>
        <Form.Group className="mb-3">
          <Form.Label>Wähle die Rolle, auf die Du Dich bewerben willst</Form.Label>
          <Form.Select value={role} onChange={(e) => {setRole(e.target.roleId); setValidated(false)}}>
            {roleCategories.map(i => (
              <option roleId={i.id}>{i.role}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {roleFeedback}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deinen Namen ein.</Form.Label>
          <Form.Control type="text" placeholder="Vorname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Form.Control type="text" placeholder="Nachname" value={lastName} onChange={(e) => setLastName(e.target.value)} /> 
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deine Wohnadresse ein.</Form.Label>
          <Form.Control type="text" value={street} placeholder="Straße" onChange={(e) => setStreet(e.target.value)} />
          <Form.Control type="text" value={streetNumber} placeholder="Hausnummer" onChange={(e) => setStreetNumber(e.target.value)} />
          <Form.Control type="text" value={zip} placeholder="Postleitzahl" onChange={(e) => setZip(e.target.value)} />
          <Form.Control type="text" value={city} placeholder="Ort" onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deine Email-Adresse ein.</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deine Telefon-Nummer ein.</Form.Label>
          <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>
        {steps[5][role]}
        <Form.Group className="mb-3">
          <Form.Label>Lade ein Profilbild hoch.</Form.Label>
          <Form.Control type="file" accept="image/*" />
        </Form.Group>
        {steps[7][role]}
        <Form.Group className="mb-3">
          <Form.Label>Beschreibe Deine Motivation an der Plattform mitzuwirken (max. 155 Zeichen)</Form.Label>
          <Form.Control as="textarea" maxLength={155} value={motivation} onChange={(e) => setMotivation(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Welchen digitalen Agenten möchten Sie integrieren?</Form.Label>
          <Form.Select multiple={true} onchange={(e) => setAgents(e.target.agentId)}>
            {agentCategories.map(i => (
              <option agentId={i.id}>{i.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deinen Benutzernamen ein.</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Dein Passwort ein.</Form.Label>
          <Form.Control
            type="password"
            value={password1}
            placeholder="Passwort"
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
          <Form.Control
            type="password"
            value={password2}
            placeholder="Passwort bestätigen"
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>
        {status && <div>{Object.entries(status).map(([key, value]) => (<Alert variant="danger">{key}: {value}</Alert>))}</div>}
        <Button variant="primary" type="submit">Registrieren</Button>
      </Form>
    </main>
  );
}

export default Registration;

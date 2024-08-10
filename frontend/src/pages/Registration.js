import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Registration.css';

function map(list, func) {
  const result = [];
  for (let item of list) {
    result.push(func(item))
  }
  return result;
}

function ContentChannels({
  selectedNews, selectedEvents, selectedProjects, selectedActors,
  setSelectedNews, setSelectedEvents, setSelectedProjects, setSelectedActors
}) {
  
  return (
    <Form.Group className="mb-3">
      <Form.Label>Wähle die Content-Channels aus, in denen du Inhalte erstellen möchtest.</Form.Label>
      <Form.Switch value={selectedNews} label="Neuigkeiten" onChange={(e) => setSelectedNews(e.target.value)} />
      <Form.Switch value={selectedEvents} label="Veranstaltungen" onChange={(e) => setSelectedEvents(e.target.value)} />
      <Form.Switch value={selectedProjects} label="Projekte" onChange={(e) => setSelectedProjects(e.target.value)} />
      <Form.Switch value={selectedActors} label="Akteure" onChange={(e) => setSelectedActors(e.target.value)} />
    </Form.Group>
  )
}

function MediaCategories({device, setDevice}) {
  
  return (
    <Form.Group className="mb-3">
      <Form.Label>Wähle das Media-Device aus, das du hinzufügen möchtest.</Form.Label>
      <Form.Select value={device} onChange={(e) => setDevice(e.target.value)}>
        {"Digital Democracy (mit Foto und Beschreibung), Analoge Displays (mit Foto und Beschreibung)".split(", ").map(i => (
          <option>{i}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

function Interests({interests, setInterests}) {
  const allInterests = "Städtebauliche Entwicklung, Lokale Betriebe und Dienstleistungen, Klima & Energie, Verkehr, Grün- & Freiflächen, Interkulturelles, Bildung, soziale Vereine, Mode und Schmuck, Jugend, Partizipation, Familien, Tiere und Natur, Kunst & Kultur, Gesundheit, Freizeit & Erholung, Bewegung & Gesundheit, Nachhaltigkeit, solidarische Landwirtschaft, Gemeinsames Kochen, Gastronomie";
  return (
    <Form.Group className="mb-3">
      <Form.Label>Wähle Interessensschwerpunkte aus, zu denen Du Inhalte erstellen möchtest. (Zum Hinzufügen eines weiteren Punktes zur Auswahl, <kbd>Strg</kbd> beim Auswählen gedrückt halten)</Form.Label>
      <Form.Select multiple={true} onChange={(e) => {setInterests(map(e.target.selectedOptions, i => i.innerText))}}> {/* onchange gets the selected elements before change */}
        {allInterests.split(", ").map(i => (
          <option>{i}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

function Registration() {
  const [error, setError] = useState(null);
  const [role, setRole] = useState('Creator');
  const [username, setUsername] = useState('');
  const [street, setStreet] = useState('');
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
  const steps = [
    {}, {}, {}, {}, {},
    {
      "Creator": <ContentChannels
        props={{
          selectedNews, selectedEvents, selectedProjects, selectedActors,
          setSelectedNews, setSelectedEvents, setSelectedProjects,
          setSelectedActors
        }}
      />,
      "Messenger": <MediaCategories />
    }, {},
    {
      "Creator": <Interests
        props={{
          interests, setInterests
        }}
      />,
      "Messenger": null
    }
  ];
  return (
    <main style={{width: "300px"}}>
      <Form onSubmit={null}>
        <Form.Group className="mb-3">
          <Form.Label>Wähle die Rolle, auf die Du Dich bewerben willst</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            {"Creator, Messenger".split(", ").map(i => (
              <option>{i}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deinen Namen ein.</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deine Wohnadresse ein.</Form.Label>
          <Form.Control type="text" value={street} placeholder="Straße und Hausnummer" onChange={(e) => setStreet(e.target.value)} />
          <Form.Control type="text" value={zip} placeholder="Postleitzahl" onChange={(e) => setZip(e.target.value)} />
          <Form.Control type="text" value={city} placeholder="Ort" onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gib Deine Email-Adresse ein.</Form.Label>
          <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <Form.Select multiple={true}>
            {"Mierendorff-INSEL-Veranstaltungs-Scraper von Silas".split(", ").map(i => (
              <option>{i}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {error && <div>{error}</div>}
        <Button variant="primary" type="submit">Registrieren</Button>
      </Form>
    </main>
  );
}

export default Registration;
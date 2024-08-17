import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function map(list, func) {
  const result = [];
  for (let item of list) {
    result.push(func(item))
  }
  return result;
}

function Title({title, setTitle}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Titel</Form.Label>
      <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </Form.Group>
  )
}

function Description({description, setDescription}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Beschreibung</Form.Label>
      <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
    </Form.Group>
  )
}

function StartDate({startDate, setStartDate}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Beginn</Form.Label>
      <Form.Control type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    </Form.Group>
  )
}

function EndDate({endDate, setEndDate}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Ende</Form.Label>
      <Form.Control type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </Form.Group>
  )
}

function Location({location, setLocation}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Ort</Form.Label>
      <Form.Select value={location} onChange={(e) => setLocation(e.target.value)}>
        {"Ort 1, Ort 2, Ort 3".split(", ").map(i => (
          <option>{i}</option>
        ))}
      </Form.Select>
      <Button>Neuen Ort hinzufügen</Button>
    </Form.Group>
  )
}

function LinksToCards({links, setLinks}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Links zu anderen Karten</Form.Label>
      <Form.Control type="text" value={links} onChange={(e) => setLinks(e.target.value)} />
    </Form.Group>
  )
}

function LinksToUsers({links, setLinks}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Links zu anderen Benutzern</Form.Label>
      <Form.Control type="text" value={links} onChange={(e) => setLinks(e.target.value)} />
    </Form.Group>
  )
}

function Source({source, setSource}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Quellenangaben</Form.Label>
      <Form.Control type="text" value={source} onChange={(e) => setSource(e.target.value)} />
    </Form.Group>
  )
}

function Organizer({organizer, setOrganizer}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Organisator</Form.Label>
      <Form.Select value={organizer} onChange={(e) => setOrganizer(e.target.value)}>
        {"Org 1, Org 2, Org 3".split(", ").map(i => (
          <option>{i}</option>
        ))}
      </Form.Select>
      <Button>Neuen Organisator hinzufügen</Button>
    </Form.Group>
  )
}

function Cicle({cicle, setCicle}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Wiederholung</Form.Label>
      <Form.Select value={cicle} onChange={(e) => setCicle(e.target.value)}>
        {"täglich, monatlich, wöchentlich, jährlich".split(", ").map(i => (
          <option>{i}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

function ColorScheme({colorScheme, setColorScheme}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Farbgestaltung</Form.Label>
      <Form.Control type="color" value={colorScheme} onChange={(e) => setColorScheme(e.target.value)} />
    </Form.Group>
  )
}

function Image({image, setImage}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Bild</Form.Label>
      <Form.Control type="file" accept="image/*" value={image} onChange={(e) => setImage(e.target.value)} />
    </Form.Group>
  )
}

function Tag({tag, setTag}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Hashtags</Form.Label>
      <Form.Control type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
    </Form.Group>
  )
}

function ShowOnlyImage({showOnlyImage, setShowOnlyImage}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Soll im Falle einer Veröffentlichung auf den Democracy-Displays im Kiez nur das Bild als Folie angezeigt werden? Andernfalls werden auch die übrigen Felder wie Titel, Beschreibung etc. angezeigt.</Form.Label>
      <Form.Switch label="Nur Bild anzeigen" value={showOnlyImage} onChange={(e) => setShowOnlyImage(e.target.value)} />
    </Form.Group>
  )
}

function CreateContent() {
  const [error, setError] = useState(null);
  const [channel, setChannel] = useState('Neuigkeiten');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [linksToCards, setLinksToCards] = useState('');
  const [linksToUsers, setLinksToUsers] = useState('');
  const [source, setSource] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [cicle, setCicle] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('');
  const [showOnlyImage, setShowOnlyImage] = useState('');
  const contentCategoryFields = {
    "Neuigkeiten": [
      <Title
        title={title}
        setTitle={i => setTitle(i)}
      />,
      <Description
        description={description}
        setDescription={i => setDescription(i)}
      />,
      <LinksToCards
        links={linksToCards}
        setLinks={i => setLinksToCards(i)}
      />,
      <LinksToUsers
        links={linksToUsers}
        setLinks={i => setLinksToUsers(i)}
      />,
      <Source
        source={source}
        setSource={i => setSource(i)}
      />,
      <ColorScheme
        cicle={colorScheme}
        setColorScheme={i => setColorScheme(i)}
      />,
      <Image
        image={image}
        setImage={i => setImage(i)}
      />,
      <ShowOnlyImage
        showOnlyImage={showOnlyImage}
        setShowOnlyImage={i => setShowOnlyImage(i)}
      />,
    ],
    "Veranstaltungen": [
      <Title
        title={title}
        setTitle={i => setTitle(i)}
      />,
      <Description
        description={description}
        setDescription={i => setDescription(i)}
      />,
      <StartDate
        startDate={startDate}
        setStartDate={i => setStartDate(i)}
      />,
      <EndDate
        endDate={endDate}
        setEndDate={i => setEndDate(i)}
      />,
      <Location
        location={location}
        setLocation={i => setLocation(i)}
      />,
      <LinksToCards
        links={linksToCards}
        setLinks={i => setLinksToCards(i)}
      />,
      <LinksToUsers
        links={linksToUsers}
        setLinks={i => setLinksToUsers(i)}
      />,
      <Source
        source={source}
        setSource={i => setSource(i)}
      />,
      <Organizer
        organizer={organizer}
        setOrganizer={i => setOrganizer(i)}
      />,
      <Cicle
        cicle={cicle}
        setCicle={i => setCicle(i)}
      />,
      <ColorScheme
        cicle={colorScheme}
        setColorScheme={i => setColorScheme(i)}
      />,
      <Image
        image={image}
        setImage={i => setImage(i)}
      />,
      <ShowOnlyImage
        showOnlyImage={showOnlyImage}
        setShowOnlyImage={i => setShowOnlyImage(i)}
      />,
    ],
    "Projekte": [
      <Title
        title={title}
        setTitle={i => setTitle(i)}
      />,
      <Description
        description={description}
        setDescription={i => setDescription(i)}
      />,
      <Location
        location={location}
        setLocation={i => setLocation(i)}
      />,
      <LinksToCards
        links={linksToCards}
        setLinks={i => setLinksToCards(i)}
      />,
      <LinksToUsers
        links={linksToUsers}
        setLinks={i => setLinksToUsers(i)}
      />,
      <Source
        source={source}
        setSource={i => setSource(i)}
      />,
      <Organizer
        organizer={organizer}
        setOrganizer={i => setOrganizer(i)}
      />,
      <ColorScheme
        cicle={colorScheme}
        setColorScheme={i => setColorScheme(i)}
      />,
      <Image
        image={image}
        setImage={i => setImage(i)}
      />,
      <ShowOnlyImage
        showOnlyImage={showOnlyImage}
        setShowOnlyImage={i => setShowOnlyImage(i)}
      />,
    ],
    "Akteure": [
      <Title
        title={title}
        setTitle={i => setTitle(i)}
      />,
      <Description
        description={description}
        setDescription={i => setDescription(i)}
      />,
      <Location
        location={location}
        setLocation={i => setLocation(i)}
      />,
      <LinksToCards
        links={linksToCards}
        setLinks={i => setLinksToCards(i)}
      />,
      <LinksToUsers
        links={linksToUsers}
        setLinks={i => setLinksToUsers(i)}
      />,
      <Source
        source={source}
        setSource={i => setSource(i)}
      />,
      <Organizer
        organizer={organizer}
        setOrganizer={i => setOrganizer(i)}
      />,
      <ColorScheme
        cicle={colorScheme}
        setColorScheme={i => setColorScheme(i)}
      />,
      <Image
        image={image}
        setImage={i => setImage(i)}
      />,
      <ShowOnlyImage
        showOnlyImage={showOnlyImage}
        setShowOnlyImage={i => setShowOnlyImage(i)}
      />,
    ],
  };
  return (
    <main style={{width: "300px"}}>
      <Form onSubmit={null}>
        <Form.Group className="mb-3">
          <Form.Label>Wähle die Content-Kategorie aus.</Form.Label>
          <Form.Select value={channel} onChange={(e) => setChannel(e.target.value)}>
            {"Neuigkeiten, Veranstaltungen, Projekte, Akteure".split(", ").map(i => (
              <option>{i}</option>
            ))}
          </Form.Select>
        </Form.Group>
        {contentCategoryFields[channel]}
        {error && <div>{error}</div>}
        <Button variant="primary" type="submit">Erstellen</Button>
      </Form>
    </main>
  );
}

export default CreateContent;
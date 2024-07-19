import parse from 'html-react-parser';
import QRCode from 'react-qr-code';
import Hyphenated from 'react-hyphen';
import de from 'hyphenated-de';
import { CalendarEvent } from 'react-bootstrap-icons';
import logo from '../graphics/DNL_Logo.png';
import './SlideTemplate.css';

const formatDateTime = (datestring) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric"
  };
  const date = new Date(datestring);
  return `${date.toLocaleString('de-DE', options)} Uhr`
};

const formatDate = (datestring) => {
  const options = {
    dateStyle: "medium"
  };
  const date = new Date(datestring);
  return date.toLocaleDateString('de-DE', options)
};

const minmax = (min, x, max) => Math.max(Math.min(x, max), min);

const calculateFontSize = (textLength, referenceSize,
                           minFontSize = 1, maxFontSize = 5) => {
  const scaledFontSize = Math.sqrt(550 / textLength) * referenceSize
  return minmax(minFontSize, scaledFontSize, maxFontSize)
};

const SlideTemplate = ({slide}) => {
  return (
    <>
      <header>
        <div><CalendarEvent className="m-2"/></div>
        <h1
          style={{
            fontSize: `${calculateFontSize(slide.title.length, .95, 1, 4)}vh`
          }}
        >{slide.title}</h1>
      </header>
      {/* Neuigkeiten: newspaper
      Veranstaltungen: calendar-event
      Projekte: diagram-3
      Akteure: people-fill */}
      <div className="qr-code">
        <QRCode
          value={slide.link}
          style={{backgroundColor: "white", color: "var(--dark-blue)"}}
        />
        <span>Erfahre mehr!</span>
      </div>
      <div
        className="beschreibungstext"
        style={{
          fontSize: `${calculateFontSize(slide.description.length, 1.75)}vh`
        }}
      ><Hyphenated language={de}>
        {parse(slide.description)}
        <p className="autor">
          Hinzugefügt von {slide.createdBy.username},<br />Stand: {formatDate(slide.updatedAt)}
        </p>
      </Hyphenated></div>
      <p className="daten"> 
        <strong>Wo?</strong><br /> {slide.location.name}
        <br />
        <strong>Wann?</strong> {formatDateTime(slide.startDate)} bis<br />
        {formatDateTime(slide.endDate)}<br/>
        <strong>Wer?</strong> {slide.organizer.map(org => org.name).join(", ")}<br />
      </p>
      <img src={logo} alt="DNL Logo" />
    </>
  )
};

export default SlideTemplate;
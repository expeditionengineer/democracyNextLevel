import './SlideTemplate.css';
import { CalendarEvent } from 'react-bootstrap-icons';
import logo from '../graphics/DNL_Logo.png';
import qrcode from '../graphics/QR-Code.png';

const formatDateTime = (datestring) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
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

const calculateFontSize = (textLength) => {
  const minFontSize = 1;
  const maxFontSize = 5;
  const scaledFontSize = Math.sqrt(550 / textLength) * 1.75
  return minmax(minFontSize, scaledFontSize, maxFontSize)
};

const SlideTemplate = ({slide}) => {
  return (
    <>
      <header>
        <h1><CalendarEvent className="me-3"/>{slide.title}</h1>
      </header>
      {/* Neuigkeiten: newspaper
      Veranstaltungen: calendar-event
      Projekte: diagram-3
      Akteure: people-fill */}
      <p className="qr-code">
        <img src={qrcode} alt="Beispiel QR-Code" />
        Erfahre mehr
      </p>
      <p
        className="beschreibungstext"
        style={{
          "font-size": `${calculateFontSize(slide.description.length)}vh`
        }}
      > {slide.description}
        <p className="autor">
          Autor: {slide.author}, Datum: {formatDate(slide.createdAt)}
        </p>
      </p>
      <p className="daten"> 
        <strong>Wo?</strong><br />
        <br />
        <strong>Wann?</strong> {formatDateTime(slide.startDate)}<br />
        bis {formatDateTime(slide.endDate)}<br/>
        <strong>Wer?</strong> {slide.organizer}<br />
      </p>
      <img src={logo} alt="DNL Logo" />
    </>
  )
};

export default SlideTemplate;
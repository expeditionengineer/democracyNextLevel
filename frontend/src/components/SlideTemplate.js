import parse from 'html-react-parser';
import QRCode from 'react-qr-code';
import './SlideTemplate.css';
import { CalendarEvent } from 'react-bootstrap-icons';
import logo from '../graphics/DNL_Logo.png';


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

const calculateFontSize = (textLength, referenceSize,
                           minFontSize = 1, maxFontSize = 5) => {
  const scaledFontSize = Math.sqrt(550 / textLength) * referenceSize
  return minmax(minFontSize, scaledFontSize, maxFontSize)
};

const SlideTemplate = ({slide}) => {
  return (
    <>
      <header>
        <h1
          style={{
            fontSize: `${calculateFontSize(slide.description.length, 3)}vh`
          }}
        ><CalendarEvent className="m-2"/>{slide.title}</h1>
      </header>
      {/* Neuigkeiten: newspaper
      Veranstaltungen: calendar-event
      Projekte: diagram-3
      Akteure: people-fill */}
      <p className="qr-code">
        <QRCode
          value={slide.link}
          style={{backgroundColor: "white"}}
        />
        Erfahre mehr!
      </p>
      <p
        className="beschreibungstext"
        style={{
          fontSize: `${calculateFontSize(slide.description.length, 1.75)}vh`
        }}
      > {parse(slide.description)}
        <p className="autor">
          Autor: {slide.createdBy.username}, Datum: {formatDate(slide.createdAt)}
        </p>
      </p>
      <p className="daten"> 
        <strong>Wo?</strong><br /> {slide.location.name}
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
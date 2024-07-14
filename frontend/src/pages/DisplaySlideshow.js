import SlideTemplate from '../components/SlideTemplate';
import Carousel from 'react-bootstrap/Carousel';

const exempleSlides = [
  {
    "id": 0,
    "title": "Clean Up",
    "description": "Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber.",
    "author": "Can",
    "startDate": "2024-07-15 12:00",
    "endDate": "2024-07-15 14:00",
    "repeated": "jede Woche",
    "createdAt": "2024-07-14",
    "organizer": "Dorfwerkstatt",
    "published": "2024-07-14",
    "updatedAt": ""
  },
  {
    "id": 1,
    "title": "Kindermalen",
    "description": "Buntes Malen mit Wasserfarben und Stiften",
    "author": "Minnie Mouse",
    "startDate": "2024-10-10 10:00",
    "endDate": "2024-10-10 14:30",
    "repeated": false,
    "createdAt": "2024-07-12",
    "organizer": "Gottfriedkeller Gymnasium",
    "published": "2024-07-12",
    "updatedAt": ""
  },
  {
    "id": 2,
    "title": "Clean Up",
    "description": "Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber. Wir machen die Mierendorff-Straße sauber.",
    "author": "Can",
    "startDate": "2024-07-15 12:00",
    "endDate": "2024-07-15 14:00",
    "repeated": "jede Woche",
    "createdAt": "2024-07-14",
    "organizer": "Dorfwerkstatt",
    "published": "2024-07-14",
    "updatedAt": ""
  },
];

function calculateSlideInterval(slide) {
  const textLength = Object.values(slide).reduce((len, txt) =>
    len + (typeof(txt) == "string" ? txt.length : 0),
  0)
  return textLength * 21 / 293 * 1000;
}

function DisplaySlideshow() {
  const slides = exempleSlides.map(slide => (
    <Carousel.Item className="carousel-item" interval={calculateSlideInterval(slide)}>
      <SlideTemplate
        slide={slide}
      />
      <Carousel.Caption>
      </Carousel.Caption>
    </Carousel.Item>
  ));
  return (
    <main>
      <Carousel>
        {slides}
      </Carousel>
    </main>
  );
}

export default DisplaySlideshow;
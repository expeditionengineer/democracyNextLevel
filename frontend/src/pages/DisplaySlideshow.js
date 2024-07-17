import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {fetchPublishedEvents} from '../api';
import SlideTemplate from '../components/SlideTemplate';

function sanitizeString(str) {
  return str.replace(/(<([^>]+)>)/gi, "")
}

function calculateSlideInterval(slide) {
  const textLength = Object.values(slide).reduce((len, txt) =>
    len + (typeof(txt) == "string" ? sanitizeString(txt).length : 0),
  0)
  return textLength * 20 / 293 * 1000;
}

function createSlides(slidesData) {
  return slidesData.map(slide => (
    <Carousel.Item className="carousel-item" interval={calculateSlideInterval(slide)}>
      <SlideTemplate
        slide={slide}
      />
      <Carousel.Caption>
      </Carousel.Caption>
    </Carousel.Item>
  ));
}

function DisplaySlideshow() {
  const [loadedData, setLoadedData] = useState(false);
  const [slides, setSlides] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPublishedEvents()
    .then(slidesData => {
      setSlides(createSlides(slidesData));
    })
    .catch(
      err => {
        setError(err.message);
        setLoadedData(false);
      }
    );
    return () => {
    };
  }, [loadedData]);
  return (
    <main>
      {error && <div>Fehler beim herunterladen der Slides</div>}
      <Carousel>
        {slides ?? "Lade Slides herunter..."}
      </Carousel>
    </main>
  );
}

export default DisplaySlideshow;
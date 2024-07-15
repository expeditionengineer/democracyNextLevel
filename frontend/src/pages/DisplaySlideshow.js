import SlideTemplate from '../components/SlideTemplate';
import Carousel from 'react-bootstrap/Carousel';
import exampleSlides from '../data/exampleSlidesData';

function calculateSlideInterval(slide) {
  const textLength = Object.values(slide).reduce((len, txt) =>
    len + (typeof(txt) == "string" ? txt.length : 0),
  0)
  return textLength * 21 / 293 * 1000;
}

function DisplaySlideshow() {
  const slides = exampleSlides.map(slide => (
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
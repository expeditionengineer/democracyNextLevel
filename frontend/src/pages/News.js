import { Outlet, Link } from 'react-router-dom';
import GeneralCard from '../components/GeneralCard';
import CardButtons from '../components/CardButtons';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import testPic from '../graphics/Schock.jpg';
import { Newspaper } from 'react-bootstrap-icons';

const News = () => {
  const color = "red"
  
  return (
  <>
    <GeneralCard 
      color="red"
      icon={(<Newspaper className="me-2" style={{color: color}} />)}
      title="CardTitle"
      author="Jane Doe"
      date="02.07.2024"
      picLink={testPic}
      description="Some quick example text to build on the card title and make up the \
            bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
      buttonbar={<CardButtons
        proposal={true}
      />}
      link="#"
    />
    <GeneralCard 
      color="red"
      icon="Information"
      title="CardTitle"
      author="Jane Doe"
      date="02.07.2024"
      picLink={testPic}
      description="Some quick example text to build on the card title and make up the \
            bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
      buttonbar={<CardButtons
        cardSubtype="information"
      />}
      link="#"
    />
    <GeneralCard 
      color="red"
      icon="Pro-Argument"
      title="CardTitle"
      author="Jane Doe"
      date="02.07.2024"
      picLink={testPic}
      description="Some quick example text to build on the card title and make up the \
            bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
      buttonbar={<CardButtons
        cardSubtype="pro-argument"
      />}
      link="#"
    />
    <GeneralCard 
      color="red"
      icon="Frage"
      title="CardTitle"
      author="Jane Doe"
      date="02.07.2024"
      picLink={testPic}
      description="Some quick example text to build on the card title and make up the \
            bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
      buttonbar={<CardButtons
        cardSubtype="question"
      />}
      link="#"
    />
    <GeneralCard 
      color="red"
      icon="Verbessern"
      title="CardTitle"
      author="Jane Doe"
      date="02.07.2024"
      picLink={testPic}
      description="Some quick example text to build on the card title and make up the \
            bulk of the card's content. Noch ein paar Sätze mehr. Noch ein paar Sätze mehr."
      buttonbar={<CardButtons
        cardSubtype="optimize"
      />}
      link="#"
    />
  </>
  )
};

export default News;
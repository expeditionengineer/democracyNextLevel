import { Link } from 'react-router-dom';
import ContentCard from './ContentCard';
import ContentCardProposalButtons from './ContentCardProposalButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Newspaper, CheckCircle, Ban, PencilSquare } from 'react-bootstrap-icons';
import './ContentCardWrapper.css';

const ContentCardWrapper = () => {
  const colorMatching = {
    events: "orange",
    news: "red",
    actors: "brown",
    projects: "green"
  };
  const contentColor = "red";
  
  return (
    <Container style={{ width: '50%' }}>
      <Row>
        <Col>
          <ContentCard />
        </Col>
      </Row>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Interessant</Button>
          <Button variant="secondary">Uninteressant</Button>
          <Button variant="secondary">Analysieren</Button>
          <Button variant="secondary">Partizipieren</Button>
        </ButtonGroup>
      </Row>
      <ContentCardProposalButtons />
    </Container>
  );
};

export default ContentCardWrapper;
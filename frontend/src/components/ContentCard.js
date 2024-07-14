import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Newspaper } from 'react-bootstrap-icons';


const ContentCard = () => {
  const colorMatching = {
    events: "orange",
    news: "red",
    actors: "brown",
    projects: "green",
  };
  const contentColor = "red";
  
  return (
    <Card>
      <Card.Header>
        <Container fluid>
          <Row>
            <Col xs={2}>
              <Newspaper className="me-2" style={{color: contentColor}} />
            </Col>
            <Col>
              <Card.Title className="text-primary" style={{textAlign: 'center'}}>Card Title</Card.Title>
            </Col>
            <Col xs={2}>
            </Col>
          </Row>
          <Row>
            <Col>
              von <span style={{color: contentColor}}>Jane Doe</span>
            </Col>
            <Col>
              am <span style={{color: contentColor}}>28.06.24</span>
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Img variant="top" src={} />
      <Card.Body>
        <Card.Text>
          
        </Card.Text>
        <Button variant="link">Erfahre mehr&hellip;</Button>
      </Card.Body>
    </Card>
  );
};

export default ContentCard;
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const GeneralCard = ({icon, title, author, date, picLink, description, buttonbar, link, color}) => {
  
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Container fluid>
                <Row>
                  <Col xs={3}>
                    {icon}
                  </Col>
                  <Col>
                    <Card.Title className="text-primary" style={{textAlign: 'center'}}>{title}</Card.Title>
                  </Col>
                  <Col xs={2}>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    von <span style={{color: color}}>{author}</span>
                  </Col>
                  <Col>
                    am <span style={{color: color}}>{date}</span>
                  </Col>
                </Row>
              </Container>
            </Card.Header>
            <Card.Img variant="top" src={picLink} />
            <Card.Body>
              <Card.Text>
                {description}
              </Card.Text>
              <Button variant="link">Erfahre mehr&hellip;</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {buttonbar}
    </Container>
  );
};

export default GeneralCard;
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { ThreeDots } from 'react-bootstrap-icons';

const GeneralCard = ({icon, title, author, date, picLink, description, buttonbar, link, color}) => {
  
  return (
    <Container>
      <Row>
        <Col>
          <Stack direction="horizontal" gap={3} className="mb-3">
            <Image src={author.profilePic} width="48" heigth="48" roundedCircle />
            <div>
              <strong style={{fontSize: "1.5em"}} >{" " + author.name}</strong><br />
              <span>{date}</span>
            </div>
          </Stack>
        </Col>
        <Col style={{textAlign: "center"}}>
          <div style={{position: "relative", top: "30px"}}>Platz #1</div>
        </Col>
        <Col style={{textAlign: "right"}}>
          <div style={{position: "relative", with: "100%", height: "100%"}}>
            <div className="position-absolute top-50 end-0 translate-middle-y">
              <Button>Abonieren</Button>
              <Dropdown style={{display: "inline-block"}}>
                <Dropdown.Toggle variant="none">
                  <ThreeDots />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Beitrag Speichern</Dropdown.Item>
                  <Dropdown.Item href="#">Beitrag Melden</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
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
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Newspaper, CheckCircle, Ban, PencilSquare } from 'react-bootstrap-icons';
import './ContentCardWrapper.css';

const proposal = false;
const moderatorMethods = (
  <>
    <Button variant=""><CheckCircle /></Button>
    <Button variant=""><Ban /></Button>
    <Button variant=""><PencilSquare /></Button>
  </>
);

const puplishedMethods = (
  <>
    <Button variant="">1</Button>
    <Button variant="">2</Button>
    <Button variant="">3</Button>
    <Button variant="">4</Button>
    <Button variant="">5</Button>
  </>
);

const ContentCardProposalButtons = () => {
  
  return (
    <Row>
      <ButtonGroup aria-label="Basic example">
        {proposal ? moderatorMethods : puplishedMethods}
      </ButtonGroup>
    </Row>
  );
};

export default ContentCardProposalButtons;
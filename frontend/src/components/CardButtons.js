import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Newspaper, CheckCircle, Ban, PencilSquare,
         EmojiSurprise, ShieldCheck, ShieldX, HandThumbsUp,
         HandThumbsDown } from 'react-bootstrap-icons';


const proposal = true;
const moderatorMethods = (
  <>
    <Row>
      <ButtonGroup aria-label="Basic example">
        <Button variant=""><CheckCircle /></Button>
        <Button variant=""><Ban /></Button>
        <Button variant=""><PencilSquare /></Button>
      </ButtonGroup>
    </Row>
  </>
);

const proposalCardButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Analysieren</Button>
          <Button variant="secondary">Verlinken</Button>
          <Button variant="secondary">Teilen</Button>
          <Button variant="secondary" style={{backgroundColor: "green"}}>Information</Button>
        </ButtonGroup>
      </Row>
    </>
);

const informationCardButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Analysieren</Button>
          <Button variant="secondary">Information erstellen</Button>
          <Button variant="secondary" style={{backgroundColor: "green"}}>Pro-Argument</Button>
        </ButtonGroup>
      </Row>
    </>
);

const proargumentCardButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Analysieren</Button>
          <Button variant="secondary">Pro-Argument erstellen</Button>
          <Button variant="secondary" style={{backgroundColor: "red"}}>Con-Argument</Button>
        </ButtonGroup>
      </Row>
    </>
);

const questionCardButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Analysieren</Button>
          <Button variant="secondary">Frage erstellen</Button>
          <Button variant="secondary" style={{backgroundColor: "lightblue"}}>Verbessern</Button>
        </ButtonGroup>
      </Row>
    </>
);

const optimizeCardButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Analysieren</Button>
          <Button variant="secondary">Verbessern</Button>
          <Button variant="secondary" style={{backgroundColor: "lightblue"}}>Content Proposal</Button>
        </ButtonGroup>
      </Row>
    </>
);

function TooltipPositioned({element, tooltip}) {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            {tooltip}.
          </Tooltip>
        }
      >
        {element}
      </OverlayTrigger>
    </>
  );
}

const sendDebateDataForDebateCard = (e) => {
  
}

const debatePointsButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup>
          <TooltipPositioned
            element={(<Button value="1" variant="secondary" onClick={sendDebateDataForDebateCard}><EmojiSurprise /></Button>)}
            tooltip="Interessant"
          />
          <TooltipPositioned
            element={(<Button value="2" variant="secondary"><ShieldCheck /></Button>)}
            tooltip="Vertrauen"
          />
          <TooltipPositioned
            element={(<Button value="3" variant="secondary"><ShieldX /><br /></Button>)}
            tooltip="Nicht Vertrauen"
          />
          <TooltipPositioned
            element={(<Button value="4" variant="secondary"><HandThumbsUp /></Button>)}
            tooltip="Zustimmen"
          />
          <TooltipPositioned
            element={(<Button value="5" variant="secondary"><HandThumbsDown /></Button>)}
            tooltip="Nicht zustimmen"
          />
        </ButtonGroup>
      </Row>
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


const CardButtons = ({cardType, cardSubtype, proposal, moderator, published}) => {
  
  return (
  <>
    {proposal ? proposalCardButtons : undefined}
    {cardSubtype == "information" ? informationCardButtons : undefined}
    {cardSubtype == "pro-argument" ? proargumentCardButtons : undefined}
    {cardSubtype == "question" ? questionCardButtons : undefined}
    {cardSubtype == "optimize" ? optimizeCardButtons : undefined}
    {debatePointsButtons}
    {moderator ? moderatorMethods : undefined}
  </>
  );
};

export default CardButtons;

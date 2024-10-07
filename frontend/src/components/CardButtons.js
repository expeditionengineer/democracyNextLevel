import { Link } from 'react-router-dom';

import React, { useState } from 'react';

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

const sendDebateDataForDebateCard = async (e) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch("http://127.0.0.1:8000/debate-points/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',  // Set content type
        'Authorization': `Token ${token}`,  // Append the token to the Authorization header
      },
      body: JSON.stringify({
        cardId: e.target.cardId,
        type: e.target.value,
      })
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    

    // If response is successful, change the button's style
    e.target.style.backgroundColor = 'green';  // For example, change the background color to green
    e.target.style.color = 'white';  // Change the text color to white
    e.target.style.border = '2px solid darkgreen';  // Change the border to dark green
    
  } catch (error) {
    console.error('Error:', error);
  }
}



const puplishedMethods = (
  <>
    <Button variant="">1</Button>
    <Button variant="">2</Button>
    <Button variant="">3</Button>
    <Button variant="">4</Button>
    <Button variant="">5</Button>
  </>
);


const CardButtons = ({cardType, cardSubtype, proposal, moderator, published, debateCardId}) => {
  const [debateCardIdState, setDebateCardIdState] = useState(debateCardId);
  const debatePointsButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup>
          <TooltipPositioned
            element={(<Button value="1" cardId={debateCardIdState} variant="secondary" onClick={sendDebateDataForDebateCard}><EmojiSurprise /></Button>)}
            tooltip="Interessant"
          />
          <TooltipPositioned
            element={(<Button value="2" cardId={debateCardIdState} variant="secondary" onClick={sendDebateDataForDebateCard}><ShieldCheck /></Button>)}
            tooltip="Vertrauen"
          />
          <TooltipPositioned
            element={(<Button value="3" cardId={debateCardIdState} variant="secondary" onClick={sendDebateDataForDebateCard}><ShieldX /><br /></Button>)}
            tooltip="Nicht Vertrauen"
          />
          <TooltipPositioned
            element={(<Button value="4" cardId={debateCardIdState} variant="secondary" onClick={sendDebateDataForDebateCard}><HandThumbsUp /></Button>)}
            tooltip="Zustimmen"
          />
          <TooltipPositioned
            element={(<Button value="5" cardId={debateCardIdState} variant="secondary" onClick={sendDebateDataForDebateCard}><HandThumbsDown /></Button>)}
            tooltip="Nicht zustimmen"
          />
        </ButtonGroup>
      </Row>
    </>
  );

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

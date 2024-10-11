import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import Dropdown from 'react-bootstrap/Dropdown';

import Badge from "react-bootstrap/Badge";
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

const optimiggzeCardButtons = (
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
        cardId: e.target.getAttribute("cardId"),
        type: e.target.getAttribute("value"),
      })
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    
    const json = await response.json();

    // add the new debatePoint obj to the created datastructures:
    var deepCopyOfUserDebatePoints = structuredClone(debatePointsForCardUser);
    deepCopyOfUserDebatePoints[json["type"]].push(json);

    setDebatePointsForCardUser(deepCopyOfUserDebatePoints)
  } catch (error) {
    console.error('Error:', error);
  }
} 
  const [debateCardIdState, setDebateCardIdState] = useState(debateCardId);
  const [debatePointsForCardUser, setDebatePointsForCardUser] = useState({
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
  });
  const [debatePointsForCardRest, setDebatePointsForCardRest] = useState({
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
  });

  const [fetchedDebatePoints, setFetchedDebatePoints] = useState(false);
  
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
  const fetchDebatePoints = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/debate-points/${debateCardIdState}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });

      if (response.ok) {
        const json = await response.json();
        const orderedWithTypes = {
          "1": [],
          "2": [],
          "3": [],
          "4": [],
          "5": [],
          "6": [],
        }; 
        const orderedWithTypesRest = {
          "1": [],
          "2": [],
          "3": [],
          "4": [],
          "5": [],
          "6": [],
        };
        json["User"].forEach(point => {
          if (orderedWithTypes[point.type]) {
            orderedWithTypes[point.type].push(point);  // Use push() for arrays
          } else {
            orderedWithTypes[point.type] = [point];
          }
        });
        json[""].forEach(point => {
          if (orderedWithTypesRest[point.type]) {
            orderedWithTypesRest[point.type].push(point);  // Use push() for arrays
          } else {
            orderedWithTypesRest[point.type] = [point];
          }
        });
        
        setDebatePointsForCardRest(orderedWithTypesRest);
        setDebatePointsForCardUser(orderedWithTypes);
        setFetchedDebatePoints(true);
      }
    } catch (error) {
      console.error("Error is ", error);
    }
  };

  fetchDebatePoints();
}, []); 

 const removeDebatePoint = async (e) => {
   if (debatePointsForCardUser[e.target.getAttribute("value")].length > 0) {
     const elementToBeDeleted = debatePointsForCardUser[e.target.getAttribute("value")].pop() 
     const token = localStorage.getItem('token')
     try {
       debugger; 
       const response = await fetch("http://127.0.0.1:8000/debate-points/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          },
          body: JSON.stringify({
            id: elementToBeDeleted.id,  
          })
        });
      if (response.ok) {
        const deepCopy = structuredClone(debatePointsForCardUser);
        setDebatePointsForCardUser(deepCopy);
      }
     } catch (error) {
       console.error("Error removing debate point: ", error)
     }
   }

 }

  const debatePointsButtons = (
    <>
      <Row style={{position: "relative", top: -10 }}>
        <ButtonGroup>
          <TooltipPositioned
            element={( 
            (<Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-interessant">
                <EmojiSurprise /><Badge bg="danger" pill style={{position: 'absolute', top: '-10px', right: '-10px', zIndex: 9999}}>{debatePointsForCardUser["1"].length}</Badge>
              <Badge bg="primary" pill style={{position: 'absolute', top: '-10px', right: '10px', zIndex: 9999}}>{debatePointsForCardUser["1"].length+debatePointsForCardRest["1"].length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item value="1" cardId={debateCardIdState} onClick={sendDebateDataForDebateCard}>Add point</Dropdown.Item>
                <Dropdown.Item value="1" cardId={debateCardIdState} onClick={removeDebatePoint} disabled={debatePointsForCardUser["1"].length === 0 ? true : false} >Remove point</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>)
              )}
            tooltip="Interessant"
          />
          <TooltipPositioned
            element={(<Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-interessant">
                <ShieldCheck /><Badge bg="danger" pill style={{position: 'absolute', top: '-10px', right: '-10px', zIndex: 9999}}>{debatePointsForCardUser["2"].length}</Badge>
              <Badge bg="primary" pill style={{position: 'absolute', top: '-10px', right: '10px', zIndex: 9999}}>{debatePointsForCardUser["2"].length+debatePointsForCardRest["2"].length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item value="2" cardId={debateCardIdState} onClick={sendDebateDataForDebateCard}>Add point</Dropdown.Item>
                <Dropdown.Item value="2" cardId={debateCardIdState} onClick={removeDebatePoint} disabled={debatePointsForCardUser["2"].length === 0 ? true : false} >Remove point</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>)
              }
            tooltip="Vertrauen"
          />
          <TooltipPositioned
            element={(<Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-interessant">
                <ShieldX /><Badge bg="danger" pill style={{position: 'absolute', top: '-10px', right: '-10px', zIndex: 9999}}>{debatePointsForCardUser["3"].length}</Badge>
<Badge bg="primary" pill style={{position: 'absolute', top: '-10px', right: '10px', zIndex: 9999}}>{debatePointsForCardUser["3"].length+debatePointsForCardRest["3"].length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item value="3" cardId={debateCardIdState} onClick={sendDebateDataForDebateCard}>Add point</Dropdown.Item>
                <Dropdown.Item value="3" cardId={debateCardIdState} onClick={removeDebatePoint} disabled={debatePointsForCardUser["3"].length === 0 ? true : false} >Remove point</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>)}
            tooltip="Nicht Vertrauen"
          />
          <TooltipPositioned
            element={(<Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-interessant">
                <HandThumbsUp /><Badge bg="danger" pill style={{position: 'absolute', top: '-10px', right: '-10px', zIndex: 9999}}>{debatePointsForCardUser["4"].length}</Badge>
              <Badge bg="primary" pill style={{position: 'absolute', top: '-10px', right: '10px', zIndex: 9999}}>{debatePointsForCardUser["4"].length+debatePointsForCardRest["4"].length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item value="4" cardId={debateCardIdState} onClick={sendDebateDataForDebateCard}>Add point</Dropdown.Item>
                <Dropdown.Item value="4" cardId={debateCardIdState} onClick={removeDebatePoint} disabled={debatePointsForCardUser["4"].length === 0 ? true : false} >Remove point</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>)}
            tooltip="Zustimmen"
          />
          <TooltipPositioned
            element={(<Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-interessant">
                <HandThumbsUp /><Badge bg="danger" pill style={{position: 'absolute', top: '-10px', right: '-10px', zIndex: 9999}}>{debatePointsForCardUser["5"].length}</Badge>
              <Badge bg="primary" pill style={{position: 'absolute', top: '-10px', right: '10px', zIndex: 9999}}>{debatePointsForCardUser["5"].length+debatePointsForCardRest["5"].length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item value="5" cardId={debateCardIdState} onClick={sendDebateDataForDebateCard}>Add point</Dropdown.Item>
                <Dropdown.Item value="5" cardId={debateCardIdState} onClick={removeDebatePoint} disabled={debatePointsForCardUser["5"].length === 0 ? true : false} >Remove point</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>)}
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
    {debatePointsButtons}
    {moderator ? moderatorMethods : undefined}
  </>
  );
};

export default CardButtons;

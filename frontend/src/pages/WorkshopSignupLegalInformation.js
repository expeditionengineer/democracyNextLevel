import React from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function WorkshopSignupLegalInformation() {
  
  document.title = "Workshop Sign-up Legal Information";
  
  return (
    <main style={{padding: "2em"}}>
      <h1>Legal Information</h1>
      <h2>Contact</h2>
      <address>
        Name: Can Döbler<br />
        Address: Knobelsdorffstraße 32, 14059 Berlin Germany<br />
        Email: <a href="mailto:can.doebler@web.de">can.doebler@web.de</a><br />
        Phone: 015781051651
      </address>
    </main>
  );
}

export default WorkshopSignupLegalInformation;

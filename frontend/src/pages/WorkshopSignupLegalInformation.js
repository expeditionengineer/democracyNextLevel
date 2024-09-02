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
        <dl>
          <dt>Name</dt>
          <dd>Can Döbler</dd>
          <dt>Address</dt>
          <dd>Knobelsdorffstraße 32, 14059 Berlin Germany</dd>
          <dt>Email</dt>
          <dd><a href="mailto:can.doebler@web.de">can.doebler@web.de</a></dd>
          <dt>Phone</dt>
          <dd>015781051651</dd>
        </dl>
      </address>
      <h2 id="privacy">Privacy Policy</h2>
      <p>
      <b>Why We Collect and Store Your Data:</b><br />
      <b>1) Attendance:</b> We maintain records of workshop attendance to issue certificates and assess overall participation rates.<br />
      <b>2) Feedback Collection:</b> Your feedback and demographic information help us understand your needs better and tailor future workshops to be even more valuable. We may contact you to gather your thoughts and suggestions.<br />
      <b>3) Resource Sharing:</b> We may use your contact information to share additional resources and materials related to the workshop.<br />
      <b>4) Future Communication:</b> We may occasionally reach out with information about upcoming workshops or events that may be of interest to you.<br />
      </p>
    </main>
  );
}

export default WorkshopSignupLegalInformation;

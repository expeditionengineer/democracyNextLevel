import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Check2Circle } from 'react-bootstrap-icons';
import {postRegistration, fetchCategories} from '../api';
import './WorkshopSignup.css';
// import video from '../videos/workshop-video.mp4';

function map(list, func) {
  const result = [];
  for (let item of list) {
    result.push(func(item))
  }
  return result;
}


function WorkshopSignup() {
  const [error, setError] = useState({}); // for server response
  const [hasError, setHasError] = useState(false);
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  
  const handleRegistration = e => {
    e.preventDefault();
    setValidated(true);
    if (e.currentTarget.checkValidity() === false) {
      return;
    }
    const dataObj = {
      password1: "rzbu4eiutan4pvot#",
      password2: "rzbu4eiutan4pvot#",
      username: email,
      description: "bla bla bla",
      role: "workshopper",
      first_name: firstName,
      last_name: lastName,
      email: email,
      age: age
    };
    postRegistration(dataObj)
    .then(res => {
      setSuccess(res.ok);
      setHasError(!res.ok);
      return res.json()
    })
    .then(jsn => {
      setError(jsn);
      setHasError(true);
    })
    .catch(
      err => {
        setError(err);
        setHasError(true);
      }
    );
  };
  
  document.title = "Workshop Sign-up";
  
  return (
    <main className="rounded m-auto mt-md-3 workshop-signup">
      {success ?
        (<Alert variant="success">
          <Alert.Heading>
            <Check2Circle /> Your sign-up has been successfull!
          </Alert.Heading>
          <p>
            See you soon, {firstName}.
          </p>
        </Alert>)
        :
        (<Row>
          <Col>
            <video
              width="160"
              height="90"
              style={{width: "100%", height: "auto"}}
              controls
            >
              <source src="" type="video/mp4" />
            </video>
          </Col>
          <Col md={6} lg="auto">
            <Form className="p-3 " onSubmit={handleRegistration} validated={validated}>
              <h1>Workshop Sign-up</h1>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{display: "block"}}
                >
                  {error.first_name && error.first_name.join(" ")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{display: "block"}}
                >
                  {error.last_name && error.last_name.join(" ")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min={15}
                  aria-describedby="age-help"
                />
                <Form.Text id="age-help" muted>
                  You have to be at least 15 years old.
                </Form.Text>
                <Form.Control.Feedback
                  type="invalid"
                  style={{display: "block"}}
                >
                  {error.age && error.age.join(" ")}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{display: "block"}}
                >
                  {error.email && error.email.join(" ")}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">Sign up!</Button>
              {hasError && <Alert variant="warning" className="mt-3">
                An error occured! {error.detail && error.detail}
              </Alert>}
            </Form>
          </Col>
        </Row>)
      }
      <a href="/workshop-signup/legal">Legal information</a>
    </main>
  );
}

export default WorkshopSignup;

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
      role: "workshopper",
      first_name: firstName,
      last_name: lastName,
      email: email,
      age: age
    };
    postRegistration(dataObj)
    .then(res => {
      setError(res);
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
    <main className="rounded m-auto mt-3 workshop-signup">
      {success ?
        (<Alert variant="success">
          <Alert.Heading>
            <Check2Circle /> Your sign-up had been successfull!
          </Alert.Heading>
          <p>
            See you soon.
          </p>
        </Alert>)
        :
        (<Form className="p-3 " onSubmit={handleRegistration} validated={validated}>
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
        </Form>)
      }
    </main>
  );
}

export default WorkshopSignup;

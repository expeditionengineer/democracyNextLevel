import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';
import { Check2Circle } from 'react-bootstrap-icons';
import {postRegistration, fetchCategories} from '../api';
import './WorkshopSignup.css';
import video from '../videos/workshop.mp4';
import video2 from '../videos/workshop2.mp4';

function map(list, func) {
  const result = [];
  for (let item of list) {
    result.push(func(item))
  }
  return result;
}

function StepOne({error, firstName, setFirstName, lastName, setLastName, email,
  setEmail, dateOfBirth, setDateOfBirth, phone, setPhone, facebook,
  setFacebook, province, setProvince, education, setEducation, englishLevel,
  setEnglishLevel}) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          placeholder="eg. Cong Danh"
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
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
          placeholder="eg. Pham"
          onChange={(e) => setLastName(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
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
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          value={dateOfBirth}
          placeholder="Format: YYYY-MM-DD"
          onChange={(e) => setDateOfBirth(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
          max="2009-09-08"
          aria-describedby="dateOfBirth-help"
        />
        <Form.Text id="dateOfBirth-help" muted>
          To join the workshop you have to be at least 15 years old.
        </Form.Text>
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.date_of_birth && error.date_of_birth.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          value={phone}
          placeholder="eg. 0123456789"
          onChange={(e) => setPhone(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.phone && error.phone.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Province/State & Country</Form.Label>
        <Form.Control
          type="text"
          value={province}
          placeholder="eg. Lam Dong, Vietnam"
          onChange={(e) => setProvince(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.province && error.province.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Facebook Profile</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            www.facebook.com/
          </InputGroup.Text>
          <Form.Control
            type="text"
            value={facebook}
            placeholder="eg. congdanhpham"
            onChange={(e) => setFacebook(e.target.value)}
            onBlur={e => e.target.parentElement.classList.add("was-validated")}
            required
          />
        </InputGroup>
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.facebook && error.facebook.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="eg. congdanh.pham@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.email && error.email.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Education Level</Form.Label>
        <Form.Control
          type="text"
          value={education}
          placeholder="eg. 11/12, 12/12, University Graduate, Master"
          onChange={(e) => setEducation(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.education && error.education.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>English Speaking Skills (1 - Beginner, 5 - Excellent)</Form.Label>
        <Form.Control
          type="number"
          value={englishLevel}
          min={1}
          max={5}
          placeholder="eg. 2"
          onChange={(e) => setEnglishLevel(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.english_level && error.english_level.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

function StepTwo({error, leader, setLeader}) {
  return (
    <>
      <h2>Roles of Citizens</h2>
      <p>Everyone in the city will have their role. You can create your own role or join the suggested roles.<br />
      We have several committees as follows, each committee will have a leader and members:</p>
      <h3>1. Movement Committee</h3>
      <ul>
        <li>Plan events in the city;</li>
        <li>Design and organise activities and programmes.</li>
      </ul>
      <h3>2. City Planning Committee</h3>
      <ul>
        <li>Manage and develop city facilities;</li>
        <li>Prepare necessary supplies for events;</li>
        <li>Solve problems related to facilities.</li>
      </ul>
      <h3>3. Farmers' Association</h3>
      <ul>
        <li>Take care of flowers and greenery (plants and trees) in the city with plans;</li>
        <li>Regularly check the quality and quantity of plants.</li>
      </ul>
      <h3>4. Knowledge Committee</h3>
      <ul>
        <li>Manage and arrange knowledge sources and books in the city, especially in events.</li>
      </ul>
      <h3>5. Diplomacy Committee</h3>
      <ul>
        <li>Communicate and negotiate with people and other cities;</li>
        <li>Call for and attract sponsorship.</li>
      </ul>
      <h3>6. Youth Community</h3>
      <ul>
        <li>Plan and implement communication activities;</li>
        <li>Organize online entertainment activities;</li>
        <li>Promote events and convey information to people in the city;</li>
        <li>Participate in decorating the city.</li>
      </ul>
      <h3>7. Technical Committee</h3>
      <ul>
        <li>Solve technical problems (repairing machines, solving online platform problems,...).</li>
        <li>Manage websites</li>
      </ul>
      <h3>8. Art Committee</h3>
      <ul>
        <li>Conceptualize and implement city decorations;</li>
        <li>Work with the Movement Committee to organize workshops to enhance the community's artistic knowledge and skills;</li>
        <li>Encourage city residents to participate in art projects to enhance creativity and connections between residents.</li>
      </ul>
      <h3>9. Health Committee</h3>
      <ul>
        <li>Take care of the health of the citizens</li>
        <li>Propose events to improve the general health</li>
      </ul>
      <h3>10. Finance Committee</h3>
      <ul>
        <li>Manage finance resources and budget</li>
        <li>Suggest events to raise funds</li>
        <li>Design and manage budgets for events</li>
      </ul>
      <h3>11. Sustainability Committee</h3>
      <ul>
        <li>Propose policies to use materials and resources efficiently</li>
        <li>Manage non-money resources</li>
      </ul>
      <h3>12. Ethics Committee</h3>
      <ul>
        <li>Propose and manage moral principles in the city and each event</li>
        <li>Propose goodwill, trustworthiness and fairness</li>
      </ul>
      <h3>13. Others</h3>
      <ul>
        <li>If you want to create a new committee, you can create your own role.</li>
      </ul>
      <Form.Group className="mb-3" key="leader">
        <Form.Label>Would you like to be a leader of any suggested committees?</Form.Label>
        <Form.Check
          type="radio"
          name="leader"
          value="yes"
          onChange={(e) => setLeader(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="Yes, I would."
          required
        />
        <Form.Check
          type="radio"
          name="leader"
          value="no"
          onChange={(e) => setLeader(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="No, I just want to be a normal member or citizen."
          required
        />
        <Form.Check
          type="radio"
          name="leader"
          value="own"
          onChange={(e) => setLeader(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="I want to create my own committee."
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.leader && error.leader.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  )
}

function StepThree({error, leader, committee, setCommittee,
  committeeDescription, setCommitteeDescription}) {
  const committeeSelectionYesNo = (
    <>
      <Form.Group className="mb-3" key="committee">
        <Form.Label>
          Which committee do you want to be a {leader=="yes" ? "leader" : "citizen"}?
        </Form.Label>
        <Form.Check
          type="radio"
          name="committee"
          value="Movement Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="1. Movement Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="City Planning Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="2. City Planning Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Farmers' Association"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="3. Farmers' Association"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Knowledge Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="4. Knowledge Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Diplomacy Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="5. Diplomacy Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Youth Community"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="6. Youth Community"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Technical Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="7. Technical Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Art Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="8. Art Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Health Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="9. Health Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Finance Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="10. Finance Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Sustainability Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="11. Sustainability Committee"
          required
        />
        <Form.Check
          type="radio"
          name="committee"
          value="Ethics Committee"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="12. Ethics Committee"
          required
        />
        {leader == "no" && (<Form.Check
          type="radio"
          name="committee"
          value="None"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          label="None of the above, I just want to be a normal citizen."
          required
        />)}
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.committee && error.committee.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
  const committeeSelectionOwn = (
    <>
      <Form.Group className="mb-3">
        <Form.Label>What's the committee do you want to establish?</Form.Label>
        <Form.Control
          type="text"
          value={committee}
          placeholder="Your Answer"
          onChange={(e) => setCommittee(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.committee && error.committee.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>What are the missions of this committee?</Form.Label>
        <Form.Control
          type="text"
          value={committeeDescription}
          placeholder="Your Answer"
          onChange={(e) => setCommitteeDescription(e.target.value)}
          onBlur={e => e.target.parentElement.classList.add("was-validated")}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          style={{display: "block"}}
        >
          {error.committee_description && error.committee_description.join(" ")}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
  return (
    <>
      {leader == "own" ? committeeSelectionOwn : committeeSelectionYesNo}
    </>
  )
}

function WorkshopSignup({workshopVariant}) {
  const [error, setError] = useState({}); // for server response
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  
  // step 1:
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [facebook, setFacebook] = useState('');
  const [province, setProvince] = useState('');
  const [education, setEducation] = useState('');
  const [englishLevel, setEnglishLevel] = useState('');
  
  // step 2:
  const [leader, setLeader] = useState('');
  
  // step 3:
  const [committee, setCommittee] = useState('');
  const [committeeDescription, setCommitteeDescription] = useState('');
  const [agree, setAgree] = useState(false);
  
  const handleRegistration = e => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
      setError({detail: "Please check your input!"});
      setHasError(true);
      return
    }
    const dataObj = {
      role: workshopVariant,
      password1: "rzbu4eiutan4pvot#",
      password2: "rzbu4eiutan4pvot#",
      username: email,
      description: "bla bla bla",
      role: "workshopper",
      first_name: firstName,
      last_name: lastName,
      email: email,
      date_of_birth: dateOfBirth,
      phone: phone,
      facebook_profile: `www.facebook.com/{facebook}`,
      province: province,
      education: education,
      english_level: englishLevel,
      leader: leader,
      committee: committee,
      committee_description: committeeDescription
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
  
  function handleNext(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.checkValidity() === false) {
      setError({detail: "Please check your input!"});
      setHasError(true);
      return
    }
    console.log(step+1);
    setStep(step + 1);
  }
  
  function handleBack() {
    console.log(step-1);
    setStep(step - 1);
  }
  
  document.title = "One-Building City Sign-up";
  
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
              <source src={workshopVariant == 1 ? video : video2} type="video/mp4" />
            </video>
            <div class="workshop-information">
              <h1>Decision-Making Role Play</h1>
              <h2>Workshop Information</h2>
              <p>
                <dl>
                  <dt>When</dt>
                  <dd>Wednesday, September 8th, from 8:00 to 11:00&nbsp;AM</dd>
                  <dt>Where</dt>
                  <dd>Harry DAN's Library at 140 Đường Lê Văn Tám, Phường 2, Thành phố Bảo Lộc</dd>
                  <dt>Price</dt>
                  <dd>Free for the first 25 registrants. After that, 50,000 VND per person.</dd>
                </dl>
              </p>
            </div>
          </Col>
          <Col md={6} lg="auto">
            <div class="form-wrapper">
              <h2>One-Building City Sign-up</h2>
              <Tabs
                activeKey={step}
                onSelect={(k) => setStep(k)}
                className="mb-3"
              >
                <Tab eventKey={1} title={1}>
                  <Form onSubmit={handleNext}>
                    <StepOne
                      error={error}
                      firstName={firstName}
                      setFirstName={setFirstName}
                      lastName={lastName}
                      setLastName={setLastName}
                      email={email}
                      setEmail={setEmail}
                      dateOfBirth={dateOfBirth}
                      setDateOfBirth={setDateOfBirth}
                      phone={phone}
                      setPhone={setPhone}
                      facebook={facebook}
                      setFacebook={setFacebook}
                      province={province}
                      setProvince={setProvince}
                      education={education}
                      setEducation={setEducation}
                      englishLevel={englishLevel}
                      setEnglishLevel={setEnglishLevel}
                    />
                    <Button
                      variant="primary"
                      type="submit"
                    >Next</Button>
                  </Form>
                </Tab>
                <Tab eventKey={2} title={2}>
                  <Form onSubmit={handleNext}>
                    <StepTwo
                      error={error}
                      leader={leader}
                      setLeader={setLeader}
                    />
                    <Button variant="primary" onClick={handleBack}>Back</Button>
                    <Button type="submit" variant="primary">Next</Button>
                  </Form>
                </Tab>
                <Tab eventKey={3} title={3}>
                  <Form onSubmit={handleRegistration}>
                    <StepThree
                      error={error}
                      leader={leader}
                      committee={committee}
                      setCommittee={setCommittee}
                      setCommitteeDescription={setCommitteeDescription}
                    />
                    <Form.Group className="mb-3" key="committee">
                      <Form.Label>
                        Data Processing
                      </Form.Label>
                      <Form.Check
                        type="checkbox"
                        name="committee"
                        value="Movement Committee"
                        onChange={(e) => setCommittee(e.target.value)}
                        onBlur={e => e.target.parentElement.classList.add("was-validated")}
                        label={<>I consent to my data being processed for the purposes explained in the <a href="/legal#privacy">privacy policy</a></>}
                        required
                      />
                      {leader == "no" && (<Form.Check
                        type="radio"
                        name="committee"
                        value="None"
                        onChange={(e) => setCommittee(e.target.value)}
                        onBlur={e => e.target.parentElement.classList.add("was-validated")}
                        label="None of the above, I just want to be a normal citizen."
                        required
                      />)}
                      <Form.Control.Feedback
                        type="invalid"
                        style={{display: "block"}}
                      >
                        {error.committee && error.committee.join(" ")}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" onClick={handleBack}>Back</Button>
                    <Button variant="primary" type="submit">Sign up!</Button>
                  </Form>
                </Tab>
              </Tabs>
              <p id="required">* required</p>
              {hasError && <Alert variant="warning" className="mt-3">
                <details>
                  <summary>An error occured!</summary>
                  {Object.values(error).join('\n')}
                </details>
              </Alert>}
            </div>
          </Col>
        </Row>)
      }
      <a href="/legal">Legal information</a>
    </main>
  );
}

export default WorkshopSignup;

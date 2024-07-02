import { Link } from 'react-router-dom';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { House, Palette, Newspaper, CalendarEvent,
         Diagram3, PeopleFill, Cast, Display,
         FileImage, PersonGear, Brush, Megaphone,
         PersonRaisedHand, Ban } from 'react-bootstrap-icons';
import logo from '../graphics/DNL_Logo.png';

const LeftNavbar = ({show, closeNavbar}) => {
  return (
    <Offcanvas
      responsive="lg"
      show={show}
      onHide={closeNavbar}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <a href="/">
            <img src={logo} alt="DNL Logo" width="30" height="28" />
          </a>
        </Offcanvas.Title>
      </Offcanvas.Header>
       <Offcanvas.Body>
        <Navbar sticky="top" expand={false}>
          <Nav>
            <Nav.Link href="/">
              <House className="me-2" />
              Start
            </Nav.Link>
            <Nav.Link href="/about">
              <img className="bi me-2" width="18" height="16" src={logo} alt="DNL Logo" />
              Über uns
            </Nav.Link>
            <NavDropdown
              title={(<><Palette className="me-2" />Kanäle</>)}
            >
              <NavDropdown.Item href="/news">
                <Newspaper className="me-2" />
                Neuigkeiten
              </NavDropdown.Item>
              <NavDropdown.Item href="/events">
                <CalendarEvent className="me-2" />
                Veranstaltungen
              </NavDropdown.Item>
              <NavDropdown.Item href="/projects">
                <Diagram3 className="me-2" />
                Projekte
              </NavDropdown.Item>
              <NavDropdown.Item href="/actors">
                <PeopleFill className="me-2" />
                Akteure
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={(<><Cast className="me-2" />Media</>)}
            >
              <NavDropdown.Item href="/displays">
                <Display className="me-2" />
                Democracy Displays
              </NavDropdown.Item>
              <NavDropdown.Item href="/posters">
                <FileImage className="me-2" />
                Democracy Poster
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={(<><PersonGear className="me-2" />Rollen</>)}
            >
              <NavDropdown.Item href="/creators">
                <Brush className="me-2" />
                Creator
              </NavDropdown.Item>
              <NavDropdown.Item href="/messengers">
                <Megaphone className="me-2" />
                Messenger
              </NavDropdown.Item>
              <NavDropdown.Item href="/voters">
                <PersonRaisedHand className="me-2" />
                Voter
              </NavDropdown.Item>
              <NavDropdown.Item href="/moderators">
                <Ban className="me-2" />
                Moderator
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>          
        </Navbar>
       </Offcanvas.Body>
    </Offcanvas>
  )
};

export default LeftNavbar;
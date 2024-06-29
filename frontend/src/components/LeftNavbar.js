import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { House, Palette, Newspaper, CalendarEvent,
         Diagram3, PeopleFill, Cast, Display,
         FileImage, PersonGear, Brush, Megaphone,
         PersonRaisedHand, Ban } from 'react-bootstrap-icons';
import logo from '../graphics/DNL_Logo.png';

const LeftNavbar = () => {
  return (
    <nav>
      <header className="offcanvas-header">
        <h1 className="offcanvas-title">
            <a href="#">
              <img src={logo} alt="DNL Logo" width="30" height="28" />
            </a>
        </h1>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </header>
      <div className="offcanvas-body">
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px"}}>
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none navbar-brand">
            <img src={logo} alt="DNL Logo" style={{width: "100%"}} />
            Democracy Next Level
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                <House className="me-2" />
                Start
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis">
                <img className="bi me-2" width="18" height="16" src={logo} alt="DNL Logo" />
                Über uns
              </a>
            </li>
            <li>
              <a href="#channels" className="nav-link link-body-emphasis me-4" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="channels">
                <Palette className="me-2" />
                Kanäle
              </a>
              <ul className="nav ms-4 collapse" id="channels">
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <Newspaper className="me-2" />
                    Neuigkeiten
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <CalendarEvent className="me-2" />
                    Veranstaltungen
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <Diagram3 className="me-2" />
                    Projekte
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <PeopleFill className="me-2" />
                    Akteure
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#media" className="nav-link link-body-emphasis me-4" style={{marginTop: "300px"}} role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="media">
                <Cast className="me-2" />
                Media
              </a>
              <ul className="nav ms-4 collapse" id="media">
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <Display className="me-2" />
                    Democracy Displays
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <FileImage className="me-2" />
                    Democracy Poster
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#roles" className="nav-link link-body-emphasis me-4" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="roles">
                <PersonGear className="me-2" />
                Rollen
              </a>
              <ul className="nav ms-4 collapse" id="roles">
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <Brush className="me-2" />
                    Creator
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <Megaphone className="me-2" />
                    Messenger
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <PersonRaisedHand className="me-2" />
                    Voter
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-body-emphasis">
                    <Ban className="me-2" />
                    Moderator
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
              <strong>Max Mustermann</strong>
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default LeftNavbar;
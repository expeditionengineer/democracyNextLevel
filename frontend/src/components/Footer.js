import { Link } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <footer>
      <Navbar>
        <Nav>
          <Nav.Link href="/datenschutz">
            Datenschutz
          </Nav.Link>
          <Nav.Link href="/impressum">
            Impressum
          </Nav.Link>
        </Nav>
      </Navbar>
    </footer>
  )
};

export default Footer;
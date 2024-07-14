import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import Dropdown from 'react-bootstrap/Dropdown';
import { Search } from 'react-bootstrap-icons';

const TopNavbar = ({showLeftNavbar}) => {
  return (
    <Navbar sticky="top" expand="lg">
      <Container fluid>
        {/* NavbarToggler */}
        <button
          onClick={showLeftNavbar}
          className="navbar-toggler"
        >
           <span className="navbar-toggler-icon"></span>
        </button>
        {/* SearchBar */}
        <Form role="search" inline>
          <InputGroup>
            <InputGroup.Text id="basic-addon1"><Search /></InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="search"
              aria-describedby="basic-addon1"
            />
            <Button type="submit">Suchen</Button>
          </InputGroup>
        </Form>
        <Dropdown
          align={{ xs: 'start' }}
        >
          <Dropdown.Toggle variant="text">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong className="d-none d-lg-inline">Max Mustermann</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Profil</Dropdown.Item>
            <Dropdown.Item href="#">Einstellungen</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  )
};

export default TopNavbar;
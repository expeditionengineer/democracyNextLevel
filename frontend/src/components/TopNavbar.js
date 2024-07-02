import { Link } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Search } from 'react-bootstrap-icons';

const TopNavbar = () => {
  return (
    <Navbar sticky="top">
      <Container>
        {/* NavbarToggler */}
        {/* <Navbar.Toggler></Navbar.Toggler> */}
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
        <Navbar.Text>DNL</Navbar.Text>
      </Container>
    </Navbar>
  )
};

export default TopNavbar;
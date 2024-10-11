import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
 const navigate = useNavigate();
 const [userData, setUserData] = useState({});
 const [fetchedUserData, setFetchedUserData] = useState(false);
 const [loggedIn, setLoggedIn] = useState(false);

  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if (token != undefined) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
    }
  )

  useEffect(
    () => {
      const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch("http://127.0.0.1:8000/user", {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',  // Set content type
              'Authorization': `Token ${token}`,  // Append the token to the Authorization header
            },
          });
          if (!response.ok) {
          throw new Error('Failed to fetch data');
          }
            const json = await response.json();
            setUserData(json);
            setFetchedUserData(true);
            setLoggedIn(true);

        } catch (error) {
          console.error("Error occured: ", error)
        }
      }
      fetchUserData();
    }, []);

  const logout = (e) => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  }

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
        { fetchedUserData && loggedIn ? (
        <Dropdown
          align={{ xs: 'start' }}
        >
        <Dropdown.Toggle variant="text">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
    <strong className="d-none d-lg-inline">{`${userData.first_name} ${userData.last_name}`}</strong>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Profil</Dropdown.Item>
            <Dropdown.Item href="#">Einstellungen</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>)
      : null }
      </Container>
    </Navbar>
  )
};

export default TopNavbar;

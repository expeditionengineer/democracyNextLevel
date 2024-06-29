import { Link } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Search } from 'react-bootstrap-icons';

const TopNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* NavbarToggler */}
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#leftNavbar" aria-controls="leftNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* SearchBar */}
        <form className="d-flex" role="search">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><Search className="me-2" /></span>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </div>
        </form>
        <span className="navbar-text">DNL</span>
      </div>
    </nav>
  )
};

export default TopNavbar;
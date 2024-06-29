import { Outlet, Link } from 'react-router-dom';

import LeftNavbar from '../components/LeftNavbar.js';
import TopNavbar from '../components/TopNavbar.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';

import './Layout.css';
import logo from '../graphics/DNL_Logo.png';
import full_logo from '../graphics/DNL_Logo_mit_Schrift.png';

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        {/* LeftNavbar */}
	      <Col as="nav" xs={3} className="offcanvas-lg offcanvas-start" tabindex="-1" id="leftNavbar">
	        <LeftNavbar />
        </Col>
        <Col>
          {/* TopNavbar */}
	        <TopNavbar />
	        {/* Content */}
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
};

export default Layout;
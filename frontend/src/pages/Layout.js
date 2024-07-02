import { Outlet, Link } from 'react-router-dom';

import LeftNavbar from '../components/LeftNavbar.js';
import TopNavbar from '../components/TopNavbar.js';
import Footer from '../components/Footer.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Layout.css';
import logo from '../graphics/DNL_Logo.png';
import full_logo from '../graphics/DNL_Logo_mit_Schrift.png';

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        {/* LeftNavbar */}
	      <Col className="col-auto">
	        <LeftNavbar />
        </Col>
        <Col>
          {/* TopNavbar */}
	        <TopNavbar />
	        {/* Content */}
          <Outlet />
          <Footer />
        </Col>
      </Row>
    </Container>
  )
};

export default Layout;
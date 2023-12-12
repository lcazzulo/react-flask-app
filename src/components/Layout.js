import { Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
    return (
        <>
        <nav>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Flask</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">Bookstore</Link>
              <Link className="nav-link" to="/temperature">Temperature</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </nav>
      <Outlet />
      </>
    );
  }

export default Layout;
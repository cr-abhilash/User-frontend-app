import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";



/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = props.login;

  const logout = () => {
   
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item" style={{cursor:"pointer"}}>
          <span className="nav-link" onClick={props.handleSignout}>
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          User App
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          {auth ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

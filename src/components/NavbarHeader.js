import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavbarHeader = () =>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Invoice App</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1}>
          <Link className="item" to="/products">Products</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link className="item" to="/customers">Customers</Link>
        </NavItem>
        <NavItem eventKey={3}>
          <Link className="item" to="/invoices">Invoices</Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

export default NavbarHeader;

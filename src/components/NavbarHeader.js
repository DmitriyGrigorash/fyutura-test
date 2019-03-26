import React from 'react';
// import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarHeader = () =>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Invoice App</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="Products">products</Nav.Link>
            <Nav.Link href="Customers">customers</Nav.Link>
        </Nav>
    </Navbar>;
export default NavbarHeader;

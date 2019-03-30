import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarHeader = () =>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Invoice App</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/products">products</Nav.Link>
            <Nav.Link href="/customers">customers</Nav.Link>
        </Nav>
    </Navbar>;
export default NavbarHeader;

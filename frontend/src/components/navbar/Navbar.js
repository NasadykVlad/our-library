import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";


function NavBar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Наша Бібліотека</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Головна</Nav.Link>
                            <Nav.Link href="#features">Новинки</Nav.Link>
                            <Nav.Link href="#pricing">Про Нас</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/register">Реєстрація</Nav.Link>
                            <Nav.Link href="/login">Вхід</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;

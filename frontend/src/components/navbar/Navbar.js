import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";


function NavBar({isLogin}) {

    const logOut = () => {
        localStorage.removeItem('userData')
        return true
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Наша Бібліотека</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            isLogin ?  <Nav className="me-auto">
                                <Nav.Link href="/">login</Nav.Link>
                            </Nav> : <Nav className="me-auto">
                                <Nav.Link href="/">Головна</Nav.Link>
                                <Nav.Link href="#features">Новинки</Nav.Link>
                                <Nav.Link href="#pricing">Про Нас</Nav.Link>
                            </Nav>
                        }
                        {
                            isLogin ?  <Nav>
                                    <Nav>
                                        <Nav.Link onClick={logOut()} href="/">Выйти</Nav.Link>
                                    </Nav>
                                </Nav>  :
                                <Nav>
                                <Nav>
                                    <Nav.Link href="/register">Реєстрація</Nav.Link>
                                    <Nav.Link href="/login">Вхід</Nav.Link>
                                </Nav>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;

import React, { useContext } from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext";



function NavBar() {

    const logOut = () => {
        localStorage.removeItem('userData')
        return true
    }

    const {isLogin} = useContext(AuthContext)

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Наша Бібліотека</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            isLogin ?  <Nav className="me-auto">
                                <Nav.Link href="/list-of-books">Твої книжки</Nav.Link>
                            </Nav> : <Nav className="me-auto">
                                <Nav.Link href="/features">Новинки</Nav.Link>
                                <Nav.Link href="/about">Про Нас</Nav.Link>
                            </Nav>
                        }
                        {
                            isLogin ?  <Nav>
                                    <Nav>
                                        <Nav.Link onClick={() => logOut()} href="/">Вийти</Nav.Link>
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

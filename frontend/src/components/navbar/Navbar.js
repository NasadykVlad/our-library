import React, { useContext } from 'react'
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import './navbar.scss'
import {AuthContext} from "../../context/AuthContext";
import { withNamespaces } from 'react-i18next';
import i18n from "../../i18n";



function NavBar({t}) {

    const logOut = () => {
        localStorage.removeItem('userData')
        return true
    }

    const {isLogin} = useContext(AuthContext)

    function changeLanguage(lng) {
        if (lng) {
            i18n.changeLanguage(lng);
        }
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">{t('ourLibrary')}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            isLogin ?  <Nav className="me-auto">
                                <Nav.Link href="/list-of-books">{t('your-books')}</Nav.Link>
                                <Nav.Link href="/filecloud">Файлова хмара</Nav.Link>
                            </Nav> : <Nav className="me-auto">
                                <Nav.Link href="/features">{t('news')}</Nav.Link>
                                <Nav.Link href="/about">{t('about')}</Nav.Link>
                            </Nav>
                        }
                        <NavDropdown title={t('lang')} className="navbar-dark navbar-nav nav-link" id="navbarScrollingDropdown">
                            <NavDropdown.Item className={i18n.language === 'ua' ? 'uaPick' : false} onClick={() => changeLanguage('ua')}>{t('ua')}</NavDropdown.Item>
                            <NavDropdown.Item className={i18n.language === 'en' ? 'enPick' : false} onClick={() => changeLanguage('en')}>{t('en')}</NavDropdown.Item>
                        </NavDropdown>
                        {
                            isLogin ?  <Nav>
                                    <Nav>
                                        <Nav.Link onClick={() => logOut()} href="/">{t('exit')}</Nav.Link>
                                    </Nav>
                                </Nav>  :
                                <Nav>
                                <Nav>
                                    <Nav.Link href="/register">{t('register')}</Nav.Link>
                                    <Nav.Link href="/login">{t('login')}</Nav.Link>
                                </Nav>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default withNamespaces()(NavBar);

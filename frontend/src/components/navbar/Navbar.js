import React, {useContext} from 'react'
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import './Navbar.scss'
import {Link} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import {withNamespaces} from 'react-i18next';
import i18n from "../../i18n";


function NavBar({t}) {

    const logOut = () => {
        localStorage.removeItem('userData')

        const link = document.createElement('a')
                link.href = 'http://localhost:3000/'
                link.click()
                link.remove()

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
                    <Link className="navbar-brand" to="/">{t('ourLibrary')}</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {
                            isLogin ? <Nav className="me-auto">
                                <Link className="nav-link" to="/list-of-books">{t('your-books')}</Link>
                                <Link className="nav-link" to="/filecloud">{t('file-cloud')}</Link>
                                <Link className="nav-link" to="/account">{t('account-settings')}</Link>
                            </Nav> : <Nav className="me-auto">
                                <Link className="nav-link" to="/features">{t('news')}</Link>
                                <Link className="nav-link" to="/about">{t('about')}</Link>
                            </Nav>
                        }
                        <NavDropdown title={t('lang')} className="navbar-dark navbar-nav nav-link"
                                     id="navbarScrollingDropdown">
                            <NavDropdown.Item className={i18n.language === 'ua' ? 'uaPick' : false}
                                              onClick={() => changeLanguage('ua')}>{t('ua')}</NavDropdown.Item>
                            <NavDropdown.Item className={i18n.language === 'en' ? 'enPick' : false}
                                              onClick={() => changeLanguage('en')}>{t('en')}</NavDropdown.Item>
                        </NavDropdown>
                        {
                            isLogin ? <Nav>
                                    <Nav>
                                        <Link className="nav-link" onClick={() => logOut()} to="/">{t('exit')}</Link>
                                    </Nav>
                                </Nav> :
                                <Nav>
                                    <Nav>
                                        <Link className="nav-link" to="/register">{t('register')}</Link>
                                        <Link className="nav-link" to="/login">{t('login')}</Link>
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

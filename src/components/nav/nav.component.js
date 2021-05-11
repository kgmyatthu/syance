import React, { useRef, useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import styles from "./nav.module.css";
import "./nav.module.css";
import {URLS} from '../settings';
import {SiAtom} from 'react-icons/si';



export default function Navigation() {

    let [gap,setGap] = useState();
    let navbar = useRef();
    
    useEffect(()=>{
        setGap(navbar.current.clientHeight + 10);
    },[]);
  
    return (
        <>
            <Navbar ref={navbar} className={styles.customNav} expand="lg" fixed="top" variant="custom">
                <div className="container">
                    <Navbar.Brand href="/">
                        <Row>
                            <Col md="2">
                            {/* <img
                                alt="nasa logo"
                                src="/NASA_logo.svg"
                                width="50"
                                height="50"
                                className={styles.hidesm}
                            />{' '} */}
                            <SiAtom size={50} className={styles.logo}/>
                            </Col>
                            <Col md="10" sm="12">
                                <h1 className={[styles.links,styles.spacingM,styles.txtshadow].join(" ")}>
                                    <span className={styles.bebas}>&nbsp;S&nbsp;I&nbsp;A&nbsp;N&nbsp;S&nbsp;E</span>
                                </h1>
                            </Col>
                        </Row>
                    </Navbar.Brand>
                    <Navbar.Toggle className={styles.customNavToggle} aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav className={[styles.roboto,styles.links,styles.spacingS].join(" ")}>
                            <NavDropdown  className={styles.customdd} title="&nbsp;01.Explore" id="collasible-nav-dropdown">
                                <NavDropdown.Item href={URLS.APOD_ROOT}><span className={styles.nospacing}>Astronomy Picture of the Day</span></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"><span className={styles.nospacing}>Asteroids - NeoWs</span></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3"><span className={styles.nospacing}>Mars Weather</span></NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="">&nbsp;02.About</Nav.Link>
                            <NavDropdown  className={styles.customdd} title="&nbsp;03.Share" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"><span className={styles.nospacing}>Facebook</span></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"><span className={styles.nospacing}>Twitter</span></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <div style={{height : gap }} className="container-fluid"></div>
        </>    
    )
}

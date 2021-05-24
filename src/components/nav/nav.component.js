import React, { useRef, useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import styles from "./nav.module.css";
import "./nav.module.css";
import {URLS} from '../settings';
import {SiAtom} from 'react-icons/si';
import { useLocation } from 'react-router';



export default function Navigation({nopad}) {

    let [gap,setGap] = useState();
    let navbar = useRef();
    let [fbshare, setFbshare] = useState(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
    let [tshare,setTshare] = useState(`https://twitter.com/intent/tweet?text=${window.location.href}`);
  
    useEffect(()=>{
        console.log(window.location.href)
        setGap(navbar.current.clientHeight + 10);
    },[]);
  
    const shareit = (url) =>{
        window.open('https://www.facebook.com','width=600,height=400');
    }

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
                                    <span className={styles.bebas}>&nbsp;S&nbsp;Y&nbsp;A&nbsp;N&nbsp;C&nbsp;E</span>
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
                              
                                <NavDropdown.Item href={URLS.APOD()}><span className={styles.nospacing}>Astronomy Picture of the Day</span></NavDropdown.Item>
                                <NavDropdown.Item href={URLS.SENTRY()}><span className={styles.nospacing}>NASA Impact Risk : Sentry</span></NavDropdown.Item>
                                <NavDropdown.Item href={URLS.NHATS()}><span className={styles.nospacing}>Human Accessible NEO(s) : NHATS</span></NavDropdown.Item>
                                <NavDropdown.Item href={URLS.ORBIT()}><span className={styles.nospacing}>3D Orbit Viewer</span></NavDropdown.Item>
                              
                            </NavDropdown>
                            <Nav.Link href={URLS.ABOUT()}>&nbsp;02.About</Nav.Link>
                            <NavDropdown  className={styles.customdd} title="&nbsp;03.Share" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1"><span className={styles.nospacing}><a className={styles.sharelink} href={fbshare} target="_blank" rel="noopener noreferrer">Facebook</a></span></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2"><span className={styles.nospacing}><a className={styles.sharelink} whref={tshare} target="_blank" rel="noopener noreferrer">Twitter</a></span></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            {nopad? <></> : <div style={{height : gap }} className="container-fluid"></div>}
        </>    
    )
}

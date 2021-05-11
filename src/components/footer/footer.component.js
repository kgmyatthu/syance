import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../../assets/css/util.module.css';
const Footer = () => {
    return (
        <Container className={[styles.white,styles.mono,styles.padding1].join(" ")}>
            <Row className={styles.height10vh}>

            </Row>
            <Row>
                <Col className={["text-center","mx-auto"].join(" ")}>
                    <p className="align-middle text-muted">
                        <span style={{color:""}}>&nbsp;Design&nbsp;</span>
                        and 
                        <span style={{color:""}}>&nbsp;Built&nbsp;</span>
                        by 
                        <span className="text-lead" style={{color:"white"}}>&nbsp;Kaung Myat Thu&nbsp;</span>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;
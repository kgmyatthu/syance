import React from 'react';
import Navigation from './nav/nav.component';
import {SentrySummeryTable} from './table/table.component';
import Footer from './footer/footer.component';
import { Col, Row, Jumbotron, Container } from 'react-bootstrap';
import styles from '../assets/css/sentry.module.css';

const Sentry = () => {

    return (
        <>  
            <Navigation/>
                <Container >

                    <Row >
                        <Col>
                            <Jumbotron style={{backgroundColor:"black",color:"white",fontFamily:"ibmmono"}}>
                                <h1>Impact Risk Data</h1>
                                <p>The following table summarizes by object the potential future Earth impact events that the JPL Sentry System has detected based on currently available observations. Click on the object designation to go to a page with full details on that object.</p>
                                <p className={styles.hidesm}>Sentry is a highly automated collision monitoring system that continually scans the most current asteroid catalog for possibilities of future impact with Earth over the next 100 years. Whenever a potential impact is detected it will be analyzed and the results immediately published here, except in unusual cases where we seek independent confirmation. It is normal that, as additional observations become available, objects will disappear from this table whenever there are no longer any potential impact detections.</p>
                            </Jumbotron>
                        </Col>
                    </Row>


                </Container>
                <Row>
                    <Col></Col>
                    <Col className="mx-auto" md={12} lg={8}>
                        <SentrySummeryTable/>
                    </Col>
                    <Col></Col>
                </Row>
       
            <Footer/>
        </>
    )
}
export default Sentry;
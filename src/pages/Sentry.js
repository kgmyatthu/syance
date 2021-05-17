import React from 'react';
import Navigation from '../components/nav/nav.component';
import {SentrySummeryTable} from '../components/table/table.component';
import Footer from '../components/footer/footer.component';
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
                                <h1>SENTRY : Long-term impact monitoring for confirmed NEOs</h1>
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
                <Row>
                    <Container>
                    <Jumbotron style={{backgroundColor:"black",color:"white",fontFamily:"ibmmono"}} className={styles.definations}>
                            <h3>
                                Object Designation
                            </h3>
                            <p>
                            Temporary designation or permanent number for this object.
                            </p>
                            <h3>
                                    Year Range
                            </h3>
                            <p>
                            Time span over which impacts have been detected. Typically, searches are conducted 100 years into the future.
                            </p>
                            <h3>
                                    Potential Impacts
                            </h3>
                            <p>
                            Number of dynamically distinct potential impacts that have been detected by Sentry. There can be several qualitatively unique pathways to impact in a given year, e.g., some with an extra revolutions around the sun, others deflected to impact by an earlier planetary encounter.
                            </p>
                            <h3>
                                    Impact Probability (cumulative)
                            </h3>
                            <p>
                            Sum of the impact probabilities from all detected potential impacts.
                            </p>
                            <h3>
                                    Vinfinity (km/s)
                            </h3>
                            <p>
                            Velocity of the asteroid relative to the Earth, assuming a massless Earth.
                            </p>
                            <h3>
                                    H (mag)
                            </h3>
                            <p>
                            Absolute Magnitude, a measure of intrinsic brightness. It is the apparent magnitude of the object when it is 1 au from both the sun and the observer, and at full phase for the observer.
                            </p>
                            <h3>
                                    Estimated Diameter (km)
                            </h3>
                            <p>
                            Estimated diameter of the asteroid. This is an estimate based on the absolute magnitude, usually assuming a uniform spherical body with visual albedo pV = 0.154 (in accordance with the Palermo Scale) but sometimes using actual measured values if these are available. Since the albedo is rarely known for objects on this page, the diameter estimate should be considered only approximate, but in most cases will be accurate to within a factor of two.
                            </p>
                            <h3>
                                    Palermo Scale (cum.)
                            </h3>
                            <p>
                            Cumulative hazard rating according to the Palermo technical impact hazard scale, based on the tabulated impact date, impact probability and impact energy.
                            </p>
                            <h3>
                                    Palermo Scale (max.)
                            </h3>
                            <p>
                            Maximum hazard rating according to the Palermo technical impact hazard scale, based on the tabulated impact date, impact probability and impact energy.
                            </p>
                            <h3>
                                    Torino Scale (max.)
                            </h3>
                            <p>
                            Maximum detected hazard rating according to the Torino impact hazard scale, based on the tabulated impact probability and impact energy. The Torino scale is defined only for potential impacts less than 100 years in the future.
                            </p>
                        </Jumbotron>
                    </Container>
                </Row>
            <Footer/>
        </>
    )
}
export default Sentry;
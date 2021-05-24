import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, Image } from 'react-bootstrap';
import styles from "../assets/css/home.module.css";

import Footer from '../components/footer/footer.component';
import Navigation from '../components/nav/nav.component';
import { OrbitViewer } from '../components/orbit/orbit.component';
import { API_KEY, URLS } from '../components/settings';
import { SentrySummeryTable } from '../components/table/table.component';

const Home = () => {

    let [APOD_DATA, setAPOD_DATA] = useState({});

    let getAPOD_DATA = () => {

        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
            .then(res => setAPOD_DATA(res.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getAPOD_DATA();
    }, [])

    return (
        <>
            <Navigation/>
            
                    <Container>
                        <Row className={styles.rowmargin}>
                            <Col sm={12} md={6}>
                                <Jumbotron className={styles.jumbo}>
                                    <h1 className={[styles.logo].join(" ")}>APOD</h1>
                                    <p className="text-lead">Astronomy Picture Of The Day</p>
                                    <hr style={{backgroundColor:"white"}}></hr>
                                    <p>Astronomy Picture of the day is a NASA backed API with which each day a different image or photograph of our universe is featured, along with a brief explanation written by a professional astronomer.</p>
                                    <p className="text-muted">Browse APOD of the past 15 years which has been featured by NASA. </p>
                                    <a className={styles.button} href={URLS.APOD()}>Browse</a>
                                </Jumbotron>
                            </Col>
                            <Col sm={12} md={6} className={styles.flexcenter}>
                                { APOD_DATA.media_type === 'video'?
                                    <iframe style={{width:"100%", height:"50vh", border:"2px solid white"}}  src={APOD_DATA.url} title="video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    :
                                    <>
                                    <a href={URLS.APOD()}>
                                        <Image style={{border:"2px solid white", boxShadow:"14px 14px white"}}src={APOD_DATA.url} alt={APOD_DATA.title} fluid />
                                    </a>
                                    </>
                                }
                                <small className={styles.overlaytitle}>{APOD_DATA.title}</small>

                            </Col>
                        </Row>
                        <Row className={styles.rowmargin}>
                            <Col sm={12} md={6} className={styles.flexcenter}>
                                    <a href={URLS.SENTRY()}>
                                        <Image style={{border:"2px solid white", boxShadow:"14px 14px white"}}src={"media/sentryss.png"} alt={"screen shot"} fluid />
                                    </a>
                                    
                            </Col>
                            <Col sm={12} md={6}>
                                <Jumbotron className={styles.jumbo}>
                                    <h1 className={[styles.logo].join(" ")}>SENTRY</h1>
                                    <p className="text-lead">Sentry: Earth Impact Monitoring</p>
                                    <hr style={{backgroundColor:"white"}}></hr>
                                    <p>Sentry is a highly automated collision monitoring system that continually scans the most current asteroid catalog for possibilities of future impact with Earth over the next 100 years.</p>
                                    <p className="text-muted">Browse asteriods that could potentialy impact earth in 100years </p>
                                    <a className={styles.button} href={URLS.SENTRY()}>SEE ALL</a>
                                </Jumbotron>
                                
                            </Col>
                        </Row>
                        <Row className={styles.rowmargin}>
                            <Col sm={12} md={6} >
                                <Jumbotron className={styles.jumbo}>
                                    <h1 className={[styles.logo].join(" ")}>NHATS</h1>
                                    <p className="text-lead">Near-Earth Object Human Space Flight Accessible Targets Study (NHATS)</p>
                                    <hr style={{backgroundColor:"white"}}></hr>
                                    <p> Near-Earth Object Human Space Flight Accessible Targets Study (NHATS) (pron.: /næts/) is to identify known near-Earth objects (NEOs), particularly near-Earth asteroids (NEAs), that may be accessible for future human space flight missions.</p>
                                    <p className="text-muted">Browse and visualize a list of available NHATS</p>
                                    <a className={styles.button} href={URLS.NHATS()}>SEE ALL</a>
                                </Jumbotron>
                            </Col>
                            <Col sm={12} md={6} className={styles.flexcenter}>
                                    <a href={URLS.NHATS()}>
                                        <Image style={{border:"2px solid white", boxShadow:"14px 14px white"}}src={"media/nhatsss.png"} alt={"screen shot"} fluid />
                                    </a>
                            </Col>
                        </Row>
                        <Row className={styles.rowmargin}>
                            <Col sm={12} md={6} className={styles.flexcenter}>
                                <OrbitViewer/>
                            </Col>
                            <Col sm={12} md={6}>
                                <Jumbotron className={styles.jumbo}>
                                    <h1 className={[styles.logo].join(" ")}>3D OV</h1>
                                    <p className="text-lead">3D Orbit Viewer</p>
                                    <hr style={{backgroundColor:"white"}}></hr>
                                    <p>Visualize Orbits in 3 Dimension. This orbit viewer was written and developed at JPL by Kevin Gill with contributions from Paul Chodas, Javier Roa, and Alan Chamberlin. Written in JavaScript, it makes use of WebGL via the open-source three.js package.</p>
                                    <p className="text-muted">Play with Orbit Viewer</p>
                                    <a className={styles.button} href={URLS.ORBIT()}>PLAY</a>
                                </Jumbotron>
                            </Col>
                        </Row>

                    </Container>
            <Footer />
        </>
    )
}


export default Home;
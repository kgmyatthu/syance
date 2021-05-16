import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import styles from "../assets/css/util.module.css";
import APOD from '../components/apod/apod.component';
import Footer from '../components/footer/footer.component';
import Navigation from '../components/nav/nav.component';
import { API_KEY, URLS } from '../components/settings';

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
            <Navigation></Navigation>
            <Container>
                <Col className="mx-auto" md="10" sm="12">
                    <APOD data={APOD_DATA}>
                        <div style={{ textAlign: "center" }}>
                            <br />
                            <a className={styles.button} href={URLS.APOD_ROOT}><small>Learn More</small></a>
                        </div>
                    </APOD>
                </Col>
            </Container>
            <Footer />
        </>
    )
}


export default Home;
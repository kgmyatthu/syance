import React, { useEffect,  useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import Navigation from './nav/nav.component';
import APOD from './apod/apod.component';
import styles from "../assets/css/util.module.css";
import axios from 'axios';
import { API_KEY, URLS } from './settings';
import Footer from './footer/footer.component';

const Home = () => {

    let [APOD_DATA, setAPOD_DATA] = useState({});

    let getAPOD_DATA = () =>{

        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
            .then(res => setAPOD_DATA(res.data))
            .catch(err => console.log(err));
    }
    
    useEffect(()=>{
        getAPOD_DATA();
    },[])

    return (
        <>
            <Navigation></Navigation>
            <Container>
                <Col className="mx-auto" md="10" sm="12">
                    <APOD data={APOD_DATA}>
                        <div style={{textAlign:"center"}}>
                            <br/>
                            <a className={styles.button} href={URLS.APOD_ROOT}><small>Learn More</small></a>
                        </div>
                    </APOD>
                </Col>
            </Container>
            <Footer/>
        </>
    )
}


export default Home;
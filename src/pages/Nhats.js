import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import Navigation from '../components/nav/nav.component';
import { OrbitalElementTable, NhatsTable, OrbitDeterminationParameterTable } from '../components/table/table.component';
import styles from '../assets/css/neo.module.css';
import { useParams } from 'react-router';
import axios from 'axios';
import Footer from '../components/footer/footer.component';
import { RiErrorWarningLine } from 'react-icons/ri';


const NHATS = () => {
    let {sstr} =  useParams();
    let [keyword, setKeyword] = useState();
    let [result, setResult] = useState(null);
    let [isloading, setIsLoading] = useState(true);
    let [obj, setObj] = useState();
    let [hovered, setHovered] = useState(false);
    let preview = useRef();

    useEffect(()=>{
        sstr ? fetchNeo(sstr) : console.log("command await");
        //component did mount?
    },[]);

    const fetchNeo = (sstr) =>{
        setIsLoading(true)
        let searchString = sstr? sstr : keyword;

        axios.get(`https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${searchString}&neo=1`)
            .then(res => {
                res.data.orbit ? setResult({...res.data}) : setResult(null);
            })
            .catch(err => console.log(err))
            .finally(()=> {
                console.log(result);
            })
    }

    const hoverEnter = (e) =>{
        const temp = e.target.innerText;
        setHovered(true);
        setKeyword(temp);
    }
    const hoverOut = (e)=>{
        setHovered(false);
        setKeyword(null);
    }

    return (
        <>
            <Navigation/>
            <Container fluid>
                <Row>
                    <Col lg={4}>
                        <div className={styles.fixedmd}>
                        { hovered && window.innerWidth > 991 ? 
                                <div ref={preview} className={styles.preview} style={{marginTop:"3.5rem"}}>
                                    <h3>Orbital Elements : <small>{keyword}</small></h3>
                                    <small>Reference plane: JPL 110 (heliocentric ecliptic J2000)</small><br/>
                                    <OrbitalElementTable key={keyword} sstr={keyword} saver={setObj}/>
                                </div>
                                :
                                <div className={styles.jumbo}>
                                <h3> The Near-Earth Object Human Space Flight Accessible Targets Study (NHATS) </h3>
                                <p>This list of potential mission targets, provided by NHATS, should not be interpreted as a complete list of viable NEAs for an actual human exploration mission. As the NEA orbits are updated, the viable mission targets and their mission parameters will change. To select an actual target and mission scenario, additional constraints must be applied including astronaut health and safety considerations, human space flight architecture elements, their performances and readiness, the physical nature of the target NEA and mission schedule constraints.</p>
                                {/* <p className={styles.detail}>NEAs are discovered almost daily, and often the time just after discovery is also the optimal time to provide follow-up observations to secure their orbits and characterize their physical nature. These follow-up observations are particularly important for those NEAs that could become potential future mission targets. Hence, it is prudent to monitor these NEA discoveries daily and run an analysis to determine if any among them warrant additional study as they might become attractive mission targets.</p> */}
                                </div>
                        }
                        </div>
                    </Col>
                
                    <Col lg={8}>
                        <Container fluid>
                            <div style={{color:"white", fontFamily:"ibmmono"}}>
                                <h3>NHATS Table</h3>
                                <small><RiErrorWarningLine size={20}/> Click on the object designation see more detailed info about that object</small>
                                <br/>
                                <small className={styles.showsm}><RiErrorWarningLine size={20}/> Rotate your device to see more table columns</small>
                                <br/>
                            </div>
                            <NhatsTable 
                                hoverEnter={(e)=>{
                                    hoverEnter(e);
                                }} 
                                hoverOut={(e)=>{
                                    hoverOut(e);
                                }}/>  
                        </Container>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
            <Footer/>
        </>
    )
}

export default NHATS;


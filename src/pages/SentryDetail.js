import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import styles from '../assets/css/sentry.module.css';
import Footer from '../components/footer/footer.component';
import Navigation from '../components/nav/nav.component';
import { OrbitalElementTable, SentrySpecificTable, SentrySummeryTable } from '../components/table/table.component';

const SentryDetail = () => {
    let {obj_des} = useParams();
    let [neo, setNeo] = useState({});
    let [ifarmURL, setIframeURL] = useState("");

    useEffect(()=>{
        console.log({...neo})
        try{
            let w, e, epoch, tp, per, om, ad, q, label, i;
            epoch = neo.orbit.epoch;
            label = neo.object.fullname;
            neo.orbit.elements.map(value=>{
                switch(value.name){
                    case 'w': w = value.value; break;
                    case 'e': e = value.value; break;
                    case 'tp': tp = value.value; break;
                    case 'per': per = value.value; break;
                    case 'om': om = value.value; break;
                    case 'ad': ad = value.value; break;
                    case 'q': q = value.value; break;
                    case 'i': i = value.value; break;
                }
            })
            setIframeURL(`https://cneos.jpl.nasa.gov/ov/index.html#elem=w:${w},e:${e},epoch:${epoch},tp:${tp},per:${per},om:${om},ad:${ad},q:${q},label:${label},i:${i}`);
        }catch{
            console.log("catched");
        }
    },[neo])

    return (
        <>
            <Navigation/>
            <Container fluid>
                <Col className="mx-auto" lg={10}>
                    <Row className={styles.sections}>
                        <h3> Earth's Impact Risk Summries For {obj_des}</h3>
                        <p>The following summary tables includes basic information about the hazard for this object. The maximum Torino and Palermo Scale values are listed, as well as the number of tabulated potential impacts and their corresponding cumulative Palermo Scale value and cumulative impact probability (shown in the the first table). Certain parameter values depend upon the specific impact event in question, but they change little among the various table entries. For this reason NASA tabulate only mean values for these parameters (shown in the second table). The observation set used for the analysis is also listed.</p>
                        <SentrySummeryTable filter={obj_des} nohead/>
                    </Row>
                    <Row className={styles.sections}>
                        <Col md={12} lg={5}>
                            <h3>Orbital Elements For {obj_des}</h3>
                            <p>Reference: JPL 110 (heliocentric ecliptic J2000)</p>
                            <small className="text-muted">For accurate long-term ephemerides, please instead use NASA's Horizons system.This orbit viewer was implemented using two-body methods, and hence should not be used for determining accurate long-term trajectories (over several years or decades) or planetary encounter circumstances.</small>
                            <br/><br/>
                            <OrbitalElementTable sstr={obj_des} saver={setNeo} />
                            <br/><br/><br/>
                        </Col>
                        <Col md={12} lg={7}>
                            <h3>Orbit Visualization</h3>
                            <Container fluid>
                                <iframe className={styles.orbitviewer} src={ifarmURL} title="orbit Viewer" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </Container>            
                        </Col>
                    </Row>
                    <Row className={styles.sections}>
                        <h3>Sentry Details For {obj_des}</h3>
                        <SentrySpecificTable obj_des={obj_des}/>
                    </Row>
                </Col>
            </Container>
            <Footer/>
        </>
    )
}
export default SentryDetail;

// src="/ov/index.html#elem=w:245.0214715887575,e:.1666639148945053,epoch:2459200.5,tp:2459819.064604343029,per:2040.054884694311,om:69.95409045438126,ad:3.672609177317754,q:2.623307119450278,label:90%20Antiope,i:2.206812046201421"
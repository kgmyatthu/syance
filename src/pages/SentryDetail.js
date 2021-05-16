import React, {useEffect, useState} from 'react'
import styles from '../assets/css/sentry.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import Navigation from '../components/nav/nav.component';
import Footer from '../components/footer/footer.component';
import { OrbitalElementTable, SentrySpecificTable, SentrySummeryTable } from '../components/table/table.component';
import axios from 'axios';

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
                <Row>
                    <SentrySummeryTable filter={obj_des} nohead/>
                </Row>
                <Row>
                    <Col md={12} lg={5}>
                        <OrbitalElementTable sstr={obj_des} saver={setNeo} />
                    </Col>
                    <Col md={12} lg={7}>
                        <Container fluid>
                            <iframe className={styles.orbitviewer} src={ifarmURL} title="orbit Viewer" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </Container>            
                    </Col>
                </Row>
                <Row>
                    <SentrySpecificTable obj_des={obj_des}/>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}
export default SentryDetail;

// src="/ov/index.html#elem=w:245.0214715887575,e:.1666639148945053,epoch:2459200.5,tp:2459819.064604343029,per:2040.054884694311,om:69.95409045438126,ad:3.672609177317754,q:2.623307119450278,label:90%20Antiope,i:2.206812046201421"
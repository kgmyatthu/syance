import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import Navigation from '../components/nav/nav.component';
import { OrbitalElementTable, OrbitDeterminationParameterTable } from '../components/table/table.component';
import styles from '../assets/css/neo.module.css';
import { useParams } from 'react-router';
import {OrbitViewer} from '../components/orbit/orbit.component';
import Footer from '../components/footer/footer.component';
import {RiErrorWarningLine} from 'react-icons/ri';
import Tooltip from '../components/utils/tooltip.component';


const SeeOrbit = ()=>{
    let {sstr} = useParams();
    let [neo, setNeo] = useState(null);
    let [elms, setElms] = useState();
    let [calc_epoch, setCalc_epoch] = useState(0);

    useEffect(()=>{
        console.log(neo);
        try{
            let w, e, epoch, tp, per, om, ad, q, label, i;
            
            epoch = neo.orbit.epoch;
            setCalc_epoch(epoch);
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
                    default: break;
                }
            })
            setElms({
                w:w,
                epoch:epoch,
                label:label,
                e:e,
                tp:tp,
                per:per,
                om:om,
                ad:ad,
                q:q,
                i:i
            });
        }catch{
            console.log("catched");
        }finally{
            console.log(elms);
        }
    },[neo])

    if(sstr){
        return (
            <>
                <Navigation/>
                <Container fluid>
                    <Row>
                        <Col lg={5}>
                            <Jumbotron className={styles.jumbo}>
                                <h3>Orbital Elements For {neo? neo.des : ""}</h3>
                                <small>Orbit Calculated At: {(Date(calc_epoch)).slice(0,15)}</small>
                                <p>Reference: JPL 110 (heliocentric ecliptic J2000)</p>
                                <OrbitalElementTable sstr={sstr} saver={setNeo}/>
                            </Jumbotron>
                            <Jumbotron className={styles.jumbo}>
                                <h3>Orbit Determination Parameters For {neo? neo.des : ""}</h3>
                                <OrbitDeterminationParameterTable sstr={sstr}/>
                            </Jumbotron>
                        </Col>
                        <Col lg={7}>
                            <Jumbotron className={styles.jumbo}>
                                <p> <span style={{fontSize:"130%"}}>Orbit Visualization</span>&nbsp;&nbsp;
                                    <Tooltip tip="This orbit viewer was written and developed at JPL by Kevin Gill with contributions from Paul Chodas, Javier Roa, and Alan Chamberlin. Written in JavaScript, it makes use of WebGL via the open-source three.js package.">
                                            <RiErrorWarningLine size={25}/>
                                    </Tooltip>
                                    
                                </p>
                                <small className="text-muted">For accurate long-term ephemerides, please instead use NASA's Horizons system.This orbit viewer was implemented using two-body methods, and hence should not be used for determining accurate long-term trajectories (over several years or decades) or planetary encounter circumstances.</small>
                            </Jumbotron>
                            <Container fluid>
                                    {elms ? <OrbitViewer elements={elms}/> : <></> }
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </>
        )
    }


    return (
        <>  
            <Navigation/>
                <Container>
                    <Jumbotron className={styles.jumbo} style={{textAlign:"center"}}>
                        <h3>Orbit Viewer</h3>
                        <small>This orbit viewer was written and developed at JPL by Kevin Gill with contributions from Paul Chodas, Javier Roa, and Alan Chamberlin. Written in JavaScript, it makes use of WebGL via the open-source three.js package.</small>
                    </Jumbotron>
                    <OrbitViewer />
                </Container>
            <Footer/>
        </>
    )
}
export default SeeOrbit;
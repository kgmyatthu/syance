import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import styles from '../assets/css/sentry.module.css';
import Footer from '../components/footer/footer.component';
import Navigation from '../components/nav/nav.component';
import {RiErrorWarningLine} from 'react-icons/ri';
import Tooltip from '../components/utils/tooltip.component';
import { OrbitalElementTable, SentrySpecificTable, SentrySummeryTable } from '../components/table/table.component';
import {OrbitViewer} from '../components/orbit/orbit.component';

const SentryDetail = () => {
    let {obj_des} = useParams();
    let [neo, setNeo] = useState({});
    let [elms, setElms] = useState();
    let [calc_epoch, setCalc_epoch] = useState(0);
    
 

    useEffect(()=>{
        console.log({...neo})
        try{
            let w, e, epoch, tp, per, om, ad, q, label, i;
            
            epoch = neo.orbit.epoch;

            setCalc_epoch(neo.orbit.epoch);
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
                return true;
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
            
        }
    },[neo])

    return (
        <>
            <Navigation/>
            <Container fluid>
                <Col className="mx-auto" lg={10}>
                    <Row className={styles.sections}>
                        <Container>
                        <h3> Earth's Impact Risk Summries For {obj_des}</h3>
                        <p>The following summary tables includes basic information about the hazard for this object. The maximum Torino and Palermo Scale values are listed, as well as the number of tabulated potential impacts and their corresponding cumulative Palermo Scale value and cumulative impact probability (shown in the the first table). Certain parameter values depend upon the specific impact event in question, but they change little among the various table entries. For this reason NASA tabulate only mean values for these parameters (shown in the second table). The observation set used for the analysis is also listed.</p>

                        <SentrySummeryTable filter={obj_des} nohead/>
                        </Container>
                    </Row>
                    <Row className={styles.sections}>
                        <Col md={12} lg={5}>
                            <h3>Orbital Elements For {obj_des}</h3>
                            <small>Orbit Calculated At: {(Date(calc_epoch)).slice(0,15)}</small>
                            <p>Reference: JPL 110 (heliocentric ecliptic J2000)</p>
                            
                            <br/><br/>
                            <OrbitalElementTable sstr={obj_des} saver={setNeo} />
                            <br/>
                        </Col>
                        <Col md={12} lg={7}>
                            <Container fluid>
                            <p> <span style={{fontSize:"130%"}}>Orbit Visualization</span>&nbsp;&nbsp;
                            <Tooltip tip="This orbit viewer was written and developed at JPL by Kevin Gill with contributions from Paul Chodas, Javier Roa, and Alan Chamberlin. Written in JavaScript, it makes use of WebGL via the open-source three.js package.">
                                    <RiErrorWarningLine size={25}/>
                            </Tooltip>

                            </p>
                                <small className="text-muted">For accurate long-term ephemerides, please instead use NASA's Horizons system.This orbit viewer was implemented using two-body methods, and hence should not be used for determining accurate long-term trajectories (over several years or decades) or planetary encounter circumstances.</small>
                                <br/><br/>
                                {elms ? <OrbitViewer elements={elms}/> : <></> }
                            </Container>
                                       
                        </Col>
                    </Row>
                    <Row className={styles.sections}>
                        <h3>Virtual Impactors For {obj_des}</h3>
                        <SentrySpecificTable obj_des={obj_des} />
                        <Container style={{marginTop:"10rem"}}>
                            <div className={styles.definations}>
                                <h3>Date (yyyy-mm-dd.dd)</h3>
                                <p>Calendar date (UTC) of the potential impact.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Distance (rEarth)</h3>
                                <p>Minimum distance on the target plane (scaled b-plane) from the LOV to the geocenter, measured in Earth radii. For these purposes the radius of the Earth, 6420 km, includes some allowance for the thickness of the atmosphere.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Width (rEarth)</h3>
                                <p>One-sigma semi-width of the LOV uncertainty region, measured in Earth radii.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Sigma Impact</h3>
                                <p>Lateral distance in sigmas from the LOV to the Earth's atmosphere. Zero indicates that the LOV intersects the Earth. It is computed from (Distance - 1)/Width.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Sigma LOV</h3>
                                <p>Coordinate along the Line Of Variations (LOV). This value is a measure of how well the impacting orbit fits the available observations. Zero indicates the best-fitting, central (nominal) orbit and the further from zero, the less likely the event: Roughly 99% of all the uncertainty region lies between -3 and +3. Sentry explores out to Sigma LOV = +/-5.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Stretch LOV (rEarth)</h3>
                                <p>Stretching is the semimajor axis of the local linear uncertainty region. It describes how fast one moves across the target plane as Sigma LOV changes, and is measured in Earth radii per sigma. The local probability density varies inversely with the stretching, and thus larger stretching values will generally lead to lower impact probabilities.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Impact Probability</h3>
                                <p>Probability that the tabulated impact will occur. The probability computation is complex and depends on a number of assumptions that are difficult to verify. For these reasons the stated probability can easily be inaccurate by a factor of a few, and occasionally by a factor of ten or more.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Impact Energy (Mt)</h3>
                                <p>Kinetic energy at impact, based upon the computed absolute magnitude and impact velocity for the particular case, and computed in accordance with the guidelines stated for the Palermo Technical Scale. Uncertainty in this value is dominated by mass uncertainty and the stated value will generally be good to within a factor of three.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Palermo Scale</h3>
                                <p>Hazard rating according to the Palermo technical impact hazard scale, based on the tabulated impact date, impact probability and impact energy.</p>
                            </div>
                            <div className={styles.definations}>
                                <h3>Torino Scale</h3>
                                <p>Hazard rating according to the Torino impact hazard scale, based on the tabulated impact probability and impact energy. The Torino scale is defined only for potential impacts less than 100 years in the future.</p>
                            </div>
                        </Container>
                    </Row>
                </Col>
            </Container>
            <Footer/>
        </>
    )
}
export default SentryDetail;

// src="/ov/index.html#elem=w:245.0214715887575,e:.1666639148945053,epoch:2459200.5,tp:2459819.064604343029,per:2040.054884694311,om:69.95409045438126,ad:3.672609177317754,q:2.623307119450278,label:90%20Antiope,i:2.206812046201421"





























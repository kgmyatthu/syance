import React from 'react';
import styles from '../../assets/css/util.module.css';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import OnLoadGrid from '../loader/onloadgrid.component';

const APOD_BUFFER = () =>{
    return (
        <>
        <Container fluid>
            <Row>
                <Col>
                    <Jumbotron className={[styles.bgtransparent,styles.ibmmono,styles.borderwhite].join(" ")}>
                            
                        <span className={styles.white}>
                           
                            <h1>Loading ... </h1>
                                <p className="text-muted">Astronomy Pictury Of The Day - APOD</p>
                                
                            <br></br>
                            <div style={{textAlign:"center"}}>
                                <OnLoadGrid/>
                                <br></br>
                                <small className="text-muted">loading ... </small>
                            </div>
                            <br></br>
                            <p>
                            loading ...
                            </p>
                            
                        </span>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default APOD_BUFFER;
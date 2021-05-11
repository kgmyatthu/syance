import React, { useEffect, useState, useRef } from 'react';
import styles from '../../assets/css/util.module.css';
import { Image, Jumbotron, Row, Col } from 'react-bootstrap';
import OnLoadGrid from '../utils/onloadgrid.component';



const APOD = ({id, data, children}) => {
    let [mediaLoading, setMediaLoading] = useState();
    let media = useRef();
    useEffect(()=>{
        setMediaLoading(true);
    },[])

    let mediaLoaded = () =>{
        setMediaLoading(false);
        media.current.style.display = 'inline';
    }

    return (
        <Row>
            <Col>
                <Jumbotron className={[styles.bgtransparent,styles.ibmmono,styles.borderwhite].join(" ")}>
                        
                        <span id={id || id>-1 ? `apod-${id}` : ""} className={styles.white}>
                            <h1>{data.title}</h1>
                                <p className="text-muted">Astronomy Pictury Of The Day - APOD</p>
                                
                            <br></br>
                            <div style={{textAlign:"center"}}>
                            
    
                                {   mediaLoading ? 
                                    <OnLoadGrid/> 
                                    : <></>
                                }

                                { data.media_type == 'video'?
                                    <iframe ref={media} className={styles.hidden} style={{width:"100%", height:"50vh"}} onLoad={mediaLoaded} src={data.url} title="video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    :
                                    <Image ref={media} className={[styles.bordergrey,styles.mxwidth80,styles.hidden]} onLoad={mediaLoaded} src={data.url} alt={data.title}fluid />
                                }
                                
                                    
                            
                                <br></br>
                                {data.copyright?<small className="text-muted">Copyright : {data.copyright}</small>: <></>}
                                <br></br>
                                <small className="text-muted">APOD_Date : {data.date}</small>
                            </div>
                            <br></br>
                            <p>
                                {data.explanation}
                            </p>
                            {children}
                        </span>
                </Jumbotron>
            </Col>
        </Row>
    )
}

export default APOD;

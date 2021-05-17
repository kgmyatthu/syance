import React, {useRef} from 'react';
import styles from '../../assets/css/util.module.css';
import {Container, Row, Col} from 'react-bootstrap';
import {ImCross} from 'react-icons/im';


export const Filter = ({title, callback}) => {
    let ibox = useRef();
    return (
        <div className={styles.wordsearch}>
            <Container fluid>

                <Row>
                    <Col className={[styles.ws1stcol,"col-6"].join(" ")}>
                        {title}:
                    </Col>
                    <Col className="col-5">
                        <input ref={ibox} className={styles.input} type="text"
                                onChange={
                                    (e)=>{
                                        callback(ibox.current);
                                    }
                                }/>
                    </Col>
                    <Col className="col-1" style={{color:"white"}}>
                            <span className={styles.clearer} onClick={()=>{
                                if(ibox.current.value){
                                    ibox.current.value = null;
                                    callback(ibox.current);
                                }
                            }}>
                                <ImCross/>
                            </span>
                    </Col>
                </Row>
         
            </Container>
        </div>
    )
}


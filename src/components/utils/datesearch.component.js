import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import styles from '../../assets/css/util.module.css';

export const DateRangeSearch = ({startDate, setStartDate, endDate, setEndDate, onSearch, to, children}) => {
    return (
        <>
            <Row className={[].join(" ")}>
                <Col className={["mx-auto"].join(" ")} style={{paddingTop:"2rem",paddingBottom:"2rem"}}>
                    <Row>
                        <Col>
                            <Row>
                                <Col className={[styles.marginb1rem,"text-center"].join(" ")}>
                                    <span className={[styles.white,styles.ibmmono].join(" ")}>Select&nbsp;Start&nbsp;Date</span><br></br>
                                    <DatePicker 
                                        tileClassName={styles.calender} 
                                        className={styles.datepicker}
                                        value={startDate}
                                        onChange={setStartDate}
                                        format="y-MM-dd"
                                        maxDate={endDate}
                                    />
                                </Col>
                                <Col className={[styles.marginb1rem,"text-center"].join(" ")}>
                                    <span className={[styles.white,styles.ibmmono].join(" ")}>Select&nbsp;End&nbsp;Date</span><br></br>
                                    <DatePicker  
                                        tileClassName={styles.calender}
                                        className={styles.datepicker}
                                        value={endDate}
                                        onChange={setEndDate}
                                        format="y-MM-dd"
                                        maxDate={new Date()}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className={["text-center",styles.padding1].join(" ")}>
                                    <a className={styles.button} href={to? to:""} onClick={to?"":onSearch}>Search</a>
                                    <br/><br></br>
                                    {children}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}



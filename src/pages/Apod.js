import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Jumbotron, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import styles from "../assets/css/util.module.css";
import APOD from '../components/apod/apod.component';
import APOD_BUFFER from '../components/apod/apodloader.component';
import Footer from '../components/footer/footer.component';
import FullscreenLoader from '../components/loader/fullscreenloader.component';
import Navigation from '../components/nav/nav.component';
import { API_KEY } from '../components/settings';
import { DateRangeSearch } from '../components/utils/datesearch.component';
import {URLS} from '../components/settings';




const Apod = () => {
    let {start_date, end_date} = useParams(); 
    let [apods, setApods] = useState([]);
    let [startDate, setStartDate] = useState(start_date?new Date(`${start_date}`):new Date());
    let [endDate, setEndDate] = useState(end_date?new Date(`${end_date}`):new Date());
    let [isLoading, setIsLoading] = useState(true);
    let [isLoadMore, setIsLoadMore] = useState(false);

    useEffect(()=>{
        if (start_date && end_date){
            try{
                setEndDate(new Date(`${end_date}`))
                setStartDate(new Date(`${start_date}`));
            }catch{
                console.log("somthing break!")
            }finally{
                console.log(`${startDate}: ${endDate}`);
                get_apod_within_date();
            }
        }
        else{
            axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
            .then(res => {
                setApods([...apods,res.data]);
                console.log(res.data);
                
            })
            .catch(err => console.log(err))
            .finally(()=>{
                setIsLoading(false);
            });
        }
        
    },[]);

    useEffect(()=>{
        if (endDate && startDate){
            if (startDate.getTime() > endDate.getTime()){
                setStartDate(null);
            }
        }
    },[startDate,endDate]);

    let get_apod_within_date = () =>{
        setIsLoading(true);
        let sDate = startDate ? startDate.toISOString().slice(0, 10) : "";
        let eDate = endDate ? endDate.toISOString().slice(0, 10) : "";
        
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${sDate}&end_date=${eDate}`)
        .then(res => {
            console.log([res.data])
            setApods([...res.data]);
        })
        .catch(err => {
            setApods([]);
            console.log(err);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    }

    let load_more = () =>{
        setIsLoadMore(true)
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=25`)
        .then(res => {
            setApods([...apods,...res.data]);
            console.log(apods);
        })
        .catch(err => console.log(err))
        .finally(()=>{
            setIsLoading(false);
            setIsLoadMore(false);
        });
    }

    if(isLoading){
        return(
            <>
                <FullscreenLoader/>
            </>
        )
    }
    return (
        <>
        <Navigation/>
        <Container fluid>

            <Row>
                <Col className={[styles.marginTop5rem].join(" ")}> 
                    
                        <Jumbotron className={[styles.nomargins,styles.bgtransparent, styles.white, styles.ibmmono, styles.padding1, styles.fixedmd].join(" ")}>
                            <Container>
                                <div className={styles.detail}>
                                    <h1>APOD(s)</h1>
                                    <p>
                                    Astronomy Picture of the day is a NASA backed API with which 
                                    each day a different image or photograph of our universe is featured, 
                                    along with a brief explanation written by a professional astronomer.&nbsp;
                                    <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Astronomy_Picture_of_the_Day">Read More</a>
                                    </p>
                                </div>
                                <DateRangeSearch startDate={startDate} 
                                    setStartDate={setStartDate} 
                                    endDate={endDate} 
                                    setEndDate={setEndDate} 
                                    onSearch={get_apod_within_date}
                                    to={URLS.APOD({
                                                    start_date:startDate? startDate.toISOString().slice(0, 10) : null,
                                                    end_date:endDate ? endDate.toISOString().slice(0, 10) : null
                                                })}>
                                    <small className={[styles.white,styles.ibmmono,"text-muted"].join(" ")}>Find APODs between chosen period/date or you can randomly scroll through APODS that had been posted throughout the years.</small>
                                </DateRangeSearch>
                            </Container>
                        </Jumbotron>
                    
                </Col>
                <Col className={["mx-auto"].join(" ")} lg="5" md="12" sm="12">
                    { isLoading? 
                        // <PuffLoader color="white" loading={isLoading} css={styles.center} size={150} />
                        <APOD_BUFFER/>
                        :
                        
                            apods.map((value,index) =>{
                                return <APOD id={index} key={index} data={value}>
                                        <div style={{textAlign:"center"}}>
                                            <br/>
                                            {value.media_type === "image"?
                                                <a className={styles.button} href={value.hdurl} target="_blank" rel="noreferrer" download><small>HD Image</small></a>
                                                :
                                                <a className={styles.button} target="_blank" href={value.url} rel="noreferrer"><small>Detail</small></a>
                                            }
                                        </div>
                                </APOD>
                            })
                        
                    }
                    <div className="text-center">
                        { isLoading ?
                            <></>
                            :
                            <>
                            { isLoadMore ?
                                <Spinner animation="grow" variant="light" />
                                :
                                <button className={styles.button} onClick={load_more}><small>Load More</small></button>
                            }
                            </>
                        }
                    </div>
                </Col>
                <Col>
                    
                </Col>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}

export default Apod;

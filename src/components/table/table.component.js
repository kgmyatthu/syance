
import React, { useEffect, useState }from 'react';

import Tooltip from '../utils/tooltip.component';
import styles from './table.module.css';
import axios from 'axios';
import {AiFillCaretUp, AiFillCaretDown} from 'react-icons/ai';
import WordSearch from '../utils/wordsearch.component';
import OnLoadGrid from '../loader/onloadgrid.component';
import { Container, Row, Col} from 'react-bootstrap';


function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  } // this is a dynmaic sorting function 

    

export const SentrySummeryTable = () => {
    let [sentries, setSentries] = useState({data:[]});
    let [tabledata, setTabledata] = useState([...sentries.data]);
    let [errs, setErrs] = useState();
    let [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetchSentryFromNasa();
    },[]);

    useEffect(()=>{
        try{
            setTabledata([...sentries.data]);
        }
        catch{
            setTabledata([]);
        }
    },[sentries])

    const fetchSentryFromNasa = () =>{
        setIsLoading(true);
        axios.get("https://ssd-api.jpl.nasa.gov/sentry.api")
            .then(res => { 
                setSentries({...res.data});
            })
            .catch(err =>{
                setErrs({"err_msg":err, "isError":true});
                console.log(err);
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }

    let TableRow = ({data}) => {
        return (
            <>
            <tr>
                {/* Data prop must be sentries.data or table data */}
                <td>
                    <Tooltip tip={"click to see more about this object destination"}  ><span className={styles.hoverboldunderline}>{data.des}</span></Tooltip>
                </td>
                <td>
                    <Tooltip tip={"year range"}  >{data.range}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"potential impact counts"}  >{data.n_imp}</Tooltip>
                </td>
                <td>
                    <Tooltip tip={"impact probability"} >{Number.parseFloat(data.ip).toExponential()}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"velocity (infinity) km/s"} >{Math.floor(data.v_inf)}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"absolute magnitude"}  >{data.h}</Tooltip>
                </td>
                <td>
                    <Tooltip tip={"estimated diameter (km)"}  >{data.diameter}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"cumulative palermo scale"}  >{data.ps_cum}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"max palermo scale"}  >{data.ps_max}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"max torino scale"}  >{data.ts_max}</Tooltip>
                </td>
            </tr>
            </>
        )
    } 
    
    return (
        <>
            <div className="container-fluid">
                    {
                        isLoading ?
                                <Container style={{textAlign:"center",color:"white",fontFamily:"ibmmono"}}>
                                    <Col className="mx-auto" md={5}>
                                        <span style={{height:"30vh"}}></span>
                                        <OnLoadGrid/><br></br>
                                        Fetching Data From NASA ...
                                    </Col>
                                </Container>
                                :
                                <>
                                <Row style={{marginBottom:"1rem"}}>
                                    <Col sm={12} md={6} className={styles.ibmmonowhite}>
                                         <small>Total_Entries: {sentries.count}</small> <br/>
                                        <small>Source: {sentries.signature.source}</small>  <br/>
                                         <small>Version: {sentries.signature.version}</small>  <br/>
                                    </Col>
                                    <Col sm={12} md={6} className={styles.alignjustice}>
                                        <WordSearch 
                                        title="Destination/ID"
                                        callback={
                                            (e)=>{
                                                //Using setTimeout to improve performance when interating over thousands of entries
                                                if (e.value){
                                                    setTimeout(()=>{
                                                        setTabledata(sentries.data.filter(function(obj) {
                                                            return (obj.des.includes(e.value.toUpperCase()) || obj.id.includes(e.value) );
                                                        }))
                                                    },1500);

                                                }
                                                else{
                                                    setTimeout(()=>{
                                                        setTabledata([...sentries.data]);
                                                    },500);
                                                }
                                            }
                                        }
                                        /><br/>
                                        <small className={[styles.ibmmonowhite,"text-muted"].join(" ")}>Found {tabledata.length} entries</small>
                                    </Col>
                                </Row>
                                <table className={styles.sentrytable}>
                                    <thead>
                                    <tr className={[styles.borderbottom,styles.bgblack].join(" ")}>
                                        {/* <th>Id</th> */}
                                        <th>
                                            <Tooltip tip="Temporary designation or permanent number for this object.">
                                                Object <br/>Destination<br/>(yrs-id)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("des", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("des", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip tip="Time span over which impacts have been detected. Typically, searches are conducted 100 years into the future.">
                                                Year <br/>Range<br/>(yrs)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("range", "asc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("range", "desc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th className={styles.hidesm}>
                                            <Tooltip tip="Number of dynamically distinct potential impacts that have been detected by Sentry">
                                                Potential <br/>Impacts<br/>(counts)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("n_imp", "asc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("n_imp", "desc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip tip="Sum of the impact probabilities from all detected potential impacts.">
                                                Impact <br/>Probability<br/> (cumulative)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ip", "asc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ip", "desc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th className={styles.hidesm}>
                                            <Tooltip tip="Velocity of the asteroid relative to the Earth, assuming a massless Earth.">
                                                V<br/>Infinity<br/>(km/s)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("v_inf", "asc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("v_inf", "desc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th className={styles.hidesm}>
                                            <Tooltip tip="Absolute Magnitude, a measure of intrinsic brightness.">
                                                Absolute <br/>Magnitude <br/>(H)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("h", "asc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("h", "desc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th>
                                            <Tooltip tip="Estimated diameter of the asteroid">
                                            Estimated <br/>Diameter<br/>(km)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("diameter", "asc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("diameter", "desc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th className={styles.hidesm}>
                                            <Tooltip tip="Cumulative hazard rating according to the Palermo technical impact hazard scale">
                                                Palermo<br/> Scale<br/> (cum.)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ps_cum", "desc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ps_cum", "asc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th className={styles.hidesm}>
                                            <Tooltip tip="Maximum hazard rating according to the Palermo technical impact hazard scale">
                                                Palermo<br/> Scale<br/> (max.)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in ascending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ps_cum", "desc"))]);}} href="#"><AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ps_cum", "asc"))]);}} href="#"><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                        <th className={styles.hidesm}>
                                            <Tooltip tip="Maximum detected hazard rating according to the Torino impact hazard scale">
                                                Torino<br/> Scale<br/> (max.)<br/>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in acsending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ts_max", "asc"))]);}} href="#"> <AiFillCaretUp/></span>
                                            </Tooltip>
                                            <Tooltip tip="Sort table by this category in descending">
                                                <span className={styles.sortbutton} onClick={()=>{setTabledata([...tabledata.sort(compareValues("ts_max", "desc"))]);}} href="#" ><AiFillCaretDown/></span>
                                            </Tooltip>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>                       
                                    {
                                        tabledata.map((value) => {

                                            return (
                                                <TableRow key={value.id} data={value}/>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </>
                    }
            </div>
        </>
    )
}

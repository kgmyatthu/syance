
import axios from 'axios';
import React, { useEffect, useState, useReducer } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import {CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import {Link} from 'react-router-dom';
import FBloader from '../loader/fbloader.component';
import { URLS } from '../settings';
import Tooltip from '../utils/tooltip.component';
import {Filter} from '../utils/wordsearch.component';
import styles from './table.module.css';



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

  function chunkArray(array, size) {
    let result = []
    for (let i = 0; i < array.length; i += size) {
        let chunk = array.slice(i, i + size)
        result.push(chunk)
    }
    return result
}

const Loading = ()=>{
    return (
        <>
            <Container style={{textAlign:"center",color:"white",fontFamily:"ibmmono"}}>
                <Col className="mx-auto" md={5}>
                    <span style={{height:"30vh"}}></span>
                    <FBloader/><br></br>
                    Fetching Data From NASA ...
                </Col>
            </Container>
        </>
    )
}

export const SentrySummeryTable = ({filter, nohead}) => {
    let [sentries, setSentries] = useState({data:[]});
    let [tabledata, setTabledata] = useState([...sentries.data]);
    
    let [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetchSentryFromNasa();
    },[]);

    useEffect(()=>{
        try{
            if(filter){
                setTabledata([...sentries.data.filter(data=>data.des === filter)]);
            }
            else{
                setTabledata([...sentries.data]);
            }
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
                    <Tooltip tip={"click to see more about this object designation"}  ><Link className={styles.hoverboldunderline} to={URLS.SENTRY({obj_des:data.des})}>{data.des}</Link></Tooltip>
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

    if(isLoading){
        return <Loading/>
    }
    
    return (
        <>
            <div className="container-fluid">

                { !nohead ? 
                        <Row style={{marginBottom:"1rem"}}>
                        <Col sm={12} md={6} className={styles.ibmmonowhite}>
                                <small>Total_Entries: {sentries.count}</small> <br/>
                            <small>Source: {sentries.signature.source}</small>  <br/>
                                <small>Version: {sentries.signature.version}</small>  <br/>
                        </Col>
                        <Col sm={12} md={6} className={styles.alignjustice}>
                            <Filter 
                                        title="Designation/ID"
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
                                        }/><br/>
                            <small className={[styles.ibmmonowhite,"text-muted"].join(" ")}>Found {tabledata.length} entries</small>
                        </Col>
                    </Row>
                    :
                    <></>
                }
                <div className={styles.tablewrapper}>
                    <table className={styles.sentrytable}>
                        <thead>
                        <tr className={[styles.borderbottom,styles.bgwhite].join(" ")}>
                            {/* <th>Id</th> */}
                            <th>
                                <Tooltip tip="Temporary designation or permanent number for this object.">
                                    Object <br/>Designation<br/>(yrs-id)<br/>
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
                </div>

            </div>
        </>
    )
}





export const SentrySpecificTable = ({obj_des, callback}) => {
    let [isLoading, setIsLoading] = useState(true);
    let [sentry, setSentry] = useState({});
    let [tabledata, setTabledata] = useState([]);

    useEffect(()=>{
        setIsLoading(true);
        axios.get(`https://ssd-api.jpl.nasa.gov/sentry.api?des=${obj_des}`)
            .then(res => setSentry({...res.data}))
            .catch(err => console.log(err))
            .finally(()=>{setIsLoading(false)})
    },[])

    useEffect(()=>{
        setIsLoading(true);
        try{
            setTabledata([...sentry.data]);
        }
        catch{
            setTabledata([]);
        }finally{
            setIsLoading(false);
        }
    },[sentry])



    let TableRow = ({data}) =>{
        
        return (<>
            <tr>
                <td>
                    <Tooltip tip="date">
                        {callback?
                                <a  href="#"  className={styles.hoverboldunderline} onClick={(e)=>{
                                    callback(data.date);
                                }}>{data.date}</a> 
                                : 
                                <span>{data.date}</span>}
                    </Tooltip>
                </td>
                <td>
                    <Tooltip tip="distance">
                        {data.dist}
                    </Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip="width">
                        {data.width}
                    </Tooltip>
                </td>
                <td>
                    <Tooltip tip="sigma impact">
                        {data.sigma_imp}
                    </Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip="sigma lov">
                        {data.sigma_lov}
                    </Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip="stretch lov">
                        {data.stretch}
                    </Tooltip>
                </td>
                <td>
                    <Tooltip tip="impact probability">
                        {data.ip}
                    </Tooltip>
                </td>
                <td>
                    <Tooltip tip="impact energy">
                        {data.energy}
                    </Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip="palermo">
                        {data.ps}
                    </Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip="torino">
                        {data.ts}
                    </Tooltip>
                </td>
            </tr>
        </>)
    }

    if(isLoading){
        return <Loading/>
    }

    return (
        

        <Container fluid>
        <table className={styles.sentrytable}>
            <thead>
                <tr className={[styles.borderbottom,styles.bgwhite].join(" ")}>
                    <th>
                        <Tooltip tip="calender date UTC of the potential impact">
                            <span>Date<br/></span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="Minimum distance on the target plane (scaled b-plane) from the LOV to the geocenter, measured in Earth radii. For these purposes the radius of the Earth, 6420 km, includes some allowance for the thickness of the atmosphere.">
                            <span>Distance<br/>(r<small>Earth</small>)</span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="One-sigma semi-width of the LOV uncertainty region, measured in Earth radii.">
                            <span>Width<br/>(r<small>Earth</small>)</span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="Lateral distance in sigmas from the LOV to the Earth's atmosphere. Zero indicates that the LOV intersects the Earth. It is computed from (Distance - 1)/Width.">
                            <span>Sigma<br/>Impact</span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="Coordinate along the Line Of Variations (LOV). This value is a measure of how well the impacting orbit fits the available observations. Zero indicates the best-fitting, central (nominal) orbit and the further from zero, the less likely the event: Roughly 99% of all the uncertainty region lies between -3 and +3. Sentry explores out to Sigma LOV = +/-5.">
                            <span>Sigma<br/>LOV</span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="Stretching is the semimajor axis of the local linear uncertainty region. It describes how fast one moves across the target plane as Sigma LOV changes, and is measured in Earth radii per sigma. The local probability density varies inversely with the stretching, and thus larger stretching values will generally lead to lower impact probabilities.">
                            <span>Stretch<br/>LOV<br/>(r<small>Earth</small>)</span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="Probability that the tabulated impact will occur. The probability computation is complex and depends on a number of assumptions that are difficult to verify. For these reasons the stated probability can easily be inaccurate by a factor of a few, and occasionally by a factor of ten or more.">
                            <span>Impact<br/>Probability</span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="Kinetic energy at impact, based upon the computed absolute magnitude and impact velocity for the particular case, and computed in accordance with the guidelines stated for the Palermo Technical Scale. Uncertainty in this value is dominated by mass uncertainty and the stated value will generally be good to within a factor of three.">
                            <span>Impact<br/>Energy<br/>(Mt)</span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="Hazard rating according to the Palermo technical impact hazard scale, based on the tabulated impact date, impact probability and impact energy.">
                            <span>Palermo<br/>Scale</span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="Hazard rating according to the Torino impact hazard scale, based on the tabulated impact probability and impact energy. The Torino scale is defined only for potential impacts less than 100 years in the future.">
                            <span>Torino<br/>Scale</span>
                        </Tooltip>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    tabledata.map(value=>{
                        return (
                                <TableRow key={value.date} data={value}/>
                        )
                    })
                }
            </tbody>
        </table>
    </Container>

    
    )
}


export const OrbitDeterminationParameterTable = ({sstr}) =>{
    let [smallBody, setSmallBody] = useState({orbit: ""});

    useEffect(()=>{
        axios.get(`https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${sstr}`)
        .then(res => {

            setSmallBody({...res.data})
            
        } )
        .catch(err => console.log(err))
        .finally(()=>{})
    },[])

    return (
        <>
            <table className={styles.orbitDP}>
                <tr>
                    <th>
                        <Tooltip tip="">
                            #obs.used (Total)
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.n_obs_used}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            data-arc span
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.data_arc} days
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            first obs. used
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.first_obs}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            last obs. used
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.last_obs}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            planetary. ephem.
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.pe_used}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            SB-pert. ephem.
                            
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.sb_used}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            condition code
                            
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.condition_code}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            norm. resid. RMS
                            
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.rms}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            source
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.source}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            producer
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.producer}
                        </Tooltip>
                    </td>
                </tr>
                <tr>
                    <th>
                        <Tooltip tip="">
                            solution date
                        </Tooltip>
                    </th>
                    <td>
                        <Tooltip tip="">
                            {smallBody.orbit.soln_date}
                        </Tooltip>
                    </td>
                </tr>
            </table>
        </>
    )
}

export const OrbitalElementTable = ({sstr, saver}) => {
    let [mounted, setMounted] = useState(true);
    let [smallBody, setSmallBody] = useState({});
    let [elements, setElements] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setIsLoading(true);
        axios.get(`https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${sstr}`)
            .then(res => {
                if (mounted){
                    setSmallBody({...res.data})
                }
            } )
            .catch(err => console.log(err))
            .finally(()=>{setIsLoading(false)})

        return () => setMounted(false)
    },[])

    useEffect(()=>{
        setIsLoading(true)
        try{
            setElements([...smallBody.orbit.elements]);
        }catch{
            setElements([]);
        }finally{
            setIsLoading(false);
        }
    },[smallBody])

    useEffect(()=>{
        if(saver){
            saver({...smallBody});
        }
    },[elements])
    
    let TableRow = ({data}) =>{
        return (
            <tr>
                <td>
                    <Tooltip tip={data.title}>
                        {data.label}
                    </Tooltip>
                </td>
                <td>
                    <Tooltip tip="">
                        {data.value}
                    </Tooltip>
                </td>
                <td>
                    <Tooltip tip="">
                        {data.sigma}
                    </Tooltip>
                </td>
                <td>
                    <Tooltip tip="">
                        {data.units}
                    </Tooltip>
                </td>
            </tr>
        )
    }

    if(isLoading){
        return <Loading/>
    }
    return (

    
            <table className={styles.sentrytable}>
                <thead>
                    <tr className={[styles.borderbottom,styles.bgwhite].join(" ")}>
                        <th>
                            <Tooltip tip="Orbital Elements">
                                <span>Elements<br/></span>
                            </Tooltip>
                        </th>
                        <th>
                            <Tooltip tip="">
                                <span>Values</span>
                            </Tooltip>
                        </th>
                        <th>
                            <Tooltip tip="">
                                <span>Uncertainty (1-sigma)</span>
                            </Tooltip>
                        </th>
                        <th>
                            <Tooltip tip="">
                                <span>Units</span>
                            </Tooltip>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        elements.map(value=>{
                            return <TableRow key={value.label} data={value}/>
                        })
                    }
                </tbody>
            </table>


    )
}

export const NhatsTable = ({hoverEnter, hoverOut}) =>{
    let [nhats, setNhats] = useState({data:[]});
    let [isLoading, setIsLoading ] = useState(true);
    let [tabledata, setTabledata] = useState([]);
    let [itemPerBatch, setItemPerBatch] = useState(50);
    let [isFiltered, setIsFiltered] = useState(false);
    let [batch, _batch_dispatcher] = useReducer((batch,action)=>{
        switch(action.type){
            case 'NEXT': 
                if (batch < [...chunkArray(nhats.data,itemPerBatch)].length-1){
                    return batch + 1;
                }
                else{
                    return batch;
                }
            case 'PREVIOUS':
                if(batch > 0){
                    return batch - 1;
                }
                else{
                    return batch;
                }
        }
    },0);


    useEffect(()=>{
        setIsLoading(true);
        axios.get('https://ssd-api.jpl.nasa.gov/nhats.api')
            .then(res =>{
                setNhats({...res.data});
            })
            .catch(err => console.log(err))
            .finally(()=>{
                setIsLoading(false);
            })
    },[]);

    useEffect(()=>{
        try{
            setTabledata([...chunkArray(nhats.data,itemPerBatch)[0]]);
        }catch{

        }finally{
            console.log(tabledata);
        }
    
    },[nhats]);

    useEffect(()=>{

         try{
            if(nhats.data){
                setTabledata([...chunkArray(nhats.data,itemPerBatch)[batch]]);
            }
         }catch{

         }
    },[batch])

    let TableRow = ({data}) => {
        return (
            <>
            <tr>
                {/* Data prop must be sentries.data or table data */}
                <td>
                    <Tooltip tip={"click to see more about this object designation"}  >
                        <Link className={styles.hoverboldunderline} 
                          
                            to={URLS.ORBIT({sstr:data.des})} 
                            onMouseEnter={(e)=>{
                                if(hoverEnter){
                                    hoverEnter(e);
                                }
                                
                            }} 
                            onMouseLeave={(e)=>{  
                                if(hoverOut){
                                    hoverOut(e);
                                }
                                
                            }}>
                            {data.des}
                        </Link>
                        </Tooltip>
                </td>
                <td>
                    <Tooltip tip={"orbit id"}  >{data.orbit_id}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"absolute magnitude"}  >{data.h}</Tooltip>
                </td>
                <td>
                    <Tooltip tip={"min_size - max_size"} >{data.min_size} - {data.max_size}</Tooltip>
                </td>
                <td>
                    <Tooltip tip={"occ"} >{data.occ}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"min delta-v"}  >{data.min_dv.dv}, {data.min_dv.dur}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"min duration"}  >{data.min_dur.dv}, {data.min_dur.dur}</Tooltip>
                </td>
                <td className={styles.hidesm}>
                    <Tooltip tip={"viable trajectory"}  >{data.n_via_traj}</Tooltip>
                </td>
                <td>
                    <Tooltip tip={"next optical opportune"}  >{data.obs_start} [{data.obs_mag}]</Tooltip>
                </td>
            </tr>
            </>
        )
    } 

    if(isLoading){
        return <Loading/>
    }
    return (
        <>  
            <Row style={{marginBottom:"1rem"}}>
                <Col sm={12} md={6} className={styles.ibmmonowhite}>
                        <small>Total_Entries: {nhats.count}</small> <br/>
                    <small>Source: {nhats.signature.source}</small>  <br/>
                        <small>Version: {nhats.signature.version}</small>  <br/>
                </Col>
                <Col sm={12} md={6} className={styles.alignjustice}>
                                    <Filter 
                                        title="Designation/ID"
                                        callback={
                                            (e)=>{
                                                //Using setTimeout to improve performance when interating over thousands of entries
                                                
                                                if (e.value){
                                                    setTimeout(()=>{
                                                        setTabledata(chunkArray(nhats.data,itemPerBatch)[batch].filter(function(obj) {
                                                            return (obj.des.includes(e.value.toUpperCase()) );
                                                        }))
                                                    },1500);
                                                    setIsFiltered(true);
                                                }
                                                else{
                                                    setTimeout(()=>{
                                                        setTabledata([...chunkArray(nhats.data,itemPerBatch)[batch]]);
                                                    },500);
                                                    setIsFiltered(false);
                                                }
                                            }
                                        }/><br/>
                        {isFiltered ? <small className={[styles.ibmmonowhite,"text-muted"].join(" ")}>Found {tabledata.length} entries</small> : <></>}
                </Col>
            </Row>
            <table  className={styles.sentrytable}>
                <thead>
                <tr className={[styles.borderbottom,styles.bgwhite].join(" ")}>
                    <th>
                        <Tooltip tip="Full designation of the target NEA (near-Earth asteroid).">
                            <br/>Object <br/>Designation<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("des", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("des", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="ID of the JPL NEA orbit used in this analysis">
                            <br/>Orbit <br/>ID<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("orbit_id", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("orbit_id", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="Absolute visual (V-band) magnitude in magnitude units.">
                            <br/>H <br/>(mag)<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("h", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("h", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="Estimated diameter in meters showing the minimum and maximum likely size based on assumed maximum and minimum albedos of 0.60 and 0.03, respectively.">
                            Estimated<br/> Diameter<br/> (m)<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("max_size", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("max_size", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="Orbit Condition Code of the NEA's orbit when NHATS-analysis was performed, where 0 implies a well-determined orbit and 9 implies a very poorly-determined (highly uncertain) orbit.">
                            <br/>OCC<br/><br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("occ", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("occ", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="The total delta-V in km/s and corresponding duration in days for the trajectory solution with the minimum total delta-V.">
                            Min. delta-V<br/> [delta-V, dur.]<br/> (km/s), (d)<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("dv", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("dv", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="The total delta-V in km/s and corresponding duration in days for the trajectory solution with the minimum possible total duration.">
                            Min. Duration <br/>[delta-V, dur.] <br/>(km/s), (d)<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("dur", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("dur", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th className={styles.hidesm}>
                        <Tooltip tip="The total number of NHATS-compliant trajectory solutions. This value serves as a proxy for accessibility of the NEA.">
                             Viable<br/> Trajectories<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("n_via_traj", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("n_via_traj", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                    <th>
                        <Tooltip tip="The year and month (yyyy-mm) during which the asteroid will next be observable optically from the Earth at a magnitude of 24.0 or brighter, solar elongation > 60 deg and plane-of-sky (POS) uncertainty < 1.5 deg.">
                            Next Optical <br/>Opportunity<br/> (yyyy-mm [Vp])<br/>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in acsending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("obs_start", "asc"))]); }} href="#"><AiFillCaretUp/></span>
                        </Tooltip>
                        <Tooltip tip="Sort table by this category in descending">
                            <span className={styles.sortbutton} onClick={()=>{ setTabledata([...tabledata.sort(compareValues("obs_start", "desc"))]); }} href="#"><AiFillCaretDown/></span>
                        </Tooltip>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {tabledata.map((value)=>{
                        return <TableRow data={value} key={value.des}/>
                    })}
                </tbody>
            </table>
            <Container className="text-center">
                <Row style={{margin:"2rem"}}>
                    <Col>
                        <button className={styles.button} onClick={()=>{_batch_dispatcher({type:"PREVIOUS"})}}><CgPlayTrackPrev size={20}/>PREV</button>
                    </Col>
                    <Col>
                        <button className={styles.button} >{batch+1}</button>
                    </Col>
                    <Col>
                        <button className={styles.button} onClick={()=>{_batch_dispatcher({type:"NEXT"})}}>NEXT<CgPlayTrackNext size={20}/></button>
                    </Col>
                </Row>
            </Container>
                
        </>
    )
}

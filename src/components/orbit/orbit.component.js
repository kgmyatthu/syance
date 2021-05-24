import React, {useState, useEffect, useRef} from 'react'
import styles from './orbit.module.css';


export const OrbitViewer = ({elements}) => {
    let [iframeURL, setIframeURL] = useState();
    let container = useRef();
    let iframe = useRef();

    useEffect(() => {
        if(elements){
            let {w, e, epoch, tp, per, om, ad, q, label, i} = elements;
            setIframeURL(`https://cneos.jpl.nasa.gov/ov/index.html#elem=w:${w},e:${e},epoch:${epoch},tp:${tp},per:${per},om:${om},ad:${ad},q:${q},label:${label},i:${i}`);
        }else{
            setIframeURL(`https://cneos.jpl.nasa.gov/ov/index.html`);
        }
    }, [])


    return (
        <>
            <div className={styles.iframewrapper} ref={container}>
            <iframe className={styles.orbitviewer} 
                    ref={iframe}
                    key={iframeURL} src={iframeURL} 
                    title="orbit Viewer" 
                    frameBorder="0" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen></iframe>
            </div>

        </>
    )
}

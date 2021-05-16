import React from 'react'
import styles from '../../assets/css/label.module.css';

const Tooltip = ({tip, children}) => {

    return (
        <>
            <span className={styles.label}>{children}
            {tip ? <small className={styles.tooltip}>{tip}</small> : <></>}
            </span>
        </>
    )
}
export default Tooltip;
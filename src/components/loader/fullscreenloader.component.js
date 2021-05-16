import React from 'react';
import styles from './loader.module.css';

const FullscreenLoader = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.dot}><span className={styles.text}>LOADING DATA...</span></div>
                    
                </div>
                
            </div>
        </>
    )
}
export default FullscreenLoader;
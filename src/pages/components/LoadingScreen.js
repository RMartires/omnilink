import React from 'react';
import classes from './LoadingScreen.module.css'
function LoadingScreen() {

    return (
        <div className={classes.spinnerbox}>
            <div className={classes.leoborder1}>
                <div className={classes.leocore1}></div>
            </div>
            <div className={classes.leoborder2}>
                <div className={classes.leocore2}></div>
            </div>
            <p style={{ fontSize: '1.8rem' }}>
                Loading...
            </p>
        </div>
    );
}

export default LoadingScreen;
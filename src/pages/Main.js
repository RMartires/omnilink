import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import classes from './Main.module.css';

class Main extends Component {
    state = {};

    render() {
        return (
            <Grid container
                direction='column'
                alignItems='center'
                style={{ width: '100vw', height: '100vh' }}
                md={12}
            >
                <Grid item style={{ width: '100%' }}>
                    <AppBar position="static" color='secondary' className={classes.appbar}>
                        <Toolbar className={classes.toolbar}>
                            <Button color="inherit">login</Button>
                            <Button color="inherit">about</Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item style={{ width: '100%', textAlign: 'center', paddingTop: '15%', fontSize: '1.3rem' }}>
                    <h1>Omnilink</h1>
                    <h3>we provide link solutions for ur link needs, we give u one link for all your</h3>
                    <h3>links so you can link ur links with all your other links.</h3>
                </Grid>
            </Grid>
        );
    }

}

export default Main;
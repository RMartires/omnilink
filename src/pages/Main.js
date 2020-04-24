import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import classes from './Main.module.css';

const styles = theme => ({
    title: {
        [theme.breakpoints.up('md')]: {
            variant: "h2"
        }, [theme.breakpoints.down('md')]: {
            variant: "h3"
        },
    },
});

const classes1 = makeStyles(styles);

class Main extends Component {
    state = {};

    render() {
        return (
            <Grid container
                direction='column'
                alignItems='center'
            >
                <Grid item style={{ width: '100%' }}>
                    <AppBar position="static" color='secondary' className={classes.appbar}>
                        <Toolbar className={classes.toolbar}>
                            <Button color="inherit">login</Button>
                            <Button color="inherit">about</Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item style={{ width: '100%', textAlign: 'center', paddingTop: '15%' }}
                    xs={6}
                >
                    <Typography gutterBottom className={classes1.title}>
                        Omnilink
                    </Typography>
                    <Typography variant="subtitle1">
                        A home 🏡 for your links
                    </Typography>
                </Grid>
            </Grid>
        );
    }

}

export default Main;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '100%',
        height: '120%',
        marginTop: '10%'
    },
    paper: {
        width: '100%',
        height: '120%',
        textAlign: 'center',
        fontSize: '2rem'
    }
}));

const UserProfile = (props) => {

    const classes = useStyles();

    return (
        <div>
            <Grid
                container
                direction='column'
                alignItems='center'
                justify='space-around'
                spacing='3'
            >
                <Grid item lg={8} md={8} sm={5} xs={8}>
                    <Avatar alt="Profile_picture" src={props.profile_picture} className={classes.avatar} />
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>{props.user_name}</Paper>
                </Grid>

            </Grid>
        </div>
    );
};

export default UserProfile;
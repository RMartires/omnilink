import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    paper: {
        textAlign: 'center',
        fontSize: '1.5rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-150px',
        marginLeft: '-150px',
        width: '300px',
        height: '300px'
    },
    delpaper: {
        textAlign: 'center',
        fontSize: '1.5rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-100px',
        marginLeft: '-150px',
        width: '300px',
        height: '200px'
    }
}));

function CoustomModal(props) {

    const classes = useStyles();


    var edit = props.edit;
    var del = props.del;

    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            justify='space-around'
        >
            <Grid item >
                <Modal
                    open={edit}
                    onClose={() => { props.setEdit(false) }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Paper elevation={0} className={classes.paper}>
                        <div>
                            <p>Edit</p>
                            <TextField id="outlined-basic" label="Title" variant="outlined" />
                            <TextField id="outlined-basic" label="link" variant="outlined" style={{ marginTop: '10px' }} />
                            <div style={{ marginTop: '10px' }}>
                                <Button variant="contained" color="primary">
                                    Save
                            </Button>
                            </div>
                        </div>
                    </Paper>
                </Modal>
            </Grid>
            <Grid item>
                <Modal
                    open={del}
                    onClose={() => { props.setDel(false) }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Paper elevation={0} className={classes.delpaper}>
                        <div>
                            <p>Hey 🙌, sure u want to delete this link?</p>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                        </div>
                    </Paper>
                </Modal>
            </Grid>

        </Grid >
    );
}

export default CoustomModal;
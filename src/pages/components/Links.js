import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import { FormControl } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

const Link = (props) => {

    const [anchorEl, setAnchorEl] = useState();

    const handleclick = (event) => {
        //console.log(event);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid item style={{ width: '90%', backgroundColor: props.color.dominant }}>
            <Card style={{ backgroundColor: props.color.accent2 }} onClick={() => { /*window.location.href = 'http://www.google.com'*/ }}>
                <CardHeader style={{ textAlign: 'center', fontSize: '0.6rem' }}
                    action={
                        <div>
                            <IconButton aria-controls={`simple-menu${props.id}`} aria-haspopup="true">
                                <MoreVertIcon onClick={(e) => { handleclick(e) }} />
                            </IconButton>
                            <Menu
                                id={`simple-menu${props.id}`}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => { handleClose() }}
                            >
                                <MenuItem onClick={() => { handleClose() }}>Edit</MenuItem>
                                <MenuItem onClick={() => { handleClose() }}>Delete</MenuItem>
                            </Menu>
                        </div>
                    }
                    title="link 1"
                    subheader="www.google.com"
                >
                </CardHeader>
            </Card >
        </Grid>
    );
};

export default Link;
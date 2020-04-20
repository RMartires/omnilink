import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import CoustomModal from './CoustomModal';


const Link = (props) => {

    const [anchorEl, setAnchorEl] = useState();

    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);

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
                            <IconButton aria-controls={`simple-menu${props.id}`} aria-haspopup="true"
                                onClick={(e) => { handleclick(e) }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id={`simple-menu${props.id}`}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => { handleClose() }}
                            >
                                <MenuItem onClick={() => { setEdit(true) }}>Edit</MenuItem>
                                <MenuItem onClick={() => { setDel(true) }}>Delete</MenuItem>
                            </Menu>
                        </div>
                    }
                    title="link 1"
                    subheader="www.google.com"
                >
                </CardHeader>
            </Card >
            <CoustomModal
                edit={edit}
                del={del}
                setEdit={setEdit}
                setDel={setDel}
            />
        </Grid>
    );
};

export default Link;
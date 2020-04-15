import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Link = (props) => {

    return (
        <Card
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>}
        >
            <CardContent>
                link 1
            </CardContent>
        </Card >
    );
};

export default Link;
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "100%",
    height: "120%",
    marginTop: "10%",
  },
  paper: {
    width: "110%",
    height: "120%",
    textAlign: "center",
    fontSize: "1.5rem",
    paddingTop: "0px",
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();

  const handleclick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    props.setToken(undefined);
  };

  const logoutbutton = () => {
    if (props.token) {
      return (
        <Grid
          item
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingBottom: "0px",
            paddingRight: "0px",
          }}
        >
          <IconButton
            aria-controls={`simple-menu`}
            aria-haspopup="true"
            onClick={(e) => {
              handleclick(e);
            }}
            style={{ alignSelf: "flex-end" }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id={`simple-menu`}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              handleClose();
            }}
          >
            <MenuItem
              onClick={() => {
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Grid>
      );
    }
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-around"
        spacing="3"
        style={{ marginBottom: "5%" }}
      >
        {logoutbutton()}
        <Grid
          item
          xl={3}
          lg={4}
          md={4}
          sm={5}
          xs={8}
          style={{ paddingTop: "0px" }}
        >
          <Avatar
            alt="Profile_picture"
            src={props.profile_picture}
            className={classes.avatar}
          />
        </Grid>
        <Grid item style={{ paddingTop: "0px" }}>
          <p
            style={{ backgroundColor: props.color.accent1 }}
            className={classes.paper}
          >
            👉{props.user_name}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;

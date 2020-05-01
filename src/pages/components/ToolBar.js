import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, Redirect } from "react-router-dom";
import classes1 from "../Main.module.css";

function ToolBar(props) {
  const [page, setPage] = useState();
  const [pageredirect, setPageredirect] = useState();

  const redirect = () => {
    if (pageredirect) {
      return <Redirect to={page} />;
    }
  };

  const buttons = props.buttons.map((but) => {
    return (
      <Button
        color="inherit"
        onClick={() => {
          setPage(`/${but}`);
          setPageredirect(true);
        }}
      >
        {but}
      </Button>
    );
  });

  return (
    <Grid item style={{ width: "100%" }}>
      <AppBar
        position="static"
        className={classes1.appbar}
        style={{ backgroundColor: "black" }}
      >
        <Toolbar className={classes1.toolbar}>{buttons}</Toolbar>
      </AppBar>
      {redirect()}
    </Grid>
  );
}

export default ToolBar;

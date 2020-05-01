import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Link, Redirect } from "react-router-dom";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import ToolBar from "./components/ToolBar";
import classes1 from "./Main.module.css";

var theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function About(props) {
  return (
    <Grid container direction="column" alignItems="center">
      <ToolBar buttons={["home", "login"]} />
      <Grid container item direction="row" style={{ height: "100vh" }}>
        {/* //1st row */}
        <Grid
          item
          style={{ width: "50%", textAlign: "center", paddingTop: "15%" }}
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h1" theme={theme}>
              Omnilink🚀
            </Typography>
            <Typography variant="h2">About</Typography>
          </ThemeProvider>
        </Grid>
        <Grid
          item
          style={{
            width: "50%",
            paddingTop: "15%",
          }}
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h4" style={{ display: "inline-block" }}>
              A great place to keep all those social links🤗
            </Typography>
            <Typography variant="h4" style={{ display: "inline-block" }}>
              any feedback hit me up
              <a href="https://twitter.com/RohitMartires" target="_blank">
                @RohitMartires
              </a>
            </Typography>
            <Typography
              variant="h5"
              style={{ display: "inline-block", marginTop: "10%" }}
            >
              Are you an agency, lets talk 👉
              <a href="mailto:rohitmartires14@gmail.com" target="_blank">
                Email
              </a>
            </Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
      <Paper
        elevation={0}
        style={{
          width: "100%",
          height: "15vh",
          backgroundColor: "black",
          marginTop: "5%",
        }}
        square
      >
        <Grid
          item
          container
          direction="row"
          style={{ marginTop: "30px", justifyContent: "space-evenly" }}
        >
          <Grid item>
            <Link to="/home" className={classes1.linkcol}>
              Home
            </Link>
          </Grid>
          <Grid item>
            <Link to="/about" className={classes1.linkcol}>
              About
            </Link>
          </Grid>
          <Grid item>
            <Link to="/login" className={classes1.linkcol}>
              Login
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default About;

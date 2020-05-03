import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

import productimage from "../assets/product.png";

import Paper from "@material-ui/core/Paper";

import classes1 from "./Main.module.css";

var theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = theme=>({
  toprow: {
    [theme.breakpoints.up('sm')]:{
      height:'100vh'
    }
  }
});

class Main extends Component {
  state = {
    loginpage: false,
  };

  renderlogin = () => {
    if (this.state.loginpage) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes1.mainbody}
      >
        <Grid item style={{ width: "100%" }}>
          <AppBar
            position="static"
            className={classes1.appbar}
            style={{ backgroundColor: "black" }}
          >
            <Toolbar className={classes1.toolbar}>
              <Button
                color="inherit"
                onClick={() => {
                  this.setState({ loginpage: true });
                }}
              >
                login
              </Button>
              {this.renderlogin()}
              <Button color="inherit">about</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container item direction="row" className={classes.toprow}>
          {/* //1st row */}
          <Grid
            item
            style={{  textAlign: "center", paddingTop: "15%" }}
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <ThemeProvider theme={theme}>
              <Typography gutterBottom variant="h1" theme={theme}>
                Omnilink
              </Typography>
              <Typography variant="h5">Link Different😜</Typography>
              <Button
                style={{ backgroundColor: "#00bb77", marginTop: "5%" }}
                size="large"
                onClick={() => {
                  this.setState({ loginpage: true });
                }}
              >
                Join for free
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid
            item
            style={{  height: "100%" }}
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <img
              src={productimage}
              alt="Omnilink"
              style={{ width: "100%" }}
            ></img>
          </Grid>
        </Grid>
        {/* //2nd row */}
        <Grid
          item
          style={{
            width: "100%",
            paddingTop: "10vh",
            paddingBottom: "10vh",
            backgroundColor: "white",
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              theme={theme}
              style={{ textAlign: "center" }}
            >
              Great Minds Link Alike.
            </Typography>
          </ThemeProvider>
        </Grid>
        <Grid
          container
          item
          direction="row"
          style={{
            justifyContent: "space-around",
          }}
        >
          <Grid
            item
            style={{ width: "30%", textAlign: "center", paddingTop: "5%" }}
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <ThemeProvider theme={theme}>
              <Typography gutterBottom variant="h4" theme={theme}>
                Easy setup
              </Typography>
              <Typography variant="body1">
                It takes like two clicks to create a link account. Just
                authorize with your instagram account add the links and paste
                the link in any of your profiles.
              </Typography>
            </ThemeProvider>
          </Grid>
          <Grid
            item
            style={{ width: "30%", textAlign: "center", paddingTop: "5%" }}
            xs={10}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <ThemeProvider theme={theme}>
              <Typography gutterBottom variant="h4" theme={theme}>
                Analytics
              </Typography>
              <Typography variant="body1">
                Use omnilink to measure your links activity and find out what
                your more popular.
              </Typography>
            </ThemeProvider>
          </Grid>
          <Grid
            item
            style={{ width: "30%", textAlign: "center", paddingTop: "5%" }}
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <ThemeProvider theme={theme}>
              <Typography gutterBottom variant="h4" theme={theme}>
                20+ Themes
              </Typography>
              <Typography variant="body1">
                Make your link page stand out, Customize your page with a varity
                of more than 20 themes
              </Typography>
            </ThemeProvider>
          </Grid>
        </Grid>
        {/* //3rd */}
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
              <Link>Home</Link>
            </Grid>
            <Grid item>
              <Link>About</Link>
            </Grid>
            <Grid item>
              <Link>Login</Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Main) ;

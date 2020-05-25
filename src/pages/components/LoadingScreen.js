import React from "react";
//import classes from './LoadingScreen.module.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@keyframes spin3D": {
    from: {
      transform: "rotate3d(0deg)",
    },
    to: {
      transform: "rotate3d(.5,.5,.5, 360deg)",
    },
  },
  spinnerbox: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  /* SPINNING CIRCLE */

  leoborder1: {
    position: "absolute",
    width: "150px",
    height: "150px",
    padding: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "rgb(63,249,220)",
    background:
      "linear-gradient(0deg, rgba(63,249,220,0.1) 33%, rgba(63,249,220,1) 100%)",
    animation: "$spin3D 1.8s linear 0s infinite",
  },

  leocore1: {
    width: "100%",
    height: "100%",
    backgroundColor: "#37474faa",
    borderRadius: "50%",
  },

  leoborder2: {
    position: "absolute",
    width: "150px",
    height: "150px",
    padding: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "rgb(63,249,220)",
    background:
      "linear-gradient(0deg, rgba(255, 171, 145,0.1) 33%, rgba(255, 171, 145,1) 100%)",
    animation: "$spin3D 2.2s linear 0s infinite",
  },

  leocore2: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffab91aa",
    borderRadius: "50%",
  },
  "*": {
    boxSizing: "border-box",
  },
}));

const footer = () => {
  return (
    <Row>
      <Col xs={12} style={{ padding: "0px" }}>
        <p
          style={{
            height: "5vh",
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            margin: "0px",
          }}
        >
          <a href="/" target="_blank" style={{ color: "white" }}>
            Creat your own Omnilink page
          </a>
        </p>
      </Col>
    </Row>
  );
};

function LoadingScreen() {
  const classes = useStyles();

  return (
    <Container fluid>
      <Row style={{ height: "95vh" }}>
        <Col>
          <div className={classes.spinnerbox}>
            <div className={classes.leoborder1}>
              <div className={classes.leocore1}></div>
            </div>
            <div className={classes.leoborder2}>
              <div className={classes.leocore2}></div>
            </div>
            <p style={{ fontSize: "1.8rem" }}>Loading...</p>
          </div>
        </Col>
      </Row>
      {footer()}
    </Container>
  );
}

export default LoadingScreen;

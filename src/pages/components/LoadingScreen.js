import React from "react";
import classes from "./LoadingScreen.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import backdrop_bottom from "../../assets/backdrop_bottom.svg";

const footer = (onlyspinner) => {
  if (!onlyspinner) {
    return (
      <Row>
        <Col xs={12} style={{ padding: "0px" }}>
          <div
            style={{
              height: "fitContent",
              textAlign: "center",
              margin: "0px",
              display: "flex",
              justifyContent: "center",
              padding: "1vh",
            }}
          >
            <a
              href="/"
              target="_blank"
              style={{
                color: "black",
                height: "fitContent",
                textDecoration: "underline",
              }}
            >
              Creat your own linnkninja page
            </a>
          </div>
        </Col>
      </Row>
    );
  }
};

function LoadingScreen(props) {
  return (
    <Container fluid>
      <Row style={props.onlyspinner ? { height: "100vh" } : { height: "95vh" }}>
        <img
          style={{
            width: "100%",
            margin: "0 auto",
            position: "absolute",
            height: "50vh",
            top: "0px",
          }}
          src={backdrop_bottom}
        />
        <Col>
          <div class={classes.loader}>Loading...</div>
        </Col>
      </Row>
      {footer(props.onlyspinner)}
    </Container>
  );
}

export default LoadingScreen;

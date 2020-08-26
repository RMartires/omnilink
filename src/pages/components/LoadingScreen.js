import React from "react";
import classes from "./LoadingScreen.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const footer = (onlyspinner) => {
  if (!onlyspinner) {
    return (
      <Row>
        <Col xs={12} style={{ padding: "0px" }}>
          <div
            style={{
              height: "fitContent",
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              margin: "0px",
              display: "flex",
              justifyContent: "center",
              padding: "1vh",
            }}
          >
            <a href="/" target="_blank" style={{ color: "white" }}>
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
        <Col>
          <div class={classes.loader}>Loading...</div>
        </Col>
      </Row>
      {footer(props.onlyspinner)}
    </Container>
  );
}

export default LoadingScreen;

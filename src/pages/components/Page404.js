import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import classes from "./LoadingScreen.module.scss";
import backdrop_bottom from "../../assets/backdrop_bottom.svg";

const footer = () => {
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
};

function Page404() {
  return (
    <div>
      <Container fluid style={{ height: "95vh" }}>
        <Row style={{ height: "100%" }} className="align-items-center">
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
            <h3
              style={{ display: "flex", justifyContent: "center" }}
              class={classes.error}
            >
              404 Error
            </h3>
          </Col>
        </Row>
        {footer()}
      </Container>
    </div>
  );
}

export default Page404;

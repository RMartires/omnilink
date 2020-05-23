import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

function Page404() {
  return (
    <div>
      <Container style={{ height: "95vh" }}>
        <Row style={{ height: "100%" }} className="align-items-center">
          <Col>
            <h1 style={{ fontSize: "6rem", textAlign: "center" }}>
              {" "}
              404 ERROR{" "}
            </h1>
          </Col>
        </Row>
        {footer()}
      </Container>
    </div>
  );
}

export default Page404;

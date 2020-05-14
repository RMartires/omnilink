import React from "react";
import ToolBar from "./components/ToolBar";
import classes1 from "./Main.module.css";

//

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./components/Footer";

function About(props) {
  return (
    <div>
      <ToolBar buttons={["home", "login"]} />
      <Container fluid>
        <Row
          style={{ height: "90vh", textAlign: "center" }}
          className="align-items-center"
        >
          <Col xs={12} sm={6}>
            <h1 style={{ fontSize: "4em" }}>Omnilink🚀</h1>
          </Col>
          <Col xs={12} sm={6}>
            <h2> A great place to keep all those social links🤗</h2>
            <h2>
              any feedback hit me up
              <a href="https://twitter.com/RohitMartires" target="_blank">
                @RohitMartires
              </a>
            </h2>
            <h3>
              {" "}
              Are you an agency, lets talk 👉
              <a href="mailto:rohitmartires14@gmail.com" target="_blank">
                Email
              </a>
            </h3>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default About;

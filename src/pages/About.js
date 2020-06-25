import React from "react";
import ToolBar from "./components/ToolBar";
import classes1 from "./Main.module.css";

//

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "./components/Footer";

import Image from "react-bootstrap/Image";
import me from "../assets/me.jpg";

function About(props) {
  return (
    <div>
      <Row
        style={{ height: "90vh", textAlign: "center" }}
        className="align-items-center"
      >
        <Col xs={12} sm={6}>
          <h2 style={{ fontSize: "3em" }}>Octolink🚀</h2>
          <h3>Made by me</h3>
          <Row className="justify-content-center">
            <Col xs={8} sm={6}>
              <Image src={me} roundedCircle fluid />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6}>
          <h2>
            any feedback hit me up{" "}
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
    </div>
  );
}

export default About;

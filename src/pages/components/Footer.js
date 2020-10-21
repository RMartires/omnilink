import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer(props) {
  return (
    <Row
      style={{ backgroundColor: "white", height: "10vh", textAlign: "center" }}
      className="align-items-center"
    >
      <Col>
        <a style={{ color: "black" }} href="/#intro">
          Home
        </a>
      </Col>
      <Col>
        <a style={{ color: "black" }} href="/#features">
          Features
        </a>
      </Col>
      <Col>
        <a style={{ color: "black" }} href="/#about">
          About
        </a>
      </Col>
      <Col>
        <a style={{ color: "black" }} href="/privacy">
          Privacy
        </a>
      </Col>
    </Row>
  );
}

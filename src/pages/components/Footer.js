import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer(props) {
  return (
    <Row
      style={{ backgroundColor: "black", height: "10vh", textAlign: "center" }}
      className="align-items-center"
    >
      <Col>
        <a href="/#intro">Home</a>
      </Col>
      <Col>
        <a href="/#features">Features</a>
      </Col>
      <Col>
        <a href="/#about">About</a>
      </Col>
    </Row>
  );
}

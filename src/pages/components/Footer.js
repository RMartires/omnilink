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
        <Link to="/home">Home</Link>
      </Col>
      <Col>
        <Link to="/login">Login</Link>
      </Col>
      <Col>
        <Link to="/about">About</Link>
      </Col>
    </Row>
  );
}

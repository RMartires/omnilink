import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./Main.module.css";

function clickInstagram() {
  var clientid, redirect_uri;
  if (process.env.NODE_ENV == "production") {
    clientid = process.env.REACT_APP_IN_CLIENT_ID;
    redirect_uri = process.env.REACT_APP_IN_REDIRECT_URI;
  } else {
    clientid = window._env.REACT_APP_IN_CLIENT_ID;
    redirect_uri = window._env.REACT_APP_IN_REDIRECT_URI;
  }
  var url =
    "https://api.instagram.com/oauth/authorize" +
    `?client_id=${clientid}` +
    `&redirect_uri=${redirect_uri}` +
    "&scope=user_profile,user_media" +
    "&response_type=code";

  window.location.href = url;
}

export default function Setup() {
  return (
    <Container style={{ height: "100vh" }}>
      <Row style={{ height: "100%", fontSize: "1.5em" }}>
        <Col style={{ textAlign: "center" }} className="align-self-center">
          <h1 className={classes.sectionname}>Setup</h1>
          <p>
            Octolink will link to instagram to get your unique username and
            profile picture
          </p>
          <Button onClick={clickInstagram} style={{ fontSize: "1.1em" }}>
            link to Instagram
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

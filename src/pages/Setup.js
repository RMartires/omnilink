import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaInstagram, FaTwitter } from "react-icons/fa";

import { obtainOauthRequestToken } from "react-twitter-login/dist/services/oauth1";

//import { requestTokenSignature } from "./components/twitterSignature";

import classes from "./Main.module.css";

import backdrop_bottom from "../assets/backdrop_bottom.svg";

var clientid, redirect_uri, TCoustomerKey, TCoustomerSecret;
if (process.env.NODE_ENV == "production") {
  clientid = process.env.REACT_APP_IN_CLIENT_ID;
  redirect_uri = process.env.REACT_APP_IN_REDIRECT_URI;
  TCoustomerKey = process.env.REACT_APP_T_COUSTOMER_KEY;
  TCoustomerSecret = process.env.REACT_APP_T_COUSTOMER_SECRET;
} else {
  clientid = window._env.REACT_APP_IN_CLIENT_ID;
  redirect_uri = window._env.REACT_APP_IN_REDIRECT_URI;
  TCoustomerKey = process.env.REACT_APP_T_COUSTOMER_KEY;
  TCoustomerSecret = process.env.REACT_APP_T_COUSTOMER_SECRET;
}

function clickInstagram() {
  var url =
    "https://api.instagram.com/oauth/authorize" +
    `?client_id=${clientid}` +
    `&redirect_uri=${redirect_uri}` +
    "&scope=user_profile,user_media" +
    "&response_type=code";

  window.location.href = url;
}

async function clickTwitter() {
  var requestTokenData = await obtainOauthRequestToken({
    method: "POST",
    apiUrl: "https://api.twitter.com/oauth/request_token",
    callbackUrl: redirect_uri + "t",
    consumerKey: TCoustomerKey,
    consumerSecret: TCoustomerSecret,
  });

  if (requestTokenData.oauth_callback_confirmed === "true") {
    window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenData.oauth_token}`;
  }
}

export default function Setup() {
  return (
    <Container style={{ height: "100vh", maxWidth: "1200px" }} fluid>
      <Row style={{ height: "100%" }} className="justify-content-center">
        <img
          style={{
            width: "100%",
            margin: "0 auto",
            position: "absolute",
            height: "35vh",
          }}
          src={backdrop_bottom}
        />
        <Col
          style={{ textAlign: "center" }}
          className="align-self-center"
          xs={12}
          sm={5}
        >
          <h1 className={classes.setupsection}>Setup</h1>
          <p>
            complete setup by linking to any account, linnkninja usees this to
            get your unique username and profile picture 🙌
          </p>
          {/*  */}
          <a
            class="btn btn-block btn-social btn-twitter btn-lg"
            onClick={clickTwitter}
            style={{
              fontSize: "1.1em",
              width: "75%",
              margin: "auto",
              color: "white",
              marginBottom: "10px",
            }}
          >
            <FaTwitter style={{ margin: "auto" }} /> link with twitter
          </a>

          <a
            class="btn btn-block btn-social btn-instagram btn-lg"
            onClick={clickInstagram}
            style={{
              fontSize: "1.1em",
              width: "75%",
              margin: "auto",
              color: "white",
              marginBottom: "10px",
            }}
          >
            <FaInstagram style={{ margin: "auto" }} /> link with instagram
          </a>
        </Col>
      </Row>
    </Container>
  );
}

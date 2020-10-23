import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import { FaInstagram, FaTwitter } from "react-icons/fa";

import { obtainOauthRequestToken } from "react-twitter-login/dist/services/oauth1";

//import { requestTokenSignature } from "./components/twitterSignature";

import classes from "./Main.module.css";

import backdrop_bottom from "../assets/backdrop_bottom.svg";

var clientid, redirect_uri, TCoustomerKey, TCoustomerSecret, Tredirect_url;
if (process.env.NODE_ENV == "production") {
  clientid = process.env.REACT_APP_IN_CLIENT_ID;
  redirect_uri = process.env.REACT_APP_IN_REDIRECT_URI;
  TCoustomerKey = process.env.REACT_APP_T_COUSTOMER_KEY;
  TCoustomerSecret = process.env.REACT_APP_T_COUSTOMER_SECRET;
  Tredirect_url = process.env.REACT_APP_T_REDIRECT_URL;
} else {
  clientid = window._env.REACT_APP_IN_CLIENT_ID;
  redirect_uri = window._env.REACT_APP_IN_REDIRECT_URI;
  TCoustomerKey = window._env.REACT_APP_T_COUSTOMER_KEY;
  TCoustomerSecret = window._env.REACT_APP_T_COUSTOMER_SECRET;
  Tredirect_url = window._env.REACT_APP_T_REDIRECT_URL;
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

function modalInstagram() {}

async function clickTwitter() {
  var requestTokenData = await obtainOauthRequestToken({
    method: "POST",
    apiUrl: "https://api.twitter.com/oauth/request_token",
    callbackUrl: Tredirect_url,
    consumerKey: TCoustomerKey,
    consumerSecret: TCoustomerSecret,
  });

  if (requestTokenData.oauth_callback_confirmed === "true") {
    window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenData.oauth_token}`;
  }
}

export default function Setup() {
  const [instaTest, setInstaTest] = useState(false);

  return (
    <Container style={{ height: "100vh", maxWidth: "1200px" }} fluid>
      <Modal
        show={instaTest}
        onHide={() => {
          setInstaTest(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Alert !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Psst. instagram setup is still in testing phase, only continue if
            your instagram account has testing access for linnkninja. <br /> you
            can ping me{" "}
            <a href="https://twitter.com/RohitMartires" target="_blank">
              @RohitMartires
            </a>{" "}
            for access 🙌
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={clickInstagram}>Continue</Button>
        </Modal.Footer>
      </Modal>
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
            onClick={() => {
              setInstaTest(true);
            }}
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

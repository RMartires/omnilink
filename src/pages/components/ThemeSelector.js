import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import BsButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FaBeer } from "react-icons/fa";

import classes from "./ThemeSelector.module.css";
import cardfont from "./ThemeSelector2.module.css";

var Airtable = require("airtable");
var base;
if (process.env.NODE_ENV == "production") {
  base = new Airtable({ apiKey: process.env.REACT_APP_ATapikey }).base(
    process.env.REACT_APP_ATbase
  );
} else {
  base = new Airtable({ apiKey: window._env.REACT_APP_ATapikey }).base(
    window._env.REACT_APP_ATbase
  );
}

export default function ThemeSelector(props) {
  useEffect(() => {
    if (props.theme) {
      document.body.className = classes["theme" + props.theme];
      //end
    }
  });

  const setCurrenttheme = (classname) => {
    var themenumber = classname.split("theme")[1];
    props.setToast(themenumber);
    base("users").update(
      [
        {
          id: props.userid,
          fields: {
            theme: themenumber,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        props.setToast(themenumber);
      }
    );
  };

  var themes = [];

  for (const theme in classes) {
    themes.push(
      <Col
        xs={3}
        onClick={() => {
          setCurrenttheme(theme);
        }}
      >
        {/* <Image roundedCircle /> */}
        <div
          style={{
            width: "50px",
            height: "50px",
            marginTop: "10px",
            marginBottom: "10px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
          className={classes[theme]}
        ></div>
      </Col>
    );
  }

  return (
    <div>
      <Modal
        show={props.ShowSelectTheme}
        onHide={() => {
          props.setShowTheme(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Theme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>{themes}</Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

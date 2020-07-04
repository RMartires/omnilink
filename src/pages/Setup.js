import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import add_profile from "../assets/add_profile.png";
import FormControl from "react-bootstrap/FormControl";
import { FilePicker } from "react-file-picker";

import classes from "./Main.module.css";

var Airtable = require("airtable");

var api;
var link;
var base;
if (process.env.NODE_ENV == "production") {
  base = new Airtable({ apiKey: process.env.REACT_APP_ATapikey }).base(
    process.env.REACT_APP_ATbase
  );
  api = {
    apikey: process.env.REACT_APP_ATapikey,
    apibase: process.env.REACT_APP_ATbase,
  };
  link = "https://omnilink.herokuapp.com/auth/";
} else {
  base = new Airtable({ apiKey: window._env.REACT_APP_ATapikey }).base(
    window._env.REACT_APP_ATbase
  );
  api = {
    apikey: window._env.REACT_APP_ATapikey,
    apibase: window._env.REACT_APP_ATbase,
  };
  link = "http://localhost:5000/auth/";
}

export default function Setup(props) {
  const [username, setUsername] = useState("");
  const [create, setCreate] = useState(undefined);
  const [users, setUsers] = useState([]);
  var allusers = [];

  useEffect(() => {
    base("users")
      .select({
        maxRecords: 3,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            allusers.push(record.get("username"));
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          setUsers(allusers);
        }
      );
    //
    //other vars
    //
  }, []);

  return (
    <Container style={{ height: "100vh", maxWidth: "1200px" }} fluid>
      <Row style={{ height: "100%" }} className="justify-content-center">
        <Col
          style={{ textAlign: "center" }}
          className="align-self-center"
          xs={8}
          sm={7}
          md={5}
          lg={3}
        >
          <h1 className={classes.sectionname}>Setup</h1>
          <FilePicker
            extensions={["md"]}
            onChange={(FileObject) => {
              /* do something with File object */
            }}
            onError={(errMsg) => {
              /* do something with err msg string */
            }}
          >
            <Image src={add_profile} roundedCircle fluid />
          </FilePicker>
          <FormControl
            style={{ marginTop: "50px" }}
            placeholder="username"
            aria-label="username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              // console.log(errorMessages);
              if (users.includes(e.target.value)) {
                setCreate("disabled");
              } else {
                setCreate(undefined);
              }
              setUsername(e.target.value);
            }}
            // onChange={validate}
            type="text"
            name="username"
            value={username}
          />
          <p style={{ color: "red" }}>
            {create ? "Error: username already exists" : ""}
          </p>
          <Button
            style={{ marginTop: "20px" }}
            variant="success"
            className={create}
            onClick={() => {
              if (create === undefined && username !== "") {
                axios({
                  url: link + username,
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: {
                    email: props.email,
                    userID: props.userID,
                  },
                })
                  .then((res) => {
                    console.log(res);
                    return res.data;
                  })
                  .then((resdata) => {
                    props.setToken(resdata.token);
                  });
              }
            }}
          >
            Create
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

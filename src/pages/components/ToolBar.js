// eslint-disable-next-line
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, Redirect } from "react-router-dom";
import FbLogin from "../components/FbLogin";
import classes1 from "../Main.module.css";

import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ToolBar(props) {
  const [page, setPage] = useState();
  const [pageredirect, setPageredirect] = useState();

  const redirect = () => {
    if (pageredirect) {
      return <Redirect to={page} />;
    }
  };

  const buttons = props.buttons.map((but) => {
    if (but == "login") {
      return (
        <FbLogin text={"login"} setToken={props.setToken} token={props.token} />
      );
    } else {
      return (
        <Button
          onClick={() => {
            // setPage(`/home/#${but}`);
            // setPageredirect(true);
            window.location.href = `/#${but}`;
          }}
          style={{
            marginLeft: "5px",
            marginRight: "5px",
            backgroundColor: "#0000",
            borderColor: "#0000",
            color: "black",
          }}
        >
          {but}
        </Button>
      );
    }
  });

  return (
    <Row className="no-gutters">
      <Col>
        <Navbar
          style={{
            backgroundColor: "#0000",
            paddingRight: "0px",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              fontSize: "1.3rem",
            }}
          >
            linnkninja
          </p>
          <div style={{ display: "flex" }}>{buttons}</div>
          {redirect()}
        </Navbar>
      </Col>
    </Row>
  );
}

export default ToolBar;

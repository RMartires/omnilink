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
        <FbLogin
          text={"login"}
          color={"black"}
          setToken={props.setToken}
          token={props.token}
        />
      );
    } else {
      return (
        <Button
          variant="dark"
          onClick={() => {
            // setPage(`/home/#${but}`);
            // setPageredirect(true);
            window.location.href = `/home/#${but}`;
          }}
          style={{
            marginLeft: "5px",
            marginRight: "5px",
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
          style={{ backgroundColor: "black", paddingRight: "0px" }}
          className="justify-content-end"
        >
          {buttons}
          {redirect()}
        </Navbar>
      </Col>
    </Row>
  );
}

export default ToolBar;

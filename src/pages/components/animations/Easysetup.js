import React from "react";
import Button from "react-bootstrap/Button";
import { FaFacebook } from "react-icons/fa";
import classes from "./Easysetup.module.css";

export default function Easysetup() {
  return (
    <div class={classes.easy}>
      <a
        class="btn btn-block btn-social btn-facebook"
        style={{
          width: "200px",
          height: "100px",
          width: "fit-content",
          margin: "auto",
          color: "white",
        }}
      >
        <FaFacebook style={{ margin: "auto" }} />{" "}
        <p style={{ marginTop: "25px" }}>login with Facebook</p>
      </a>
      <div class={classes.cursor}></div>
    </div>
  );
}

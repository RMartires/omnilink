import React from "react";
import Button from "react-bootstrap/Button";
import classes from "./Easysetup.module.css";

export default function Easysetup() {
  return (
    <div class={classes.easy}>
      <Button style={{ width: "200px", height: "100px" }} variant="success">
        Instagram Login
      </Button>
      <div class={classes.cursor}></div>
    </div>
  );
}

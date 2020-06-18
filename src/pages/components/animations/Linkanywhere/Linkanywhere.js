import React from "react";
import classes from "./Linkanywhere.module.css";

export default function Linkanywhere() {
  return (
    <div className={classes.main}>
      <div className={classes.one + " " + classes.card}></div>

      <div className={classes.two + " " + classes.card}></div>

      <div className={classes.three + " " + classes.card}></div>
      <div className={classes.four + " " + classes.card}></div>
    </div>
  );
}

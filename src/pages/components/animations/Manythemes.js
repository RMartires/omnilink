import React, { useState, useEffect } from "react";
import classes from "./Manythemes.module.css";
import themeclasses from "../ThemeSelector.module.css";

export default function Manythemes() {
  var themes = [];
  useEffect(() => {
    for (const temp in themeclasses) {
      themes.push(temp);
    }

    var i = 0;
    var t1 = document.getElementById("t1");
    var timer = setInterval(() => {
      i++;
      if (i > 14) {
        i = 0;
      }
      t1.className = themeclasses[themes[i]] + " " + classes.rotateCenter;
    }, 1200);
    //

    return () => {
      clearInterval(timer);
    };
  });

  return <div id="t1"></div>;
}

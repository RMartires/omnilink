import React, { useState, useEffect } from "react";
import classes from "./Linkanywhere.module.css";

export default function Linkanywhere() {
  useEffect(() => {
    var instalink =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png";

    var twitterlink =
      "https://3.bp.blogspot.com/-NxouMmz2bOY/T8_ac97cesI/AAAAAAAAGg0/e3vY1_bdnbE/s1600/Twitter+logo+2012.png";

    var snapchatlink =
      "https://www.freepnglogos.com/uploads/snapchat-icon-logo-png-15.png";

    var linkdinlink =
      "https://lh3.googleusercontent.com/fqYJHtyzZzA4vacRzeJoB93QNvA5-mvR-8UB5oVLxdYDSTpfLp_KgYD4IqVGJUgFEJo";

    var facebooklink = "https://www.facebook.com/images/fb_icon_325x325.png";

    var ticktoklink =
      "https://purepng.com/public/uploads/large/tik-tok-logo-6fh.png";

    var Alinks = [
      instalink,
      twitterlink,
      snapchatlink,
      linkdinlink,
      facebooklink,
      ticktoklink,
    ];
    var i = 1;
    var logo = document.getElementById("logo");
    logo.src = Alinks[0];

    var timer = setInterval(() => {
      i++;
      if (i == 6) {
        i = 0;
      }
      logo.src = Alinks[i];
    }, 1000);

    //
    return () => {
      clearInterval(timer);
    };
  });

  return <img className={classes.rotateScaleUp} id="logo"></img>;
}

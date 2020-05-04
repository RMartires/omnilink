import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

var url;
function Login(props) {
  const clickInstagram = () => {
    var clientid, redirect_uri;
    if (process.env.NODE_ENV == "production") {
      clientid = process.env.REACT_APP_IN_CLIENT_ID;
      redirect_uri = process.env.REACT_APP_IN_REDIRECT_URI;
    } else {
      clientid = window._env.REACT_APP_IN_CLIENT_ID;
      redirect_uri = window._env.REACT_APP_IN_REDIRECT_URI;
    }
    url =
      "https://api.instagram.com/oauth/authorize" +
      `?client_id=${clientid}` +
      `&redirect_uri=${redirect_uri}` +
      "&scope=user_profile,user_media" +
      "&response_type=code";

    window.location.href = url;
  };

  const colorbuttons = () => {
    if (props.color) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            clickInstagram();
          }}
          style={{ backgroundColor: "black", color: "white" }}
        >
          {props.text}
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            clickInstagram();
          }}
        >
          {props.text}
        </Button>
      );
    }
  };

  return <Grid item>{colorbuttons()}</Grid>;
}

export default Login;

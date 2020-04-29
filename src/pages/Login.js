import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

var url;
class Login extends Component {
  state = {
    redirect: false,
    token: undefined,
  };

  componentDidMount() {
    var code = window.location.href.split("code=")[1];
    if (code && !this.state.redirect) {
      var formdata = new FormData();
      var t;
      if (process.env.NODE_ENV == "production") {
        formdata.set("client_id", process.env.REACT_APP_IN_CLIENT_ID);
        formdata.set("client_secret", process.env.REACT_APP_IN_CLIENT_SECRET);
        formdata.set("grant_type", "authorization_code");
        formdata.set("redirect_uri", process.env.REACT_APP_IN_REDIRECT_URI);
        t = code.split("#_")[0];
        formdata.set("code", t);
      } else {
        formdata.set("client_id", window._env.REACT_APP_IN_CLIENT_ID);
        formdata.set("client_secret", window._env.REACT_APP_IN_CLIENT_SECRET);
        formdata.set("grant_type", "authorization_code");
        formdata.set("redirect_uri", window._env.REACT_APP_IN_REDIRECT_URI);
        t = code.split("#_")[0];
        formdata.set("code", t);
      }

      axios({
        url: "https://api.instagram.com/oauth/access_token",
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
        .then((res) => {
          if (res.status == "200") {
            return res.data;
          }
        })
        .then((data) => {
          var access_token = data.access_token;
          var user_id = data.user_id;
          axios({
            url: `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`,
            method: "GET",
            mode: "cors",
          })
            .then((res) => {
              var username = res.data.username;
              return username;
            })
            .then((username) => {
              fetch(
                "https://hopeful-mclean-f06bf3.netlify.app/.netlify/functions/insta_auth/" +
                  username
              )
                .then((res) => {
                  return res.json();
                })
                .then((resdata) => {
                  this.props.setToken(resdata.token);
                });
            });
        });
    }
  }

  clickInstagram = () => {
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

  render() {
    return (
      <Grid
        container
        direction="column"
        spacing="3"
        alignItems="center"
        style={{
          margin: "0%",
          height: "100vh",
          width: "100vw",
          justifyContent: "space-around",
        }}
      >
        <Grid item style={{ width: "60%" }}>
          <Typography variant="h1" style={{ textAlign: "center" }}>
            🙌
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.clickInstagram.bind(this)}
            style={{ width: "100%", height: "8vh", left: "5%" }}
          >
            instagram login
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Login;

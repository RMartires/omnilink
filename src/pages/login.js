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
      formdata.set("client_id", "640026383445330");
      formdata.set("client_secret", "3e17b845507a5eff7f2bc6d9c6cb1942");
      formdata.set("grant_type", "authorization_code");
      formdata.set("redirect_uri", "https://localhost:3000/login");
      var t = code.split("#_")[0];
      formdata.set("code", t);

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
              fetch("http://localhost:5000/auth/" + username)
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
    url =
      "https://api.instagram.com/oauth/authorize" +
      "?client_id=640026383445330" +
      "&redirect_uri=https://localhost:3000/login" +
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

var url;
function Login(props) {
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    var code = window.location.href.split("code=")[1];
    if (code) {
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
              var api;
              var link;
              if (process.env.NODE_ENV == "production") {
                // apikey.set("apikey", process.env.REACT_APP_ATapikey);
                // apikey.set("apibase", process.env.REACT_APP_ATbase);
                api = {
                  apikey: process.env.REACT_APP_ATapikey,
                  apibase: process.env.REACT_APP_ATbase,
                };
                link =
                  "https://hopeful-mclean-f06bf3.netlify.app/.netlify/functions/insta_auth/";
              } else {
                // apikey.set("apikey", window._env.REACT_APP_ATapikey);
                // apikey.set("apibase", window._env.REACT_APP_ATbase);
                api = {
                  apikey: window._env.REACT_APP_ATapikey,
                  apibase: window._env.REACT_APP_ATbase,
                };
                link = "http://localhost:9000/insta_auth/";
              }

              axios({
                url: link + username,
                params: api,
                mode: "cors",
              })
                .then((res) => {
                  console.log(res);
                  return res.data;
                })
                .then((resdata) => {
                  props.setToken(resdata);
                });
            });
        });
    }
  });

  return <LoadingScreen />;
}

export default Login;

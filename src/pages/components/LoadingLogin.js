import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingScreen from "./LoadingScreen";
import Page404 from "./Page404";
import SetupScreen2 from "./SetupScreen2";

var url;

function Login(props) {
  const [noprofilepics, setNoprofilepics] = useState([]);
  const [USERNAME, setUSERNAME] = useState();
  const [pageerr, setPageerr] = useState(false);
  var profilepics = [];
  var totnumber,
    numberofres = 0;

  //

  //

  useEffect(() => {
    //
    //
    console.log("loadinglogin once");
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
          //console.log(res);
          if (res.status == "200") {
            return res.data;
          }
        })
        .catch((err) => {
          console.log(err);
          setPageerr(true);
        })
        .then((data) => {
          var access_token = data.access_token;
          var user_id = data.user_id;
          //getimages
          axios({
            url: `https://graph.instagram.com/me/media?access_token=${access_token}`,
            method: "GET",
            mode: "cors",
          })
            .then((res) => {
              var data = res.data.data;
              //console.log(data);
              totnumber = data.length;
              data.map((media) => {
                axios({
                  url: `https://graph.instagram.com/${media.id}?fields=id,media_type,media_url&access_token=${access_token}`,
                  method: "GET",
                  mode: "cors",
                }).then((res) => {
                  numberofres = numberofres + 1;
                  if (res.data.media_type == "IMAGE") {
                    profilepics.push(res.data.media_url);
                  }
                  if (numberofres === totnumber) {
                    setNoprofilepics(profilepics);
                    console.log(numberofres);
                  }
                });
              });

              //
              //get username
              axios({
                url: `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`,
                method: "GET",
                mode: "cors",
              })
                .then((res) => {
                  var username = res.data.username;
                  setUSERNAME(username);
                })
                .catch((err) => {
                  console.log(err);
                });
              //
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      //end normal insta code
    }
  }, []);

  return (
    <div>
      {noprofilepics.length > 0 ? (
        <SetupScreen2
          images={noprofilepics}
          username={USERNAME}
          setToken={props.setToken}
        />
      ) : pageerr ? (
        <Page404 />
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import { Redirect, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingScreen from "./LoadingScreen";
import Page404 from "./Page404";
import SetupScreen2 from "./SetupScreen2";

import { obtainOauthAccessToken } from "react-twitter-login/dist/services/oauth1";
import { sendData } from "../utills/LoginUtills";
var url;

function Login(props) {
  const [noprofilepics, setNoprofilepics] = useState([]);
  const [USERNAME, setUSERNAME] = useState(undefined);
  const [pageerr, setPageerr] = useState(false);
  var profilepics = [];
  var totnumber,
    numberofres = 0;

  //
  var query = new URLSearchParams(useLocation().search);

  var { type } = useParams();

  var clientid, redirect_uri, TCoustomerKey, TCoustomerSecret;
  if (process.env.NODE_ENV == "production") {
    clientid = process.env.REACT_APP_IN_CLIENT_ID;
    redirect_uri = process.env.REACT_APP_IN_REDIRECT_URI;
    TCoustomerKey = process.env.REACT_APP_T_COUSTOMER_KEY;
    TCoustomerSecret = process.env.REACT_APP_T_COUSTOMER_SECRET;
  } else {
    clientid = window._env.REACT_APP_IN_CLIENT_ID;
    redirect_uri = window._env.REACT_APP_IN_REDIRECT_URI;
    TCoustomerKey = process.env.REACT_APP_T_COUSTOMER_KEY;
    TCoustomerSecret = process.env.REACT_APP_T_COUSTOMER_SECRET;
  }
  //

  function instagramProcedure() {
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
  }

  async function twitterProcedure() {
    try {
      var oauth_token = query.get("oauth_token");
      var oauth_verifier = query.get("oauth_verifier");

      const accessTokenData = await obtainOauthAccessToken({
        apiUrl: "https://api.twitter.com/oauth/access_token",
        TCoustomerKey,
        TCoustomerSecret,
        oauthToken: oauth_token,
        oauthVerifier: oauth_verifier,
        method: "POST",
      });

      console.log(accessTokenData);

      var params = {
        TCoustomerKey: TCoustomerKey,
        TCoustomerSecret: TCoustomerSecret,
        access_token: accessTokenData.oauth_token,
        access_token_secret: accessTokenData.oauth_token_secret,
      };

      var url;
      if (process.env.NODE_ENV == "production") {
        url = process.env.REACT_APP_TwitterUrl;
      } else {
        url = window._env.REACT_APP_TwitterUrl;
      }
      var res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
      });
      var resJson = await res.json();
      var token = await sendData(resJson.username, resJson.profile_image_url);
      props.setToken(token);
    } catch (err) {
      console.log(err);
      setPageerr(true);
    }
  }

  useEffect(() => {
    if (type == "t") {
      twitterProcedure();
      console.log("only Once");
    } else {
      instagramProcedure();
    }
  });

  const nextStep = () => {
    if (type === "t") {
      return <div>{pageerr ? <Page404 /> : <LoadingScreen />}</div>;
    } else {
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
  };

  return <div>{nextStep()}</div>;
}

export default Login;

// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { FaFacebook } from "react-icons/fa";
import FacebookProvider, { Login } from "react-facebook-sdk";
import FBlogo from "../../assets/Facebook_logo.png";
var Airtable = require("airtable");

//

var base;
if (process.env.NODE_ENV == "production") {
  base = new Airtable({ apiKey: process.env.REACT_APP_ATapikey }).base(
    process.env.REACT_APP_ATbase
  );
} else {
  base = new Airtable({ apiKey: window._env.REACT_APP_ATapikey }).base(
    window._env.REACT_APP_ATbase
  );
}

var api;
var link;
var FBid, FBver, FBapp;
if (process.env.NODE_ENV == "production") {
  // apikey.set("apikey", process.env.REACT_APP_ATapikey);
  // apikey.set("apibase", process.env.REACT_APP_ATbase);
  api = {
    apikey: process.env.REACT_APP_ATapikey,
    apibase: process.env.REACT_APP_ATbase,
  };
  link = "https://linnk.ninja/.netlify/functions/get/";

  FBid = process.env.REACT_APP_FBid;
  FBver = process.env.REACT_APP_FBver;
} else {
  // apikey.set("apikey", window._env.REACT_APP_ATapikey);
  // apikey.set("apibase", window._env.REACT_APP_ATbase);
  api = {
    apikey: window._env.REACT_APP_ATapikey,
    apibase: window._env.REACT_APP_ATbase,
  };
  //link = "https://omnilink.herokuapp.com/auth/";
  link = "http://localhost:9000/get/";

  FBid = window._env.REACT_APP_FBid;
  FBver = window._env.REACT_APP_FBver;
}

export default function (props) {
  var [redirect, setRedirect] = useState(false);
  var [Dredirect, setDredirect] = useState(false);
  var [buttontext, setButtontext] = useState("login with Facebook");
  var buttonstyle;

  const setupredirect = () => {
    if (redirect) {
      return <Redirect to="/setup" />;
    } else if (Dredirect) {
      return <Redirect to={`/👉${props.token.username}`} />;
    }
  };

  const loginOnClick = (data) => {
    if (props.token) {
      setDredirect(true);
    } else {
      var userID = data.profile.id;
      var email = data.profile.email;
      var tempdata = email + "II" + userID;
      //check if UID exists
      base("users")
        .select({
          view: "Grid view",
          filterByFormula: `({userID} = ${userID})`,
        })
        .eachPage(
          (records, fetchNextPage) => {
            if (records.length === 1) {
              //user exists
              var username = records[0].get("username");
              axios({
                url:
                  link +
                  `?username=${username}&key=${api.apikey}&base=${api.apibase}`,
                method: "GET",
                mode: "no-cors",
                //
              })
                .then((res) => {
                  console.log(res);
                  return res.data;
                })
                .then((resdata) => {
                  props.setToken(resdata.token);
                });
            } else {
              //user does not exist
              Cookies.set("tempdata", tempdata);
              setRedirect(true);
            }
            fetchNextPage();
          },
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      //end airtable
    } //end else
  };

  useEffect(() => {
    if (props.token) {
      setButtontext(props.token.username);
    }
  });

  return (
    <FacebookProvider appId={FBid}>
      <Login
        scope="email"
        onResponse={(data) => {
          loginOnClick(data);
        }}
        onError={(err) => {
          console.log(err);
        }}
      >
        {props.text === "login" ? (
          <Button
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              backgroundColor: "#0000",
              borderColor: "#0000",
              color: "black",
            }}
          >
            {setupredirect()}
            login
          </Button>
        ) : (
          <div style={{ marginTop: "20px" }}>
            {setupredirect()}
            <Button
              style={
                props.text
                  ? {
                      fontSize: "1em",
                      width: "fit-content",
                      margin: "auto",
                      color: "white",
                      backgroundColor: "#1977F3",
                      borderColor: "#1977F3",
                      borderRadius: "50px",
                    }
                  : props.token
                  ? {
                      fontSize: "1.3em",
                      width: "fit-content",
                      margin: "auto",
                      color: "white",
                      backgroundColor: "#1977F3",
                      borderColor: "#1977F3",
                      borderRadius: "50px",
                    }
                  : {
                      fontSize: "1.3em",
                      width: "fit-content",
                      margin: "auto",
                      color: "white",
                      backgroundColor: "#1977F3",
                      borderColor: "#1977F3",
                      borderRadius: "50px",
                    }
              }
            >
              <div style={{ display: "flex" }}>
                <img
                  src={FBlogo}
                  style={{
                    marginBottom: "auto",
                    marginRight: "5px",
                    width: "22px",
                  }}
                />
                <p style={{ margin: "auto", fontSize: "1.1rem" }}>
                  {props.text ? props.text : buttontext}
                </p>
              </div>
            </Button>
          </div>
        )}
        {/* <span>Login via Facebook</span> */}
      </Login>
    </FacebookProvider>
  );
}

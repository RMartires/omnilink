import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { FaFacebook } from "react-icons/fa";
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
if (process.env.NODE_ENV == "production") {
  // apikey.set("apikey", process.env.REACT_APP_ATapikey);
  // apikey.set("apibase", process.env.REACT_APP_ATbase);
  api = {
    apikey: process.env.REACT_APP_ATapikey,
    apibase: process.env.REACT_APP_ATbase,
  };
  link = "https://omnilink.herokuapp.com/auth/";
} else {
  // apikey.set("apikey", window._env.REACT_APP_ATapikey);
  // apikey.set("apibase", window._env.REACT_APP_ATbase);
  api = {
    apikey: window._env.REACT_APP_ATapikey,
    apibase: window._env.REACT_APP_ATbase,
  };
  link = "https://omnilink.herokuapp.com/auth/";
  //link = "http://localhost:5000/auth/";
}

export default function (props) {
  var [redirect, setRedirect] = useState(false);
  var [Dredirect, setDredirect] = useState(false);
  var [buttontext, setButtontext] = useState("login with Facebook");
  var email, userid;
  var buttonstyle;

  const setupredirect = () => {
    if (redirect) {
      return <Redirect to="/setup" email={email} userID={userid} />;
    } else if (Dredirect) {
      return <Redirect to={`/👉${props.token.username}`} />;
    }
  };

  useEffect(() => {
    if (props.token) {
      setButtontext("Continue as " + props.token.username);
    }
  });

  return (
    <div>
      {setupredirect()}
      <a
        class="btn btn-block btn-social btn-facebook"
        variant={props.text ? "dark" : "primary"}
        style={
          props.text
            ? {
                fontSize: "1em",
                width: "fit-content",
                margin: "auto",
                color: "white",
              }
            : props.token
            ? {
                fontSize: "1.3em",
                width: "fit-content",
                margin: "auto",
                color: "white",
                fontFamily: "serif",
              }
            : {
                fontSize: "1.3em",
                fontFamily: "serif",
                width: "fit-content",
                margin: "auto",
                color: "white",
              }
        }
        onClick={
          () => {
            if (props.token) {
              setDredirect(true);
            } else {
              window.FB.login(
                (response) => {
                  //console.log(response);
                  if (response.status === "connected") {
                    window.FB.api(
                      "/me/",
                      { fields: "name, email" },
                      (response) => {
                        console.log(response);
                        email = response.email;
                        userid = response.id;
                        //check if UID exists
                        base("users")
                          .select({
                            view: "Grid view",
                            filterByFormula: `({userID} = ${response.id})`,
                          })
                          .eachPage(
                            (records, fetchNextPage) => {
                              if (records.length === 1) {
                                //user exists
                                var username = records[0].get("username");
                                axios({
                                  url: link + username,
                                  method: "GET",
                                  mode: "no-cors",
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
                      }
                    );
                  }
                },
                { scope: "email" }
              );
            } //end else
          } //end onClick
        }
      >
        <FaFacebook style={{ margin: "auto" }} />
        {props.text ? props.text : buttontext}
      </a>
    </div>
  );
}

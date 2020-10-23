import React, { useState, useEffect } from "react";
//
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ImagePicker from "react-image-picker";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingScreen from "./LoadingScreen";
import "react-image-picker/dist/index.css";
var email, userid;

export default function SetupScreen2(props) {
  const [finish, setFinish] = useState("disabled");
  const [img, setImg] = useState(undefined);
  const [errmsg, setErrmsg] = useState("");
  const [loading, setLoading] = useState(false);

  //
  function senddata(username, email, userID, img) {
    console.log(username + " " + email + " " + userID);
    var api;
    var link;
    if (process.env.NODE_ENV === "production") {
      // apikey.set("apikey", process.env.REACT_APP_ATapikey);
      // apikey.set("apibase", process.env.REACT_APP_ATbase);
      api = {
        apikey: process.env.REACT_APP_ATapikey,
        apibase: process.env.REACT_APP_ATbase,
      };
      link = "https://linnk.ninja/.netlify/functions/post/";
    } else {
      // apikey.set("apikey", window._env.REACT_APP_ATapikey);
      // apikey.set("apibase", window._env.REACT_APP_ATbase);
      api = {
        apikey: window._env.REACT_APP_ATapikey,
        apibase: window._env.REACT_APP_ATbase,
      };
      link = "http://localhost:9000/post/";
    }

    var tempimg = img.split("&").join("**");

    axios({
      url:
        link +
        `?username=${username}&email=${email}&userID=${userID}&key=${api.apikey}&base=${api.apibase}&img=${tempimg}`,
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((resdata) => {
        props.setToken(resdata.token);
      });
  }

  useEffect(() => {
    var tempdata = Cookies.get("tempdata");
    if (tempdata) {
      //console.log(tempdata);
      email = tempdata.split("II")[0];
      userid = tempdata.split("II")[1];
    }
    //console.log(email + " " + userid);
    Cookies.remove("tempdata");
  }, []);
  //

  return (
    <div style={{ height: "100vh" }}>
      {loading ? (
        <LoadingScreen onlyspinner={true} />
      ) : (
        <div>
          <Row
            className="justify-content-center"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              padding: "20px",
              paddingBottom: "0",
            }}
          >
            <h4 style={{ fontFamily: "Risque,cursive" }}>
              Select linnkninja profile picture
            </h4>
            <div
              style={{
                height: "75vh",
                overflow: "auto",
                backgroundColor: "#f1da96",
              }}
            >
              <ImagePicker
                images={props.images.map((image, i) => ({
                  src: image,
                  value: i,
                }))}
                onPick={(sel) => {
                  setFinish("");
                  setImg(sel.src);
                  setErrmsg("");
                }}
              />
            </div>
          </Row>
          <Row>
            <Col style={{ textAlign: "center", fontFamily: "Roboto" }}>
              <h4>
                <div>{props.username + "  "}</div>
              </h4>
              <h6 style={{ color: "red" }}>{errmsg}</h6>
              <Button
                variant="success"
                className={finish}
                onClick={() => {
                  if (img) {
                    setLoading(true);
                    senddata(props.username, email, userid, img);
                  } else {
                    setErrmsg("select a profile picture");
                  }
                }}
              >
                Finish setup
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

import axios from "axios";
import Cookies from "js-cookie";

export async function sendData(username, img) {
  var email, userID;
  var tempdata = Cookies.get("tempdata");
  if (tempdata) {
    email = tempdata.split("II")[0];
    userID = tempdata.split("II")[1];
  } else {
    throw new Error("No Cookie found!");
  }
  Cookies.remove("tempdata");
  return new Promise((res, rej) => {
    console.log(username + " " + email + " " + userID);
    var api;
    var link;
    if (process.env.NODE_ENV == "production") {
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
        res(resdata.token);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

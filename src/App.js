import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingLogin from "./pages/components/LoadingLogin";
import ToHome from "./pages/Home";
import Main from "./pages/Main";
import About from "./pages/About";
import Setup from "./pages/Setup";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import LoadingScreen from "./pages/components/LoadingScreen";
// import  dotenv from 'dotenv';
//sdotenv.config();
require("dotenv").config();

var theme = {
  RFS: {
    fontSize: "calc(1em + 1vw)",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);
  }

  state = {
    token: undefined,
    color: {
      dominant: "#FFDC80",
      accent1: "#FFDC80", //#FCAF45
      accent2: "#FCAF45", //#F77737
    },
    FBloaded: false,
  };

  componentDidMount() {
    if (!this.state.token) {
      var decodedtoken;
      var token = Cookies.get("jwttoken");
      if (token) {
        this.setToken(token, true);
      }
    }
    //FB SDK
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FBid,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: process.env.REACT_APP_FBver, // use version 2.1
      });

      // window.FB.getLoginStatus(function (response) {
      //   console.log(response);
      // });
      this.setState({ FBloaded: true });
    };

    console.log("Loading fb api");
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  setToken = (token, fromcookie) => {
    var decodedtoken;
    Cookies.set("jwttoken", token);
    try {
      decodedtoken = jwt.verify(token, "heyphil123");
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      console.log(decodedtoken);
      if (fromcookie) {
        this.setState({
          token: decodedtoken,
        });
      } else {
        this.setState({
          token: decodedtoken,
          redirect: true,
        });
      }
    } else {
      this.setState({
        token: undefined,
        redirect: false,
      });
    }
  };

  render() {
    const tohome = () => {
      if (this.state.token) {
        return (
          <ToHome
            token={this.state.token}
            color={this.state.color}
            setToken={this.setToken}
          />
        );
      } else {
        return <ToHome color={this.state.color} />;
      }
    };

    const loadinglogin = () => {
      return <LoadingLogin setToken={this.setToken} color={this.state.color} />;
    };

    const redirect = () => {
      if (this.state.redirect) {
        return <Redirect to={`/👉${this.state.token.username}`} />;
      }
    };

    return (
      <div className="App" id="app">
        {this.state.FBloaded ? (
          <ThemeProvider theme={{ color: "mediumseagreen" }}>
            {redirect()}
            <Switch>
              <Route
                path="/privacy"
                component={() => {
                  return <PrivacyPolicy />;
                }}
              />
              <Route
                path="/setup"
                component={() => {
                  return <Setup />;
                }}
              />
              <Route
                path="/About"
                component={() => {
                  return <About />;
                }}
              />
              <Route path="/login" component={loadinglogin} />
              <Route path="/:username" component={tohome} />
              <Route
                path=""
                component={() => {
                  return (
                    <Main setToken={this.setToken} token={this.state.token} />
                  );
                }}
              />
            </Switch>
          </ThemeProvider>
        ) : (
          <LoadingScreen onlyspinner={true} />
        )}
      </div>
    );
  }
}

export default App;

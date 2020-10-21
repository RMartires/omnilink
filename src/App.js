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
    FBloaded: true,
  };

  componentDidMount() {
    if (!this.state.token) {
      var decodedtoken;
      var token = Cookies.get("jwttoken");
      if (token) {
        this.setToken(token, true);
      }
    }
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
            <Route path="/login/:type" component={loadinglogin} />
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
      </div>
    );
  }
}

export default App;

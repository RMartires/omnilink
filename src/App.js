import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoadingLogin from "./pages/components/LoadingLogin";
import ToHome from "./pages/Home";
import Main from "./pages/Main";
import About from "./pages/About";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
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
  };

  componentDidMount() {
    if (!this.state.token) {
      var decodedtoken;
      var token = Cookies.get("jwttoken");
      if (token) {
        this.setToken(token);
      }
    }
  }

  setToken = (token) => {
    var decodedtoken;
    Cookies.set("jwttoken", token);
    try {
      decodedtoken = jwt.verify(token, "heyphil123");
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      console.log(decodedtoken);
      this.setState({
        token: decodedtoken,
      });
    } else {
      this.setState({
        token: undefined,
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

    const redirecthome = () => {
      var path = window.location.href.split("/ho")[1];
      if (this.state.token && !(path == "me")) {
        console.log(this.state.token);
        return <Redirect to={`/👉${this.state.token.username}`} />;
      }
    };

    return (
      <div className="App" id="app">
        <ThemeProvider theme={{ color: "mediumseagreen" }}>
          {redirecthome()}
          <Switch>
            <Route
              path="/home"
              component={() => {
                return <Main home={true} />;
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
                return <Main />;
              }}
            />
          </Switch>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;

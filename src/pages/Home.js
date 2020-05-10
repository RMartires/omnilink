import React, { Component } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Link from "./components/Links";
import Grid from "@material-ui/core/Grid";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LoadingScreen from "./components/LoadingScreen";
import Page404 from "./components/Page404";
import Addlinkbutton from "./components/Addlinkbutton";

//
import Container from "react-bootstrap/Container";

var Airtable = require("airtable");

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

var theme = createMuiTheme();
theme = responsiveFontSizes(theme);

var username;
class Home extends Component {
  state = {
    token: undefined,
    links: [],
    linkslu: [],
    titlelu: [],
    username: undefined,
    profile_picture: undefined,
    isloading: true,
    notloading: false,
  };

  componentDidMount() {
    username = this.props.username;
    this.refreshlinks();
  }

  refreshlinks() {
    if (username) {
      var links, linkslu, titlelu, profile_picture;
      base("users")
        .select({
          view: "Grid view",
          filterByFormula: `{username} = '${username}'`,
        })
        .eachPage(
          (records, fetchNextPage) => {
            console.log(records);
            if (records[0]) {
              links = records[0].get("links");
              linkslu = records[0].get("linkslu");
              titlelu = records[0].get("titlelu");
              profile_picture = records[0].get("profile_picture");
              console.log(linkslu);
              fetchNextPage();
            } else {
              this.setState({ notloading: true, isloading: false });
            }
          },
          (err) => {
            if (err) {
              console.error("not found");
              this.setState({ notloading: true, isloading: false });
              return;
            } else {
              this.setState({
                links: links,
                linkslu: linkslu,
                titlelu: titlelu,
                profile_picture: profile_picture,
                username: username,
                isloading: false,
              });
            }
          }
        );
      console.log("refreshed");
    }
  }

  render() {
    const userprofile = () => {
      if (this.state.username) {
        return (
          <UserProfile
            user_name={this.state.username}
            profile_picture={this.state.profile_picture}
            color={this.props.color}
            setToken={this.props.setToken}
            token={this.props.token}
          />
        );
      }
    };

    const alllink = () => {
      if (this.state.links) {
        return this.state.links.map((linkid, index) => {
          return (
            <Link
              color={this.props.color}
              recordid={linkid}
              title={this.state.titlelu[index]}
              link={this.state.linkslu[index]}
              token={this.props.token}
              refreshlinks={this.refreshlinks.bind(this)}
            />
          );
        });
      }
    };

    const addbutton = () => {
      if (this.props.token) {
        return (
          <Addlinkbutton
            color={this.props.color}
            token={this.props.token}
            refreshlinks={this.refreshlinks.bind(this)}
          />
        );
      }
    };

    const footer = () => {
      if (!this.props.token) {
        return (
          <Grid item style={{ padding: "0px", marginTop: "10px" }}>
            <ThemeProvider theme={theme}>
              <Typography
                style={{
                  width: "100vw",
                  height: "5vh",
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  paddingTop: "10px",
                }}
                variant="body2"
                theme={theme}
              >
                <a href="/" target="_blank" style={{ color: "white" }}>
                  Creat your own Omnilink page
                </a>
              </Typography>
            </ThemeProvider>
          </Grid>
        );
      }
    };

    const fullscreen = () => {
      if (this.state.isloading) {
        return <LoadingScreen />;
      } else if (this.state.notloading) {
        return <Page404 />;
      } else {
        return (
          <div>
            {userprofile()}
            <Container fluid>
              {alllink()}
              {addbutton()}
            </Container>
            {footer()}
          </div>
        );
      }
    };

    return <div>{fullscreen()}</div>;
  }
}

function ToHome(props) {
  var { username } = useParams();
  console.log(username);
  username = username.split("👉")[1];
  if (props.token) {
    return (
      <Home
        username={username}
        token={props.token}
        color={props.color}
        setToken={props.setToken}
      />
    );
  } else {
    return <Home username={username} color={props.color} />;
  }
}

export default ToHome;

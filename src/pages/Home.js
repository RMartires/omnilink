import React, { Component } from "react";
import UserProfile from "./components/UserProfile";
import Link from "./components/Links";
import Grid from "@material-ui/core/Grid";
import LoadingScreen from "./components/LoadingScreen";

import Addlinkbutton from "./components/Addlinkbutton";
var Airtable = require("airtable");
var base = new Airtable({ apiKey: "key6g32DRULc2ELR4" }).base(
  "app0XNGZWSAZxUY6M"
);

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
  };

  componentDidMount() {
    username = window.location.href.split("0/")[1];
    console.log(username);
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
            }
          },
          (err) => {
            if (err) {
              console.error(err);
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
          />
        );
      }
    };

    const alllink = () => {
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

    const fullscreen = () => {
      if (this.state.isloading) {
        return <LoadingScreen />;
      } else {
        return (
          <div>
            {userprofile()}
            <Grid
              container
              direction="column"
              justify="space-around"
              spacing="3"
              alignItems="center"
            >
              {alllink()}
              {addbutton()}
            </Grid>
          </div>
        );
      }
    };

    return <div>{fullscreen()}</div>;
  }
}

export default Home;

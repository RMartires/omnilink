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

//
import Container from "react-bootstrap/Container";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FloatingButton from "./components/FloatingButton";
import Toast from "react-bootstrap/Toast";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ThemeSelector from "./components/ThemeSelector";

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

var username;
class Home extends Component {
  state = {
    token: undefined,
    links: {},
    movedlinks: undefined,
    username: undefined,
    profile_picture: undefined,
    isloading: true,
    notloading: false,
    showtoast: false,
    showselecttheme: false,
  };

  componentDidMount() {
    username = this.props.username;
    this.refreshlinks();
  }

  refreshlinks(changeMade) {
    if (username) {
      var links = [],
        profile_picture,
        userid,
        usertheme;
      base("users")
        .select({
          view: "Grid view",
          filterByFormula: `{username} = '${username}'`,
        })
        .eachPage(
          (records, fetchNextPage) => {
            console.log(records);
            if (records[0]) {
              profile_picture = records[0].get("profile_picture");
              usertheme = records[0].get("theme");
              userid = records[0].id;
              //console.log(linkslu);
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
              //get  links
              base("links")
                .select({
                  view: "Grid view",
                  filterByFormula: `{users} = '${username}'`,
                  sort: [{ field: "order" }],
                })
                .eachPage(
                  (records, fetchNextPage) => {
                    records.forEach(function (record) {
                      var temprecord = {};
                      temprecord = record.fields;
                      temprecord.id = record.id;
                      temprecord.link = record.fields.links;
                      links.push(temprecord);
                    });

                    fetchNextPage();
                  },
                  (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    console.log(links);
                    //start sestate
                    if (changeMade) {
                      this.setState({
                        links: links,
                        profile_picture: profile_picture,
                        username: username,
                        isloading: false,
                        showtoast: true,
                      });
                    } else {
                      this.setState({
                        links: links,
                        profile_picture: profile_picture,
                        username: username,
                        isloading: false,
                        userid: userid,
                        usertheme: usertheme,
                      });
                    }
                    //end setstate
                  }
                );
              //end of get links
            }
          }
        );
      console.log("refreshed");
    }
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    var items = this.reorder(
      this.state.links,
      result.source.index,
      result.destination.index
    );

    items = items.map((item, index) => {
      item.order = index + 1;
      return item;
    });

    this.setState({
      links: items,
    });

    console.log(items);
    //postitems
    var itemsToUpdate = [];
    items.forEach((item, index) => {
      var tempitem = {};
      tempitem.id = item.id;
      tempitem.fields = { order: item.order };
      itemsToUpdate.push(tempitem);
    });

    base("links").update(itemsToUpdate, (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      this.setState({ showtoast: true });
    });
    //console.log(itemsToUpdate);
    //this.postReorder(items);
  }

  setShowSelectTheme(x) {
    //console.log(x + "sss");
    this.setState({ showselecttheme: x });
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
            setShowTheme={this.setShowSelectTheme.bind(this)}
            theme={this.state.usertheme}
          />
        );
      }
    };

    const alllink = () => {
      if (this.state.links) {
        return this.state.links.map((link, index) => {
          return (
            //
            <Draggable key={link.id} draggableId={link.id} index={index}>
              {(provided, snapshot) => {
                return (
                  <Link
                    provided={provided}
                    recordid={link.id}
                    title={link.title}
                    link={link.link}
                    token={this.props.token}
                    refreshlinks={this.refreshlinks.bind(this)}
                    theme={this.state.usertheme}
                  />
                );
              }}
            </Draggable>
            //
          );
        });
      }
    };

    const floatingbutton = () => {
      if (this.props.token) {
        return (
          <FloatingButton
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
            <ThemeProvider>
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

    const themeselector = () => {
      return (
        <ThemeSelector
          ShowSelectTheme={this.state.showselecttheme}
          setShowTheme={this.setShowSelectTheme.bind(this)}
          setToast={(x) => {
            this.setState({ showtoast: true, usertheme: x });
          }}
          userid={this.state.userid}
          theme={this.state.usertheme}
        />
      );
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
              <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable droppableId="droppable">
                  {(provided) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {alllink()}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </DragDropContext>
              {floatingbutton()}
              {themeselector()}
              <Row className="justify-content-center">
                <Col style={{ position: "fixed", bottom: "2vh" }} xs="auto">
                  <Toast
                    onClose={() => {
                      this.setState({ showtoast: false });
                    }}
                    show={this.state.showtoast}
                    delay={3000}
                    autohide
                  >
                    <Toast.Body>Changes Saved</Toast.Body>
                  </Toast>
                </Col>
              </Row>
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

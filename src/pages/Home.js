import React, { Component } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Link from "./components/Links";
import Grid from "@material-ui/core/Grid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

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
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import ThemeSelector from "./components/ThemeSelector";

import Validate from "react-validate-form";
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
    showcongrats: false,
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
        usertheme,
        firsttime;
      base("users")
        .select({
          view: "Grid view",
          filterByFormula: `{username} = '${username}'`,
        })
        .eachPage(
          (records, fetchNextPage) => {
            console.log(records);
            if (records[0]) {
              profile_picture = records[0].get("profile_picture")[0].url;
              usertheme = records[0].get("theme");
              userid = records[0].id;
              firsttime = records[0].get("firsttime");
              //console.log(profile_picture);
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
                        firsttime: firsttime,
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
          <Row>
            <Col xs={12} style={{ padding: "0px" }}>
              <p
                style={{
                  height: "5vh",
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                <a href="/" target="_blank" style={{ color: "white" }}>
                  Creat your own Omnilink page
                </a>
              </p>
            </Col>
          </Row>
        );
      }
    };

    const congratsmodel = () => {
      if (this.state.firsttime === 1) {
        this.setState({ showcongrats: true, firsttime: 0 });
        base("users").update(
          [
            {
              id: this.state.userid,
              fields: {
                firsttime: 0,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
          }
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
          <Container>
            {congratsmodel()}
            <Modal
              show={this.state.showcongrats}
              onHide={() => {
                this.setState({ showcongrats: false, showaddlink: true });
              }}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Congrats🎉🎊 on joining Omnilink</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Wanna up your social media game, we got you covered subscribe
                  ✔ to our monthly newsletter🤗
                  <Validate validations={{ email: ["email"] }}>
                    {({ validate, errorMessages, allValid }) => (
                      <div>
                        <InputGroup
                          className="mb-3"
                          style={{ marginTop: "20px" }}
                        >
                          <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                              // console.log(errorMessages);
                              this.setState({ email: e.target.value });
                              validate(e);
                            }}
                            // onChange={validate}
                            type="email"
                            name="email"
                          />
                          <InputGroup.Append>
                            <Button
                              variant="primary"
                              onClick={(e) => {
                                if (allValid) {
                                  // console.log(allValid);
                                  base("users").update(
                                    [
                                      {
                                        id: this.state.userid,
                                        fields: {
                                          Email: this.state.email,
                                        },
                                      },
                                    ],
                                    (err, records) => {
                                      if (err) {
                                        console.error(err);
                                        return;
                                      }
                                      this.setState({
                                        showcongrats: false,
                                        showaddlink: true,
                                      });
                                    }
                                  );
                                }
                              }}
                            >
                              Submit
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                        <p style={{ color: "red", textAlign: "center" }}>
                          {errorMessages.email ? errorMessages.email[0] : ""}
                        </p>
                      </div>
                    )}
                  </Validate>
                </p>
              </Modal.Body>
            </Modal>
            {userprofile()}
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
            {footer()}
          </Container>
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

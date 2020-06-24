import React, { useState } from "react";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
//import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

import CoustomModal from "./CoustomModal";
//
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import MoreVertIcon from "../../assets/more_vert.svg";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import { FaEllipsisV } from "react-icons/fa";

import cardclasses from "./ThemeSelector2.module.css";

const Link = (props) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const handleclick = (event) => {
    console.log(event);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {/* &#x25bc; */}
    </a>
  ));

  const card = () => {
    // if(props.theme==3||4||6||7||15)
    if (props.token) {
      if (props.token.username === props.username) {
        return (
          <div ref={props.provided.innerRef} {...props.provided.draggableProps}>
            <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Col className={cardclasses.link}>
                <Card
                  className={cardclasses["card" + props.theme]}
                  onClick={() => {
                    /*window.location.href = 'http://www.google.com'*/
                  }}
                >
                  <Row>
                    <Col
                      xs={1}
                      className="align-self-center"
                      {...props.provided.dragHandleProps}
                    >
                      <FaEllipsisV style={{ fontSize: "2em" }} />
                    </Col>
                    <Col>
                      <Card.Body
                        style={{ fontSize: "0.6rem", padding: "1rem" }}
                      >
                        <div style={{ textAlign: "end" }} xs="auto">
                          <Dropdown>
                            <Dropdown.Toggle
                              as={CustomToggle}
                              id="dropdown-custom-components"
                            >
                              <FaEllipsisV
                                className={cardclasses["font" + props.theme]}
                                style={{ fontSize: "1.4em" }}
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                eventKey="1"
                                onClick={(e) => {
                                  setEdit(true);
                                }}
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="2"
                                onClick={(e) => {
                                  setDel(true);
                                }}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Card.Title>{props.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text">
                            {props.link}
                          </Card.Subtitle>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                  <CoustomModal
                    edit={edit}
                    del={del}
                    setEdit={setEdit}
                    setDel={setDel}
                    recordid={props.recordid}
                    title={props.title}
                    link={props.link}
                    token={props.token}
                    refreshlinks={props.refreshlinks}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        );
      } else {
        return (
          <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Col className={cardclasses.link}>
              <Card
                className={cardclasses["card" + props.theme]}
                onClick={() => {
                  window.location.assign(`http://${props.link}`);
                }}
              >
                <Card.Body style={{ textAlign: "center", fontSize: "0.6rem" }}>
                  <Card.Title>{props.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text">
                    {props.link}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      }
    } else {
      return (
        <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Col className={cardclasses.link}>
            <Card
              className={cardclasses["card" + props.theme]}
              onClick={() => {
                window.location.assign(`http://${props.link}`);
              }}
            >
              <Card.Body style={{ textAlign: "center", fontSize: "0.6rem" }}>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text">
                  {props.link}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    }
  };

  return card();
};

export default Link;

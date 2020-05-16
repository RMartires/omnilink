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

import classes from "./Links.module.css";

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
    if (props.token) {
      return (
        <Row
          style={{ marginTop: "10px", marginBottom: "10px", zIndex: "5" }}
          class="sortable"
        >
          <Col className={classes.linkcol}>
            <Card
              className={classes.link}
              onClick={() => {
                /*window.location.href = 'http://www.google.com'*/
              }}
            >
              <Card.Body
                style={{ fontSize: "0.6rem", padding: "1rem" }}
                className={classes.linkbody}
              >
                <div style={{ textAlign: "end" }} xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <Image src={MoreVertIcon} rounded />
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
      );
    } else {
      return (
        <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Col className={classes.linkcol}>
            <Card
              className={classes.link}
              onClick={() => {
                window.location.assign(`http://${props.link}`);
              }}
            >
              <Card.Body
                style={{ textAlign: "center", fontSize: "0.6rem" }}
                className={classes.linkbody}
              >
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

import React, { useState } from "react";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import Modal from "@material-ui/core/Modal";
// import Paper from "@material-ui/core/Paper";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import IconButton from "@material-ui/core/IconButton";
// import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";

//
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

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

function Addlinkbutton(props) {
  const [link, setLink] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [addmodal, setAddmodal] = useState(false);

  const handlechange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "link") {
      setLink(e.target.value);
    }
  };

  const send = (e) => {
    base("links").create(
      [
        {
          fields: {
            links: link,
            users: [props.token.recordid],
            title: title,
          },
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          return;
        } else {
          setAddmodal(false);
          props.refreshlinks();
        }
      }
    );
  };

  return (
    <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
      <Col>
        <Card
          style={{ backgroundColor: "#F77737" }}
          onClick={() => {
            setAddmodal(true);
          }}
        >
          <Card.Body style={{ textAlign: "center", fontSize: "0.6rem" }}>
            <Card.Title>Add link</Card.Title>
          </Card.Body>
        </Card>
        <Modal
          show={addmodal}
          onHide={() => {
            setAddmodal(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="titleEdit">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  onChange={handlechange}
                />
              </Form.Group>
              <Form.Group controlId="linkEdit">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  name="link"
                  placeholder="Enter Link"
                  onChange={handlechange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setAddmodal(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                send(e);
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
}

export default Addlinkbutton;

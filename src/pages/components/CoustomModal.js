import React, { useState } from "react";
//
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

function CoustomModal(props) {
  const [link, setLink] = useState("undefined");
  const [title, setTitle] = useState("undefined");

  const handlechange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "link") {
      setLink(e.target.value);
    }
    console.log(link + " " + title);
  };

  const send = (e) => {
    base("links").update(
      [
        {
          id: props.recordid,
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
          props.setEdit(false);
          props.refreshlinks(true);
        }
      }
    );
  };

  const dele = (e) => {
    base("links").destroy([props.recordid], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Deleted", deletedRecords.length, "records");
      props.setDel(false);
      props.refreshlinks(true);
    });
  };

  var edit = props.edit;
  var del = props.del;

  return (
    <Container fluid>
      <Row>
        <Col>
          <Modal
            show={edit}
            onHide={() => {
              props.setEdit(false);
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
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
                  props.setEdit(false);
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
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {/* del */}
          <Modal
            show={del}
            onHide={() => {
              props.setDel(false);
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Hey 🙌, sure u want to delete this link?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  props.setDel(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  dele(e);
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default CoustomModal;

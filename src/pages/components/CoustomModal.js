import React, { useState, useEffect } from "react";
//
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

function CoustomModal(props) {
  const [link, setLink] = useState("undefined");
  const [title, setTitle] = useState("undefined");

  useEffect(() => {
    setLink(props.link);
    setTitle(props.title);
  }, []);

  const handlechange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "link") {
      setLink(e.target.value);
    }
    // console.log(link + " " + title);
  };

  const send = (allValid) => {
    if (allValid) {
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
    }
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
          <Validate validations={{ email: ["required"] }}>
            {({ validate, errorMessages, allValid }) => (
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
                        onChange={(e) => {
                          handlechange(e);
                          validate(e);
                          // console.log(errorMessages);
                        }}
                        required
                        isInvalid={
                          errorMessages.title
                            ? errorMessages.title.length == 1
                              ? true
                              : false
                            : false
                        }
                        isValid={
                          errorMessages.title
                            ? errorMessages.title.length == 1
                              ? false
                              : true
                            : false
                        }
                        value={title}
                      />
                    </Form.Group>
                    <Form.Group controlId="linkEdit">
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        type="text"
                        name="link"
                        placeholder="Enter Link"
                        onChange={(e) => {
                          handlechange(e);
                          validate(e);
                          // console.log(errorMessages);
                        }}
                        requried
                        isInvalid={
                          errorMessages.link
                            ? errorMessages.link.length == 1
                              ? true
                              : false
                            : false
                        }
                        isValid={
                          errorMessages.link
                            ? errorMessages.link.length == 1
                              ? false
                              : true
                            : false
                        }
                        value={link}
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
                      send(allValid);
                    }}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Validate>
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

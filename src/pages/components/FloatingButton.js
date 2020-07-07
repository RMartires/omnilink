import React, { useState } from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { FaPlus } from "react-icons/fa";

import Modal from "react-bootstrap/Modal";
import BsButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

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

export default function FloatingButton(props) {
  const [link, setLink] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [addmodal, setAddmodal] = useState(false);
  const [validated, setValidated] = useState(false);

  const handlechange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "link") {
      setLink(e.target.value);
    }
  };

  const handleSubmit = (allValid) => {
    if (allValid) {
      console.log(title + "" + link);
      base("users").find(props.token.recordid, function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        var maxorder = record.get("maxorder");
        //got maxorder now create new record yo!
        console.log("f");
        base("links").create(
          [
            {
              fields: {
                links: link,
                users: [props.token.recordid],
                title: title,
                order: maxorder + 1,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            } else {
              setAddmodal(false);
              setTitle(undefined);
              setLink(undefined);
              props.refreshlinks(true);
            }
          }
        );

        //end of record creation
      });
    }
  };

  return (
    <div>
      <Container>
        <Button
          onClick={() => {
            setAddmodal(true);
          }}
        >
          <FaPlus />
        </Button>
      </Container>
      <Validate validations={{ email: ["required"] }}>
        {({ validate, errorMessages, allValid }) => (
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
                    required
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
              <BsButton
                variant="secondary"
                onClick={() => {
                  setAddmodal(false);
                }}
              >
                Close
              </BsButton>
              <BsButton
                variant="primary"
                onClick={() => {
                  handleSubmit(allValid);
                }}
              >
                Add
              </BsButton>
            </Modal.Footer>
          </Modal>
        )}
      </Validate>
    </div>
  );
}

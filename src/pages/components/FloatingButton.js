import React, { useState } from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { FaPlus } from "react-icons/fa";

import Modal from "react-bootstrap/Modal";
import BsButton from "react-bootstrap/Button";
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

export default function FloatingButton(props) {
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
    base("users").find(props.token.recordid, function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      var maxorder = record.get("maxorder");
      //got maxorder now create new record yo!
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
            props.refreshlinks(true);
          }
        }
      );

      //end of record creation
    });
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
            onClick={(e) => {
              send(e);
            }}
          >
            Add
          </BsButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

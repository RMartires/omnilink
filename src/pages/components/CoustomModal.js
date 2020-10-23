import React, { useState, useEffect } from "react";
//
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, watch, errors } = useForm();

  const send = (data) => {
    console.log(data);
    base("links").update(
      [
        {
          id: props.recordid,
          fields: {
            links: data.link,
            users: [props.token.recordid],
            title: data.title,
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
              <form onSubmit={handleSubmit(send)}>
                <lable className="form-lable">Title</lable>
                <input
                  className="form-control"
                  ref={register({ required: true })}
                  name="title"
                  defaultValue={props.title}
                />
                {errors.title && (
                  <p style={{ color: "red" }}>❌ title is required</p>
                )}
                <lable className="form-lable">Link</lable>
                <input
                  className="form-control"
                  ref={register({ required: true })}
                  name="link"
                  defaultValue={props.link}
                />
                {errors.link && (
                  <p style={{ color: "red" }}>❌ link is required</p>
                )}
                <input
                  type="submit"
                  id="submit_add"
                  style={{ display: "none" }}
                ></input>
              </form>
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
                  document.getElementById("submit_add").click();
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

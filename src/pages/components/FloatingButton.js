import React, { useState } from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { FaPlus } from "react-icons/fa";

import Modal from "react-bootstrap/Modal";
import BsButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

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

export default function FloatingButton(props) {
  const [addmodal, setAddmodal] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();

  const Submit = async (data) => {
    console.log(data);
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
              links: data.link,
              users: [props.token.recordid],
              title: data.title,
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
          <form onSubmit={handleSubmit(Submit)}>
            <lable className="form-lable">Title</lable>
            <input
              className="form-control"
              ref={register({ required: true })}
              name="title"
            />
            {errors.title && (
              <p style={{ color: "red" }}>❌ title is required</p>
            )}
            <lable className="form-lable">Link</lable>
            <input
              className="form-control"
              ref={register({ required: true })}
              name="link"
            />
            {errors.link && <p style={{ color: "red" }}>❌ link is required</p>}
            <input
              type="submit"
              id="submit_add"
              style={{ display: "none" }}
            ></input>
          </form>
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
            variant="success"
            type="submit"
            onClick={() => {
              document.getElementById("submit_add").click();
            }}
          >
            Add
          </BsButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

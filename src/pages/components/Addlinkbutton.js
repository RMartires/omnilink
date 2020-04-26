import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: "key6g32DRULc2ELR4" }).base(
  "app0XNGZWSAZxUY6M"
);

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: "center",
    fontSize: "1.5rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-150px",
    marginLeft: "-150px",
    width: "300px",
    height: "300px",
  },
}));

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

  const classes = useStyles();

  return (
    <Grid item style={{ width: "90%" }}>
      <Card
        style={{ backgroundColor: "#F77737" }}
        onClick={() => {
          setAddmodal(true);
        }}
      >
        <CardHeader
          style={{ textAlign: "center", fontSize: "0.6rem" }}
          action={
            <div>
              <IconButton
                aria-controls={`simple-menu`}
                aria-haspopup="true"
                style={{ opacity: "0%" }}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          }
          title="Add link"
        ></CardHeader>
      </Card>
      <Modal
        open={addmodal}
        onClose={() => {
          setAddmodal(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper elevation={0} className={classes.paper}>
          <div>
            <p>Add link</p>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={(e) => {
                handlechange(e);
              }}
              name="title"
            />
            <TextField
              id="outlined-basic"
              label="link"
              variant="outlined"
              style={{ marginTop: "10px" }}
              onChange={(e) => {
                handlechange(e);
              }}
              name="link"
            />
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  send(e);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </Grid>
  );
}

export default Addlinkbutton;

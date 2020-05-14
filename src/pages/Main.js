import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Login from "./Login";
import productimage from "../assets/product.png";

import ToolBar from "./components/ToolBar";
import classes1 from "./Main.module.css";

//bootstarp
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Footer from "./components/Footer";

// var theme = createMuiTheme();
// theme = responsiveFontSizes(theme);

// const styles = (theme) => ({
//   toprow: {
//     [theme.breakpoints.up("sm")]: {
//       height: "100vh",
//     },
//   },
// });

class Main extends Component {
  state = {
    pageredirect: false,
    page: undefined,
  };

  componentDidMount() {
    console.log(this.props.theme);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ToolBar buttons={["login", "about"]} />
        <Container fluid>
          <Row
            // className={classes1.firstrow}
            className="align-items-center"
            style={{ marginTop: "40px" }}
          >
            <Col className="align-self-center" xs={12} sm={6}>
              <Row className="justify-content-center">
                <Col xs="auto" style={{ textAlign: "center" }}>
                  <div>
                    <h1 style={{ fontSize: "3.2em" }}>Omnilink</h1>
                    <h4>Link Different😜</h4>
                    <Login size="md" text={"instagram login"} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={6}>
              <img
                src={productimage}
                alt="Omnilink"
                style={{ width: "100%" }}
              ></img>
            </Col>
          </Row>
          <Row
            className="justify-content-center"
            style={{
              height: "30vh",
              backgroundColor: "#648a20ad",
              marginBottom: "20px",
            }}
          >
            <Col xs="auto" className="align-self-center">
              <h1
                style={{ textDecorationLine: "underline", fontSize: "2.2rem" }}
              >
                Great Minds Link Alike
              </h1>
            </Col>
          </Row>
          <Row style={{ textAlign: "center" }}>
            <Col xs={12} sm={4}>
              <h5 className={classes1.headings}>Easy setup</h5>
              <p>
                It takes like two clicks to create a link account. Just
                authorize with your instagram account add the links and paste
                the link in any of your profiles.
              </p>
            </Col>
            <Col xs={12} sm={4}>
              <h5 className={classes1.headings}>Analytics</h5>
              <p>
                Use omnilink to measure your links activity and find out what
                your audience really likes.
              </p>
            </Col>
            <Col xs={12} sm={4}>
              <h5 className={classes1.headings}>20+ Themes</h5>
              <p>
                Make your link page stand out, Customize your page with a varity
                of more than 20 themes
              </p>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default Main;

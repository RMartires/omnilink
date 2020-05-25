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
import About from "./About";

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
          <section id="intro">
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
          </section>
          <section id="features">
            <Row
              className="justify-content-center"
              style={{
                height: "15vh",
                backgroundColor: "#648a20ad",
                marginBottom: "20px",
              }}
            >
              <Col xs="auto" className="align-self-center">
                <h1
                  style={{
                    textDecorationLine: "underline",
                    fontSize: "2.2rem",
                  }}
                >
                  What we do
                </h1>
              </Col>
            </Row>
            <Row style={{ textAlign: "center" }}>
              <Col xs={12} sm={4}>
                <h5 className={classes1.headings}>Easy setup</h5>
                <p className={classes1.features}>
                  It takes like two clicks to create a link account. Just
                  authorize with your instagram account add the links and paste
                  the link in any of your profiles.
                </p>
              </Col>
              <Col xs={12} sm={4}>
                <h5 className={classes1.headings}>Share it anywhere</h5>
                <p className={classes1.features}>
                  Take your Omnilink to your audience on every platfrom, help
                  them to connect to you anywhere.
                </p>
              </Col>
              <Col xs={12} sm={4}>
                <h5 className={classes1.headings}>Pre-Designed Themes</h5>
                <p className={classes1.features}>
                  Make your link page stand out, Customize your page with a
                  varity of more than 10 themes
                </p>
              </Col>
              <Col xs={12} sm={4}>
                <h5 className={classes1.headings}>A hub for all your work</h5>
                <p className={classes1.features}>
                  Keep all your links in a central hub, to help your audience
                  find your work with ease.
                </p>
              </Col>
              <Col xs={12} sm={4}>
                <h5 className={classes1.headings}>Manage links with ease</h5>
                <p className={classes1.features}>
                  Effortlessly create an Omnilink account and manage all your
                  links with a simple user interface.
                </p>
              </Col>
              <Col xs={12} sm={4}>
                <h5 className={classes1.headings}>Analytics</h5>
                <p className={classes1.features}>
                  Use omnilink to measure your links activity and find out what
                  your audience really likes.
                </p>
              </Col>
            </Row>
          </section>
          <section id="about">
            <Row
              className="justify-content-center"
              style={{
                height: "15vh",
                backgroundColor: "#648a20ad",
                marginBottom: "20px",
              }}
            >
              <Col xs="auto" className="align-self-center">
                <h1
                  style={{
                    textDecorationLine: "underline",
                    fontSize: "2.2rem",
                  }}
                >
                  About
                </h1>
              </Col>
            </Row>
            <About />
          </section>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default Main;

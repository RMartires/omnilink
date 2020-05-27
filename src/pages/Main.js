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

//import animations
import Linkanywhere from "./components/animations/Linkanywhere";
import Manythemes from "./components/animations/Manythemes";
import Analytics from "./components/animations/Analytics";
import Easysetup from "./components/animations/Easysetup";

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
    // console.log(classes1);
  }

  render() {
    return (
      <div>
        <ToolBar buttons={["login", "about"]} />
        <Container fluid>
          <section id="intro" className={classes1.content}>
            <Row
              // className={classes1.firstrow}
              className={classes1.mainpart}
            >
              <Col className={classes1.omnilink} xs={12} sm={6}>
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
            <div className={classes1.content}>
              <Row style={{ textAlign: "center" }} className={classes1.therow}>
                <Col xs={12} sm={6}>
                  <Linkanywhere />
                </Col>
                <Col xs={12} sm={6}>
                  <h4 className={classes1.headings}>Share it anywhere</h4>
                  <p className={classes1.features}>
                    Take your Omnilink to your audience on every platfrom, help
                    them to connect to you anywhere.
                  </p>
                </Col>
              </Row>
              <Row style={{ textAlign: "center" }} className={classes1.therow}>
                <Col xs={12} sm={6}>
                  <Easysetup />
                </Col>
                <Col xs={12} sm={6}>
                  <h4 className={classes1.headings}>Easy setup</h4>
                  <p className={classes1.features}>
                    It takes like two clicks to create a link account. Just
                    authorize with your instagram account add the links and
                    paste the link in any of your profiles.
                  </p>
                </Col>
              </Row>
              <Row style={{ textAlign: "center" }} className={classes1.therow}>
                <Col xs={12} sm={6}>
                  <Manythemes />
                </Col>
                <Col xs={12} sm={6}>
                  <h4 className={classes1.headings}>Pre-Designed Themes</h4>
                  <p className={classes1.features}>
                    Make your link page stand out, Customize your page with a
                    varity of more than 10 themes
                  </p>
                </Col>
              </Row>
              <Row style={{ textAlign: "center" }} className={classes1.therow}>
                <Col xs={12} sm={6}>
                  <Analytics />
                </Col>
                <Col xs={12} sm={6}>
                  <h4 className={classes1.headings}>Analytics</h4>
                  <p className={classes1.features}>
                    Use omnilink to measure your links activity and find out
                    what your audience really likes.
                  </p>
                </Col>
              </Row>
            </div>
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
            <div className={classes1.content}>
              <About />
            </div>
          </section>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default Main;

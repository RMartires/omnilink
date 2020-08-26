// eslint-disable-next-line
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Login from "./Login";
import productimage from "../assets/product3.png";

//section images
import features from "../assets/featuresSection.png";

import ToolBar from "./components/ToolBar";
import classes1 from "./Main.module.css";

//bootstarp
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Footer from "./components/Footer";
import About from "./About";
import FbLogin from "./components/FbLogin";
import LoadingScreen from "./components/LoadingScreen";
//BGsvgs
import topFringe from "../assets/topFringe.svg";
import backdrop_top from "../assets/backdrop_top.svg";
import backdrop_bottom from "../assets/backdrop_bottom.svg";

//import animations//
import Linkanywhere from "./components/animations/Linkanywhere/Linkanywhere";
import Manythemes from "./components/animations/Manythemes";
import Analytics from "./components/animations/Analytics";
import Easysetup from "./components/animations/Easysetup";
import easymanage from "../assets/easymanage.svg";

class Main extends Component {
  state = {
    pageredirect: false,
    page: undefined,
    setupredirect: false,
    loading: false,
  };

  componentDidMount() {
    console.log(this.props.theme);
    // console.log(classes1);
  }

  render() {
    const loadingsc = () => {
      if (this.state.loading) {
        return <LoadingScreen onlyspinner={true} />;
      }
    };

    return (
      <div>
        {/* topfringe */}
        <img
          className={classes1.topfringe}
          style={{
            width: "100%",
            margin: "0 auto",
            position: "absolute",
          }}
          src={topFringe}
        />
        {/* toolbar */}
        <ToolBar
          buttons={["login", "about"]}
          setToken={this.props.setToken}
          token={this.props.token}
        />
        {loadingsc()}
        <Container
          fluid
          style={
            this.state.loading ? { display: "none" } : { marginBottom: "50px" }
          }
        >
          <section id="intro" className={classes1.content}>
            <Row
              // className={classes1.firstrow}
              className={classes1.mainpart}
            >
              <Col xs={12} sm={6} className={classes1.imagecol}>
                <img
                  src={productimage}
                  alt="linnkninja"
                  className={classes1.mainpartimage}
                ></img>
              </Col>
              <Col className={classes1.omnilink} xs={12} sm={5}>
                <h1>Share them links</h1>
                <h4>
                  help your audience find you and your work across all platforms
                </h4>
                <h6>-Link Different😜</h6>
                {/* <Login size="md" text={"instagram login"} /> */}
                <FbLogin
                  setToken={this.props.setToken}
                  token={this.props.token}
                  setLoading={() => {
                    this.setState({ loading: true });
                  }}
                />
              </Col>
            </Row>
          </section>
        </Container>
        {/* backdrop */}
        <img
          style={{
            width: "100%",
            margin: "0 auto",
            position: "absolute",
            height: "60vh",
          }}
          src={backdrop_top}
        />
        <Container
          fluid
          style={
            this.state.loading
              ? { display: "none", padding: "0px" }
              : { padding: "0px" }
          }
        >
          <section id="features">
            <h1
              style={{ marginBottom: "100px" }}
              className={classes1.sectionname}
            >
              Features
            </h1>
            <div
              className={classes1.content}
              style={{ backgroundColor: "#d3def0", maxWidth: "unset" }}
            >
              <Row
                style={{ textAlign: "center", margin: "0px" }}
                className={classes1.therow}
              >
                <Col xs={12} sm={6}>
                  <Linkanywhere />
                </Col>
                <Col xs={12} sm={6}>
                  <h4 className={classes1.headings}>Share it anywhere</h4>
                  <p className={classes1.features}>
                    Take your linnkninja to your audience on every platfrom,
                    help them to connect to you anywhere.
                  </p>
                </Col>
              </Row>
              <Row
                style={{ textAlign: "center", margin: "0px" }}
                className={classes1.therow}
              >
                <Col xs={12} sm={6}>
                  <img src={easymanage} className={classes1.easymanage} />
                </Col>
                <Col xs={12} sm={6}>
                  <h4 className={classes1.headings}>Easy manage</h4>
                  <p className={classes1.features}>
                    manage all links with ease using the drag and drop menu
                  </p>
                </Col>
              </Row>
              <Row
                style={{ textAlign: "center", margin: "0px" }}
                className={classes1.therow}
              >
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
              <Row
                style={{ textAlign: "center", margin: "0px" }}
                className={classes1.therow}
              >
                <Col xs={12} sm={6}>
                  <Analytics />
                </Col>
                <Col xs={12} sm={6}>
                  <h4 className={classes1.headings}>Analytics</h4>
                  <p className={classes1.features}>
                    Use linnkninja to measure your links activity and find out
                    what your audience really likes.
                  </p>
                </Col>
              </Row>
            </div>
          </section>
        </Container>
        <img
          style={{
            width: "100%",
            margin: "0 auto",
            position: "absolute",
            height: "20vh",
            zIndex: "-1",
          }}
          src={backdrop_bottom}
        />
        <Container fluid style={this.state.loading ? { display: "none" } : {}}>
          <section id="about" className={classes1.about}>
            <h1 className={classes1.sectionname}>About</h1>
            <div className={classes1.content}>
              <About classname={classes1.about} />
            </div>
          </section>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default Main;

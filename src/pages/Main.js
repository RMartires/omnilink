import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Login from "./Login";
import productimage from "../assets/product2.png";

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

//import animations//
import Linkanywhere from "./components/animations/Linkanywhere/Linkanywhere";
import Manythemes from "./components/animations/Manythemes";
import Analytics from "./components/animations/Analytics";
import Easysetup from "./components/animations/Easysetup";

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
        <ToolBar
          buttons={["login", "about"]}
          setToken={this.props.setToken}
          token={this.props.token}
        />
        <div className={classes1.box}></div>
        <Container fluid>
          {loadingsc()}
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
              <Col className={classes1.omnilink} xs={12} sm={6}>
                <h1 style={{ fontSize: "5em", fontFamily: "Risque" }}>
                  linnkninja
                </h1>
                <h4>Link Different😜</h4>
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
          <section id="features">
            <h1
              style={{ marginBottom: "100px" }}
              className={classes1.sectionname}
            >
              what we do
            </h1>
            <div className={classes1.content}>
              <Row style={{ textAlign: "center" }} className={classes1.therow}>
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
                    Use linnkninja to measure your links activity and find out
                    what your audience really likes.
                  </p>
                </Col>
              </Row>
            </div>
          </section>
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

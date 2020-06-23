import React, { useState } from "react";
//
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import MoreVertIcon from "../../assets/more_vert.svg";
import { more_vert } from "react-icons/md";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import { AiFillCopy } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import clipboard from "../../assets/clipboard.svg";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Cookies from "js-cookie";

import classes from "./ThemeSelector2.module.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    {/* &#x25bc; */}
  </a>
));

const UserProfile = (props) => {
  //  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState();
  const [copystatus, setCopystatus] = useState("copy");
  const [target, setTarget] = useState(null);

  const handleclick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    window.FB.getLoginStatus(function (response) {
      //statusChangeCallback(response);
      console.log(response);
      window.FB.logout(function (response) {
        // Person is now logged out
        console.log(response);
        Cookies.remove("jwttoken");
        props.setToken(undefined);
      });
    });
  };

  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {copystatus}
      </Tooltip>
    );
  };

  const logoutbutton = () => {
    if (props.token) {
      return (
        <Dropdown style={{ paddingTop: "1em" }}>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <FaEllipsisV
              style={{ fontSize: "1.1em" }}
              className={classes["font" + props.theme]}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ padding: "1em", lineHeight: "2em" }}>
            <Dropdown.Item
              eventKey="1"
              onClick={() => {
                props.setShowTheme(true);
              }}
            >
              Themes
            </Dropdown.Item>
            <hr style={{ margin: "0px" }} />
            <Dropdown.Item
              eventKey="1"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  return (
    <div>
      <Row className="justify-content-end">
        <Col xs="auto">{logoutbutton()}</Col>
      </Row>
      <Row
        className="justify-content-center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Col xs={8} sm={7} md={5} lg={3}>
          <Image src={props.profile_picture} roundedCircle fluid />
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <h5 className={classes["font" + props.theme]}>
            {/* 👉{props.user_name + "  "} */}
            {props.token ? (
              <div>
                <input
                  id="link"
                  value={
                    window.location.href.split("%")[0] + "👉" + props.user_name
                  }
                />
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 200 }}
                  overlay={renderTooltip}
                >
                  <AiFillCopy
                    style={{
                      height: "25px",
                      width: "25px",
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      var copyText = document.getElementById("link");
                      copyText.select();
                      copyText.setSelectionRange(
                        0,
                        99999
                      ); /*For mobile devices*/

                      document.execCommand("copy");

                      setCopystatus("Copied");
                    }}
                  />
                </OverlayTrigger>
              </div>
            ) : (
              <div>👉{props.user_name + "  "}</div>
            )}
          </h5>
        </Col>
        {/* <Col xs="auto">{copybut()}</Col> */}
      </Row>
    </div>
  );
};

export default UserProfile;

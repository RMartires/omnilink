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

  const handleclick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    props.setToken(undefined);
  };

  const logoutbutton = () => {
    if (props.token) {
      return (
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <Image src={MoreVertIcon} rounded />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  return (
    <Container fluid>
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
          <h5>👉{props.user_name}</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;

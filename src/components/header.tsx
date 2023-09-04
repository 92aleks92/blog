import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "../assets/logo.png";
import { NavLink } from "react-bootstrap";
import { axiosInstance, setToken, token } from "../api";
import { tenantId } from "../config";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const getUserName = () => {
    axiosInstance.get(`/tenants/${tenantId}`).then((res) => {
      setName(res.data.name);
    });
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/");
    setName("");
    setToken("");
  };
  useEffect(() => {
    if (token && token.length) {
      getUserName();
    }
  }, []);
  return (
    <div className="header">
      <Container>
        <Row className="align-items-center">
          <Col md={1}>
            <NavLink href="/articles" className="link">
              <img src={Logo} alt="" />
            </NavLink>
          </Col>
          <Col>
            <NavLink href="/articles" className="link">
              Recent Articles
            </NavLink>
            <NavLink href="/" disabled className="link">
              About
            </NavLink>
          </Col>
          {name && (
            <Col md={3}>
              <NavLink href="/admin/articles" className="link">
                My Articles
              </NavLink>
              <NavLink href="/admin/new-article" className="link">
                Create Article
              </NavLink>
            </Col>
          )}
          <Col md={1}>
            {!token ? <NavLink href="/login">LogIn</NavLink> : name}
          </Col>
          {name && (
            <Col md={1}>
              <NavLink href="#" onClick={logOut}>
                LogOut
              </NavLink>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default Header;

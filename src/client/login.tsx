import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { axiosInstance, setToken, token } from "../api";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onLogin = (e: React.FormEvent) => {
    axiosInstance.post("/login", { username: login, password }).then((res) => {
      localStorage.setItem("token", res.data.access_token);
      setToken(res.data.access_token);
      navigate("/admin/articles");
    });
    e.preventDefault();
  };
  if (token && token.length) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Body>
              <Form onSubmit={onLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

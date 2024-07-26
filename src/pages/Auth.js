import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";

function Auth({handleLogin}) {
  const navigate = useNavigate(); //
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState([null]);
  const [error, setError] = useState(null);
  const [resp, setResp] = useState([null]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:3001/api/auth/register";

    try {
      const form = await axios.post(url, formData, {
        headers: {
          "Authorization" : `Bearer ${url}`,
          "Content-Type": "application/json",
        },
      });
      // setFormData(formData.data);5
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponse(null);
    }
  };

  const handleloginSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:3001/api/auth/login";
    console.log(loginData);
    try {
      const form = await axios.post(url, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(form.data.token);
      localStorage.setItem("user", form.data.token);
      handleLogin();
      navigate("/"); //to navigate the page;
      // setFormData(formData.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponse(null);
    }
  };
  return (
    <Container>
      <Row>
        <Col className="form_page">
          <h1>form</h1>
          <form onSubmit={handleSubmit}>
            <div className="form_body">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </div>
            <Button className="btn btn-primary" type="submit">
              {" "}
              Register{" "}
            </Button>
          </form>
        </Col>
        <Col className="img_page">
          <h2> Login </h2>
          <form onSubmit={handleloginSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="password"
                required
              />
            </Form.Group>
            <Button className="btn btn-primary" type="submit">
              Register
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;

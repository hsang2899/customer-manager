import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import swal from "sweetalert";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

async function loginUser(credentials) {
  return axios({
    method: "POST",
    url: "http://localhost:8080/api/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: credentials,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data); // => the response payload
        swal({
          title: "Login Failed!",
          icon: "error",
          button: false,
          text: error.response.data.message,
          timer: 1000,
        });
      } else {
        swal({
          title: "Login Failed!",
          icon: "error",
          text: "Something went wrong",
          button: false,
          timer: 1000,
        });
      }
    });
}

export default function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    if (token) {
      setAuth(token);
      localStorage.setItem("token",token);
      history.push("/");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

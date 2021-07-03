/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const checkLogin = async () => {
    let data = {
      username: user,
      password: pass,
    };
    let response = await fetch(
      "https://api-dokter.herokuapp.com/auth/admin/login",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((e) => {
      setError(true);
    });

    if (response.status == 200) {
      let datas = await response.json();
      if (datas.role == 1) {
        localStorage.setItem("token", datas.token);
        localStorage.setItem("name", datas.name);
        localStorage.setItem("user", user);
        localStorage.setItem("pass", pass);
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <h2 className="text-center py-2">Login</h2>
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => {
                      setUser(e.target.value);
                      setError(false);
                    }}
                    value={user}
                    autoComplete="new-email"
                  />
                </InputGroup>
                {error ? (
                  <small className="mt-4 ml-3 text-danger">
                    Username salah
                  </small>
                ) : (
                  <small></small>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPass(e.target.value);
                      setError(false);
                    }}
                    value={pass}
                  />
                </InputGroup>
                {error ? (
                  <small className="mt-4 ml-3 text-danger">
                    Password salah
                  </small>
                ) : (
                  <small></small>
                )}
              </FormGroup>

              <div className="text-center">
                <Button
                  className="my-4"
                  onClick={() => checkLogin()}
                  color="primary"
                  type="button"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;

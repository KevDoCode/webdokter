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

const Register = () => {
  const [username, setUsername] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const cekForm = () => {
    let valid = true;
    if (username === "") {
      valid = false;
      setUsernameError("Please fill username");
    } else {
      setUsernameError("");
    }

    if (first === "") {
      valid = false;
      setFirstError("Please fill first name");
    } else {
      setFirstError("");
    }

    if (last === "") {
      valid = false;
      setLastError("Please fill last name");
    } else {
      setLastError("");
    }

    if (email === "") {
      valid = false;
      setEmailError("Please fill email");
    } else {
      setEmailError("");
    }

    if (pass === "") {
      valid = false;
      setPassError("Please fill password");
    } else {
      setPassError("");
    }

    if (valid) {
      registerIt();
    }
  };

  const registerIt = async () => {
    const data = {
      username: username,
      email: email,
      firstName: first,
      lastName: last,
      password: pass,
      roles: "2",
    };

    let response = await fetch(
      "https://api-dokter.herokuapp.com/auth/register",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let status = response.status
    let jsonData = await response.json();
    if(status ==200){
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("user", username);
      localStorage.setItem("pass", pass);
    }else{
      jsonData.error.map((e)=>{
        if(e.field == "username"){
          setUsernameError(e.message)
        }
        if(e.field == "email"){
          setEmailError(e.message)
        }
        if(e.field == "firstName"){
          setFirstError(e.message)
        }
        if(e.field == "lastName"){
          setLastError(e.message)
        }
        if(e.field == "password"){
          setPassError(e.message)
        }
      })
    }
  };

  const [usernameError, setUsernameError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h3>Register</h3>
              <p>Register account for booking</p>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name"
                    value={first}
                    onChange={(e) => {
                      setFirst(e.target.value);
                    }}
                    type="text"
                  />
                </InputGroup>
                <small className="text-danger">{firstError}</small>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    value={last}
                    onChange={(e) => {
                      setLast(e.target.value);
                    }}
                  />
                </InputGroup>
                <small className="text-danger">{lastError}</small>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                  />
                </InputGroup>
                <small className="text-danger">{usernameError}</small>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
                <small className="text-danger">{emailError}</small>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-2">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                </InputGroup>
                <small className="text-danger mt-4">{passError}</small>
              </FormGroup>

              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  onClick={() => cekForm()}
                  type="button"
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;

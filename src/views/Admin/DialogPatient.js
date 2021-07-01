import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Modal,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { fetchput } from "variables/Data";
import { fetchpost } from "variables/Data";
const DialogPatient = ({ modal, setModal, data = [], fetchdata }) => {
  useEffect(() => {
    setUsername(data.username != undefined ? data.username : "");
    setFirstname(data.firstname != undefined ? data.firstname : "");
    setLastName(data.lastname != undefined ? data.lastname : "");
    setEmail(data.email != undefined ? data.email : "");
    setPass(data.password != undefined ? data.password : "");
  }, [data]);

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const [auth, setAuth] = useState(false);

  const checkForm = () => {
    let valid = true;
    if (username === "") {
      valid = false;
      setUsernameError("Please fill username");
    } else {
      setUsernameError("");
    }
    if (firstname === "") {
      valid = false;
      setFirstnameError("Please fill first name");
    } else {
      setFirstnameError("");
    }
    if (lastName === "") {
      valid = false;
      setLastNameError("Please fill last name");
    } else {
      setLastNameError("");
    }
    if (email === "") {
      valid = false;
      setEmailError("Please fill username");
    } else {
      setEmailError("");
    }
    if (pass === "") {
      valid = false;
      setPassError("Please fill username");
    } else {
      setPassError("");
    }
    if (valid) {
      saveData();
    }
  };

  const saveData = async () => {
    let body = {
      username: username,
      email: email,
      firstName: firstname,
      lastName: lastName,
      password: pass,
      roles: 2,
    };
    let response;
    if (data.username == undefined) {
      response = await fetchpost("user", body);
    } else {
      response = await fetchput("user/" + data.username, body);
    }
    let jsonData = await response.json();
    if (response.status == 200) {
      fetchdata();
      setModal(false);
    } else if (response.status == 401) {
      setAuth(true);
    } else {
      console.log(response.status);
      jsonData.error.map((e) => {
        if (e.field == "email") {
          setEmailError(e.message);
        }
        if (e.field == "firstName") {
          setFirstnameError(e.message);
        }
        if (e.field == "lastName") {
          setLastNameError(e.message);
        }
        if (e.field == "password") {
          setPassError(e.message);
        }

        if (e.field == "username") {
          setUsernameError(e.message);
        }
      });
    }
  };
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={modal}
      toggle={() => setModal(false)}
    >
      {auth && <Redirect to="/auth/admin/login" />}
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Form Patient
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => setModal(false)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <FormGroup>
            <small>First Name</small>
            <Input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <small className="text-danger">{firstnameError}</small>
          </FormGroup>
          <FormGroup>
            <small>Last Name</small>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <small className="text-danger">{lastNameError}</small>
          </FormGroup>
          <FormGroup>
            <small>Username</small>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value.split(" ").join(""))}
            />
            <small className="text-danger">{usernameError}</small>
          </FormGroup>
          <FormGroup>
            <small>Email</small>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <small className="text-danger">{emailError}</small>
          </FormGroup>
          {data.password == undefined && (
            <FormGroup>
              <small>Password</small>
              <Input
                type={"password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <small className="text-danger">{passError}</small>
            </FormGroup>
          )}
        </Form>
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => setModal(false)}
        >
          Close
        </Button>
        <Button
          color="primary"
          onClick={() => {
            checkForm();
          }}
          type="button"
        >
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default DialogPatient;

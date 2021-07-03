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
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { fetchget } from "variables/Userdata";
import { fetchput } from "variables/Userdata";
import AfterModal from "components/modal/AfterModal";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const [modal, setModal] = useState(false);
  const [header, setHeader] = useState("Success");
  const [pesan, setpesan] = useState("Data has been edited");
  const [status, setstatus] = useState("success");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await fetchget("user/" + localStorage.getItem("user_user"));
    if (data.status == 401) {
    } else {
      let response = await data.json();
      setUsername(response.data.username);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setEmail(response.data.email);
      setpass(response.data.password);
    }
  };

  const confirmForm = async () => {
    if (username == "" || firstname == "" || lastname == "" || email == "") {
      setstatus("danger");
      setHeader("Failed");
      setpesan("Please fill all input");
      setModal(true);
    } else {
      let body = {
        username: username,
        email: email,
        firstName: firstname,
        lastName: lastname,
        password: pass,
        roles: 2,
      };

      let data = await fetchput(
        "user/" + localStorage.getItem("user_user"),
        body
      );
      if (data.status == 401) {
      } else {
        setstatus("success");
        setHeader("Success");
        setpesan("Data has been edited");
        setModal(true);
        let res = await data.json();
        console.log(res);
        localStorage.setItem("user_user", username);
      }
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <AfterModal
        setModal={setModal}
        modal={modal}
        status={status}
        msg={pesan}
        header={header}
      />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <Button
                    className="btn-block"
                    color="primary"
                    onClick={(e) => confirmForm()}
                  >
                    Simpan
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;

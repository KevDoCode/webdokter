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
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
// react plugin used to create charts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

// core components
import { Redirect } from "react-router-dom";
import Header from "components/Headers/UserHeader";
import { fetchget } from "variables/Userdata";
import { fetchput } from "variables/Userdata";
import DialogConfirm from "views/examples/DialogConfirm";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [data, setData] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const [modalAction, setModalAction] = useState(false);
  const [cari, setCari] = useState("");
  const [auth, setAuth] = useState(false);

  const checkDate = (date) => {
    var date1 = new Date();
    var date2 = new Date(date);
    if (date1.getTime() < date2.getTime()) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const cancelData = () => {
    let body = {
      date_book: dataSelected.date_book.substring(0, 10),
      date_regist: dataSelected.date_regist.substring(0, 10),
      idappointments: dataSelected.idappointments,
      time_book: dataSelected.time_book.substring(0, 5),
      username: localStorage.getItem("user_user"),
      flagstatus: 0,
    };
    fetchput("regis/" + dataSelected.id, body).then((res) => {
      if (res.status === 401) {
        if (localStorage.getItem("tokenuser") !== undefined) {
          localStorage.setItem("expired", "token expired");
        }
        setAuth(true);
      }
      res.json().then((e) => {
        getData();
      });
    });
  };

  const getData = () => {
    fetchget("regis/username/" + localStorage.getItem("user_user")).then(
      (res) => {
        console.log(res.status);
        if (res.status === 401) {
          setAuth(true);
        } else {
          res.json().then((e) => {
            setData(e.data);
            console.log(e.data);
            console.log(data);
          });
        }
      }
    );
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <DialogConfirm
        modal={modalAction}
        setModal={setModalAction}
        action={cancelData}
      />
      {auth && <Redirect to="/auth/user/login" />}
      <Container className="mt--7" fluid>
        <Row className="mt-2">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-3">Your Appointment</h3>
                  </div>
                </Row>
                <FormGroup>
                  <InputGroup>
                    <Input
                      value={cari}
                      onChange={(e) => {
                        setCari(e.target.value);
                      }}
                      placeholder={"Search "}
                      type="text"
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-send" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((e) => {
                    return (
                      <tr>
                        <td>{e.doctor}</td>
                        <td>{e.description}</td>
                        <td>{e.date_book.substring(0, 10)}</td>
                        <td>{e.time_book.substring(0, 5)}</td>
                        {e.flagstatus == 1 &&
                          checkDate(
                            e.date_book.substring(0, 10) +
                              " " +
                              e.time_book.substring(0, 5)
                          ) && (
                            <td className="text-center">
                              <Button
                                color="danger"
                                onClick={() => {
                                  setDataSelected(e);
                                  setModalAction(true);
                                }}
                                outline
                                size="xs"
                              >
                                Cancel
                              </Button>
                            </td>
                          )}
                        {e.flagstatus == 1 &&
                          !checkDate(
                            e.date_book.substring(0, 10) +
                              " " +
                              e.time_book.substring(0, 5)
                          ) && (
                            <td className="text-center">
                              <Button color="primary" size="xs">
                                Skipped
                              </Button>
                            </td>
                          )}
                        {e.flagstatus == 0 && (
                          <td className="text-center">
                            <Button color="danger" size="xs">
                              Canceled
                            </Button>
                          </td>
                        )}
                        {e.flagstatus == 2 && (
                          <td className="text-center">
                            <Button color="success" size="xs">
                              Passed
                            </Button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;

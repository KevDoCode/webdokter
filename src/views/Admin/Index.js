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
} from "reactstrap";

// core components
import { Redirect } from "react-router-dom";
import Header from "components/Headers/Header.js";
import { fetchget, fetchput } from "variables/Data";
import DialogConfirm from "views/examples/DialogConfirm";
const Index = (props) => {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [dataSelected, setDataSelected] = useState([]);
  const [modalAction, setModalAction] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchget("regis").then((res) => {
      console.log(res.status);
      if (res.status === 401) {
        if (localStorage.getItem("token") !== undefined) {
          localStorage.setItem("expired", "token expired");
        }
        setAuth(true);
      } else {
        res.json().then((e) => {
          setData(e.data);
          console.log(e.data);
          console.log(data);
        });
      }
    });
  };

  const cancelData = () => {
    let body = {
      date_book: dataSelected.date_book.substring(0, 10),
      date_regist: dataSelected.date_regist.substring(0, 10),
      idappointments: dataSelected.idappointments,
      time_book: dataSelected.time_book.substring(0, 5),
      username: dataSelected.username,
      flagstatus: 2,
    };
    fetchput("regis/" + dataSelected.id, body).then((res) => {
      if (res.status === 401) {
        if (localStorage.getItem("token") !== undefined) {
          localStorage.setItem("expired", "token expired");
        }
        setAuth(true);
      }

      res.json().then((e) => {
        console.log(e);
        getData();
      });
    });
  };

  const checkDate = (date) => {
    var date1 = new Date();
    var date2 = new Date(date);
    if (date1.getTime() < date2.getTime()) {
      return true;
    } else {
      return false;
    }
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
      {auth && <Redirect to="/auth/admin/login" />}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Regisrant</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((e) => {
                    return (
                      <tr>
                        <td>{e.firstname + " " + e.lastname}</td>
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
                                color="primary"
                                size="sm"
                                onClick={() => {
                                  setDataSelected(e);
                                  setModalAction(true);
                                }}
                              >
                                Will Come, Abcent Now
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
                              <Button color="danger" outline size="sm">
                                Skipped
                              </Button>
                            </td>
                          )}
                        {e.flagstatus == 0 && (
                          <td className="text-center">
                            <Button color="danger" size="sm">
                              Canceled
                            </Button>
                          </td>
                        )}
                        {e.flagstatus == 2 && (
                          <td className="text-center">
                            <Button color="success" size="sm">
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

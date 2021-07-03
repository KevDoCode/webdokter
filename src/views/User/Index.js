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
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
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
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { Redirect } from "react-router-dom";
import Header from "components/Headers/UserHeader";
import { fetchget } from "variables/Userdata";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [data, setData] = useState([]);
  const [cari, setCari] = useState("");
  const [auth, setAuth] = useState(false);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  useEffect(() => {
    fetchget("regis").then((res) => {
      console.log(res.status);
      if (res.status == 401) {
        setAuth(true);
      } else {
        res.json().then((e) => {
          setData(e.data);
          console.log(e.data);
          console.log(data);
        });
      }
    });
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}

      {auth && <Redirect to="/auth/admin/login" />}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
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
                        {e.flagstatus == 1 && (
                          <td className="text-center">
                            <Button color="danger" outline size="xs">
                              Cancel
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

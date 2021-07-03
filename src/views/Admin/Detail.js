import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { useHistory, useParams } from "react-router-dom";
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
} from "reactstrap";
import DialogConfirm from "views/examples/DialogConfirm";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { Redirect } from "react-router-dom";
import Header from "components/Headers/CommonHeader";
import { fetchget, fetchput } from "variables/Data";

const Index = (props) => {
  const history = useHistory();

  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  let { id } = useParams();
  const [auth, setAuth] = useState(false);
  const [dataSelected, setDataSelected] = useState([]);
  const [modalAction, setModalAction] = useState(false);
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
      if (res.status == 401) {
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

  const getData = () => {
    fetchget("appointment/" + id).then((res) => {
      console.log(res.status);
      if (res.status == 401) {
        history.replace("/auth/admin/login");
      } else {
        res.json().then((e) => {
          setData(e.data);
          if (e.data.length == 0) {
            history.replace("/admin/appoint");
          }
        });
      }
    });
    fetchget("regis/appointment/" + id).then((res) => {
      console.log(res.status);
      if (res.status == 401) {
        history.replace("/auth/admin/login");
      } else {
        res.json().then((e) => {
          setDetail(e.data);
          console.log(e.data);
          console.log(data);
        });
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header data={data} />
      {/* Page content */}
      <DialogConfirm
        modal={modalAction}
        setModal={setModalAction}
        action={cancelData}
      />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">List Regisrant</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Patient Name</th>

                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {detail.map((e) => {
                    return (
                      <tr>
                        <td>{e.firstname + " " + e.lastname}</td>

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

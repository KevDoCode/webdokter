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
import { Badge, Card, Col, Container, Row, Button, CardBody } from "reactstrap";

import DialogConfirm from "views/examples/DialogConfirm.js";
import { Redirect } from "react-router-dom";
// core components
import Header from "components/Headers/SearchHeader";
import { fetchget } from "variables/Userdata.js";
import { fetchdelete } from "variables/Userdata";
import { Link } from "react-router-dom";
const Appoint = () => {
  const [cari, setCari] = useState("");
  const [data, setData] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalAction, setModalAction] = useState(false);
  const [auth, setAuth] = useState(false);
  useEffect((e) => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchget("appointment")
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
        }
        res
          .json()
          .then((data) => {
            setData(data.data);
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  };

  const deleteItem = () => {
    fetchdelete("appointment/" + dataSelected.id)
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
        }
        res
          .json()
          .then((data) => {
            fetchData();
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  };
  return (
    <>
      <Header cari={cari} setCari={setCari} header="Appointment" />
      {auth && <Redirect to="/auth/user/login" />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Row className="mt-3">
              {" "}
              {data
                .filter((e) => {
                  return (
                    e.doctor.toUpperCase().includes(cari.toUpperCase()) ||
                    e.description.toUpperCase().includes(cari.toUpperCase())
                  );
                })
                .map((e) => (
                  <Col lg="4" xs="12">
                    <Card className="card-lift--hover shadow border-0 mt-2">
                      <CardBody className="py-5">
                        <div className="icon icon-shape icon-shape-success rounded-circle mb-2">
                          <i className="ni ni-ambulance" />
                        </div>
                        <h4 className="text-primary text-uppercase mb-1">
                          {e.doctor}
                        </h4>
                        <p className="description ">{e.description}</p>
                        <div>
                          <Badge
                            style={{ fontSize: 13 }}
                            color="danger"
                            pill
                            className="mr-1 mt-0"
                          >
                            {e.starttime.substring(0, 5) +
                              " - " +
                              e.endtime.substring(0, 5)}
                          </Badge>
                        </div>
                        <Link
                          to={{
                            pathname: "/user/detail/" + e.id,
                          }}
                        >
                          <Button className="mt-3" outline color="success">
                            Register
                          </Button>
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </Row>
        {/* Dark table */}
        <DialogConfirm
          modal={modalAction}
          setModal={setModalAction}
          action={deleteItem}
        />
      </Container>
    </>
  );
};

export default Appoint;

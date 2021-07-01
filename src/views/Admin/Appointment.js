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
  Badge,
  Card,
  Col,
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

import DialogConfirm from "views/examples/DialogConfirm.js";
import { Redirect } from "react-router-dom";
// core components
import Header from "components/Headers/Header.js";
import { fetchget } from "variables/Data.js";
import { fetchdelete } from "variables/Data";
import Datetime from "react-datetime";
import { Link } from "react-router-dom";
const Tables = () => {
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
        if (res.status == 401) {
          setAuth(true);
        }
        res
          .json()
          .then((data) => {
            console.log(data.data);
            setData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteItem = () => {
    fetchdelete("appointment/" + dataSelected.id)
      .then((res) => {
        if (res.status == 401) {
          setAuth(true);
        }
        res
          .json()
          .then((data) => {
            fetchData();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Header />
      {auth && <Redirect to="/auth/login" />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-3">List Appointment</h3>
                <Form>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        value={cari}
                        onChange={(e) => {
                          setCari(e.target.value);
                        }}
                        placeholder="Search Appointment"
                        type="text"
                      />
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-send" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Link to={{ pathname: "/admin/detailappoint" }}>
                        <Button
                          color="primary"
                          onClick={() => {
                            setDataSelected([]);
                          }}
                          className="ml-3"
                        >
                          Tambah
                        </Button>
                      </Link>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Data</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((e) => {
                      return (
                        e.doctor.toUpperCase().includes(cari.toUpperCase()) ||
                        e.description.toUpperCase().includes(cari.toUpperCase())
                      );
                    })
                    .map((e) => (
                      <tr>
                        <td>
                          <h3 className="my-0">{e.description}</h3>
                          <p className="my-0">
                            Dokter : <b>{e.doctor}</b>
                          </p>
                          <p className="my-0">
                            {e.starttime.substring(0, 5)} -{" "}
                            {e.endtime.substring(0, 5)}
                          </p>
                        </td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <Link
                                to={{
                                  pathname: "/admin/detailappoint",
                                  state: { data: e },
                                }}
                              >
                                <DropdownItem>Edit</DropdownItem>
                              </Link>
                              <DropdownItem
                                onClick={() => {
                                  console.log(e);
                                  setDataSelected(e);
                                  setModalAction(true);
                                }}
                              >
                                Delete
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  console.log(e);
                                  setDataSelected(e);
                                  setModalAction(true);
                                }}
                              >
                                Regisrant
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <h5>
                  Amount of Data :{" "}
                  {
                    data.filter((e) => {
                      return (
                        e.doctor.toUpperCase().includes(cari.toUpperCase()) ||
                        e.description.toUpperCase().includes(cari.toUpperCase())
                      );
                    }).length
                  }
                </h5>
              </CardFooter>
            </Card>
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

export default Tables;

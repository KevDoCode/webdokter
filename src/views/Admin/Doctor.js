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
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from "reactstrap";
import DialogDoctor from "views/Admin/DialogDoctor.js";
import DialogConfirm from "views/examples/DialogConfirm.js";
import { Redirect } from "react-router-dom";
// core components
import Header from "components/Headers/Header.js";
import { fetchget } from "variables/Data.js";
import { fetchdelete } from "variables/Data";
import AfterModal from "components/modal/AfterModal";
const Tables = () => {
  const [cari, setCari] = useState("");
  const [data, setData] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalAction, setModalAction] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [auth, setAuth] = useState(false);
  useEffect((e) => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchget("dokter")
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
        }
        res
          .json()
          .then((data) => {
            console.log(data.data);
            setData(data.data);
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  };

  const deleteItem = () => {
    fetchdelete("dokter/" + dataSelected.id)
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
        } else if (res.status === 200) {
          res
            .json()
            .then((data) => {
              fetchData();
            })
            .catch((e) => {});
        } else {
          setModalError(true);
        }
      })
      .catch((e) => {});
  };
  return (
    <>
      <Header />
      {auth && <Redirect to="/auth/admin/login" />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/*Modal*/}
        <AfterModal
          modal={modalError}
          setModal={setModalError}
          msg="Doctor has appoint with patient cannot delete"
        />
        <DialogDoctor
          modal={modal}
          setModal={setModal}
          data={dataSelected}
          fetchdata={fetchData}
        />

        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-3">List Doctor</h3>
                <Form>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        value={cari}
                        onChange={(e) => {
                          setCari(e.target.value);
                        }}
                        placeholder="Search Doctor"
                        type="text"
                      />
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-send" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Button
                        color="primary"
                        onClick={() => {
                          setDataSelected([]);
                          setModal(true);
                        }}
                        className="ml-3"
                      >
                        Add
                      </Button>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Doctor</th>
                    <th scope="col">Address</th>
                    <th scope="col">Phone number</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter((e) => {
                      return (
                        e.doctor.toUpperCase().includes(cari.toUpperCase()) ||
                        e.address.toUpperCase().includes(cari.toUpperCase()) ||
                        e.phonenumber.toUpperCase().includes(cari.toUpperCase())
                      );
                    })
                    .map((e) => (
                      <tr>
                        <td>{e.doctor}</td>
                        <td>{e.address}</td>
                        <td>{e.phonenumber}</td>
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
                              <DropdownItem
                                onClick={() => {
                                  setDataSelected(e);
                                  setModal(true);
                                }}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  setDataSelected(e);
                                  setModalAction(true);
                                }}
                              >
                                Delete
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
                        e.address.toUpperCase().includes(cari.toUpperCase()) ||
                        e.phonenumber
                          .toUpperCase()
                          .includes(cari.toUpperCase()) ||
                        e.phonenumber.toUpperCase().includes(cari.toUpperCase())
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

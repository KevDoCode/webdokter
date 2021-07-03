import React, { useEffect, useState } from "react";

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

import DialogConfirm from "views/examples/DialogConfirm.js";
import { Redirect } from "react-router-dom";
// core components
import Header from "components/Headers/Header.js";
import { fetchget } from "variables/Data.js";
import { fetchdelete } from "variables/Data";
import { Link } from "react-router-dom";
const Appointment = () => {
  const [cari, setCari] = useState("");
  const [data, setData] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
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
            console.log(data.data);
            setData(data.data);
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  };

  const deleteItem = () => {
    fetchdelete("appointment/" + dataSelected.id)
      .then((res) => {
        if (localStorage.getItem("token") !== undefined) {
          localStorage.setItem("expired", "token expired");
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
      <Header />
      {auth && <Redirect to="/auth/admin/login" />}
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
                          Add
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
                            Doctor : <b>{e.doctor}</b>
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
                                  setDataSelected(e);
                                  setModalAction(true);
                                }}
                              >
                                Delete
                              </DropdownItem>
                              <Link to={"/admin/detail/" + e.id}>
                                <DropdownItem>Regisrant</DropdownItem>
                              </Link>
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

export default Appointment;

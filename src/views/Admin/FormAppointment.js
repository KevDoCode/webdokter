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
  CardBody,
} from "reactstrap";

import DialogConfirm from "views/examples/DialogConfirm.js";
import { Redirect } from "react-router-dom";
// core components
import Header from "components/Headers/Header.js";
import { fetchget } from "variables/Data.js";
import { fetchdelete, fetchpost, fetchput } from "variables/Data";
import Datetime from "react-datetime";
const Tables = (dataSelected = []) => {
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("12:00");
  const [idDoctor, setIdDoctor] = useState("");
  const [times, setTimes] = useState([]);
  const [duration, setDuration] = useState("1");

  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState("");
  const [modalAction, setModalAction] = useState(false);
  const [auth, setAuth] = useState(false);
  const [saved, setSaved] = useState(false);
  const checkForm = () => {
    let valid = true;
    if (desc === "") {
      valid = false;
      setDescError("Please fill description");
    } else {
      setDescError("");
    }
    if (valid) {
      saveData();
    }
  };

  const saveData = async () => {
    let body = {
      iddoctor: idDoctor,
      starttime: startTime,
      endtime: endTime,
      description: desc,
      duration: duration,
    };

    let response;
    if (dataSelected.location.state == undefined) {
      response = await fetchpost("appointment", body);
    } else {
      response = await fetchput(
        "appointment/" + dataSelected.location.state.data.id,
        body
      );
    }
    let jsonData = await response.json();
    if (response.status == 200) {
      setSaved(true);
    } else if (response.status == 401) {
      setAuth(true);
    } else {
    }
  };
  useEffect((e) => {
    fetchData();

    if (dataSelected.location.state != undefined) {
      setDesc(dataSelected.location.state.data.description);
      setIdDoctor(dataSelected.location.state.data.iddoctor);
      setDuration(dataSelected.location.state.data.duration);
      setStartTime(dataSelected.location.state.data.starttime.substring(0, 5));
      setEndTime(dataSelected.location.state.data.endtime.substring(0, 5));
    }
  }, []);

  const fetchData = () => {
    fetchget("dokter")
      .then((res) => {
        if (res.status == 401) {
          setAuth(true);
        }
        res
          .json()
          .then((data) => {
            if (data.data != undefined) {
              if (data.data.length > 0) {
                if (dataSelected.location.state != undefined) {
                  setIdDoctor(dataSelected.location.state.data.iddoctor);
                } else {
                  setIdDoctor(data.data[0].id);
                }
              }
              setData(data.data);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setTimeAppoint = () => {
    let start_time = parseTime(startTime),
      end_time = parseTime(endTime),
      interval = 1;

    try {
      interval = parseInt(duration);
    } catch (e) {}
    let times_ara = calculate_time_slot(start_time, end_time, interval);
    setTimes(times_ara);
  };

  function parseTime(s) {
    var c = s.split(":");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }

  function convertHours(mins) {
    var hour = Math.floor(mins / 60);
    var mins = mins % 60;
    var converted = pad(hour, 2) + ":" + pad(mins, 2);
    return converted;
  }

  function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  function calculate_time_slot(start_time, end_time, interval = "30") {
    var i, formatted_time;
    var time_slots = new Array();
    for (var i = start_time; i <= end_time; i = i + interval) {
      formatted_time = convertHours(i);
      time_slots.push(formatted_time);
    }
    return time_slots;
  }

  return (
    <>
      <Header />
      {auth && <Redirect to="/auth/login" />}
      {saved && <Redirect to="/admin/appoint" />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/*Modal*/}

        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
                {" "}
                <h2>Detail Appointment</h2>
                <FormGroup>
                  <small className="mt-3">Dokter</small>
                  <select
                    value={idDoctor}
                    onChange={(e) => {
                      setIdDoctor(e.target.value);
                    }}
                    className="form-control"
                  >
                    {data.map((e) => (
                      <option value={e.id}>{e.doctor}</option>
                    ))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <small>Description</small>
                  <Input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <small className="text-danger">{descError}</small>
                </FormGroup>
                <FormGroup>
                  <small>Duration</small>
                  <InputGroup>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => {
                        setDuration(
                          parseInt(e.target.value) ? e.target.value : "1"
                        );
                      }}
                    />
                    <InputGroupAddon color="primary">menit</InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <Row>
                  <Col>
                    <small>Start Time</small>
                    <Datetime
                      dateFormat={false}
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.format("HH:mm"));
                      }}
                      timeFormat="HH:mm"
                    />
                  </Col>
                  <Col>
                    <small>End Time</small>
                    <Datetime
                      dateFormat={false}
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.format("HH:mm"));
                      }}
                      timeFormat="HH:mm"
                    />
                  </Col>
                </Row>
                <Button
                  color="primary"
                  className="my-2 btn-block"
                  onClick={() => setTimeAppoint()}
                >
                  Run Simulation
                </Button>
                {times.length > 0 && <h4>List Schedule</h4>}
                <Row>
                  {times.map((e) => (
                    <Col md="3" sm="6">
                      <Card className="mt-1 " color="secondary">
                        <h4 color="white" className="text-center  mt-1">
                          {e}
                        </h4>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Button
                  color="success"
                  className="my-2 btn-block"
                  onClick={() => checkForm()}
                >
                  Save
                </Button>
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
      </Container>
    </>
  );
};

export default Tables;

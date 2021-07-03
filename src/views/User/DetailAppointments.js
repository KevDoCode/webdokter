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
import { Card, Col, Container, Row, Form, FormGroup, Button } from "reactstrap";

import { Redirect } from "react-router-dom";
// core components
import Header from "components/Headers/CommonHeader";
import { fetchget } from "variables/Userdata.js";
import { fetchpost } from "variables/Userdata";
import Datetime from "react-datetime";
import { useParams } from "react-router-dom";
import AfterModal from "components/modal/AfterModal";
const DetailAppointments = (route) => {
  const getNow = () => {
    let date = new Date();
    let day =
      date.getDate().toString().length === 1
        ? "0" + date.getDate()
        : date.getDate();
    let month =
      (date.getMonth() + 1).toString().length === 1
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let now = date.getFullYear() + "-" + month + "-" + day;
    return now;
  };

  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);
  const [timeSelected, setTimeSelected] = useState("");
  const [dateSelected, setDateSelected] = useState(getNow());
  const [agree, setAgree] = useState(false);
  const [modal, setModal] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [auth, setAuth] = useState(false);
  let { id } = useParams();
  useEffect((e) => {
    if (id === undefined) {
      route.history.goBack();
    }
    fetchData();
  }, []);

  const checkForm = () => {
    if (timeSelected === "") {
      setMsgError("Please Select Time Comes");
      setModal(true);
    } else if (dateSelected === "") {
      setMsgError("Please Select Time Comes");
      setModal(true);
    } else if (!agree) {
      setMsgError("Please Confirm Agreement");
      setModal(true);
    } else {
      postData();
    }
  };

  const postData = () => {
    let body = {
      username: localStorage.getItem("user_user"),
      idappointments: id,
      date_regist: getNow(),
      date_book: dateSelected,
      time_book: timeSelected,
      flagstatus: 1,
    };

    fetchpost("regis", body).then((e) => {
      if (e.status === 401) {
        if (localStorage.getItem("tokenuser") !== undefined) {
          localStorage.setItem("expired", "token expired");
        }
        setAuth(true);
      } else {
        e.json().then((jsonData) => {
          if (e.status === 200) {
            route.history.push("/user/dashboard");
          } else {
            let errors = "Sorry, ";
            jsonData.error.map((e) => {
              errors += e.message;
            });
            setMsgError(errors);
            setModal(true);
          }
        });
      }
    });
  };

  const fetchData = () => {
    fetchget("appointment/" + id)
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
        }
        res
          .json()
          .then((data) => {
            setData(data.data);
            setTimeAppoint(
              parseTime(data.data.starttime.substring(0, 5)),
              parseTime(data.data.endtime.substring(0, 5)),
              data.data.duration
            );
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  };

  const setTimeAppoint = (start_time, end_time, interval) => {
    let times_ara = calculate_time_slot(start_time, end_time, interval);

    setTime(times_ara);
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
      <Header data={data} />
      {auth && <Redirect to="/auth/user/login" />}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <AfterModal
          modal={modal}
          setModal={setModal}
          heeader="Error"
          msg={msgError}
        />
        <Row>
          <div className="col">
            <Card className="shadow  py-4 px-2">
              <Container>
                <h3>Form Registrant</h3>
                <Form>
                  <small>Date Comes</small>
                  <Datetime
                    input={false}
                    value={dateSelected}
                    onChange={(e) => setDateSelected(e.format("YYYY-MM-DD"))}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                  />

                  <FormGroup className="mt-2">
                    <small>Time Comes</small>
                    <Row>
                      {time.map((e) => (
                        <Col xl="3" md="6" xs="6">
                          <Button
                            style={{ fontSize: 13 }}
                            color="danger"
                            outline={e.substring(0, 5) !== timeSelected}
                            onClick={(a) => {
                              a.preventDefault();
                              setTimeSelected(e.substring(0, 5));
                            }}
                            className="mr-1 mt-2 btn-block"
                          >
                            {e.substring(0, 5)}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                    <div className="custom-control custom-checkbox mt-5 my-3">
                      <input
                        className="custom-control-input"
                        id="customCheck2"
                        type="checkbox"
                        onChange={(e) => setAgree(e.target.checked)}
                        defaultChecked={agree}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck2"
                      >
                        I Agree with this registration and will be come in date
                      </label>
                    </div>
                    <Button
                      color="success"
                      className="btn-block mt-2"
                      onClick={(e) => checkForm()}
                    >
                      Confirm
                    </Button>
                  </FormGroup>
                </Form>
              </Container>
            </Card>
          </div>
        </Row>

        {/* Dark table */}
      </Container>
    </>
  );
};

export default DetailAppointments;

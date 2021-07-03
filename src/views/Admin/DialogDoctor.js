import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Button, Modal } from "reactstrap";
import { Redirect } from "react-router-dom";
import { fetchput } from "variables/Data";
import { fetchpost } from "variables/Data";
const DialogDoctor = ({ modal, setModal, data = [], fetchdata }) => {
  useEffect(() => {
    setDoctor(data.doctor !== undefined ? data.doctor : "");
    setPhone(data.phonenumber !== undefined ? data.phonenumber : "");
    setAddress(data.address !== undefined ? data.address : "");
  }, [data]);
  const [doctor, setDoctor] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [doctorError, setDoctorError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [auth, setAuth] = useState(false);

  const checkForm = () => {
    let valid = true;
    if (doctor === "") {
      valid = false;
      setDoctorError("Please fill doctor");
    } else {
      setDoctorError("");
    }
    if (address === "") {
      valid = false;
      setAddressError("Please fill doctor address");
    } else {
      setAddressError("");
    }
    if (phone === "") {
      valid = false;
      setPhoneError("Please fill doctor phone");
    } else {
      setPhoneError("");
    }

    if (valid) {
      saveData();
    }
  };

  const saveData = async () => {
    let body = {
      doctor: doctor,
      address: address,
      phonenumber: phone,
    };
    let response;
    if (data.id == undefined) {
      response = await fetchpost("dokter", body);
    } else {
      response = await fetchput("dokter/" + data.id, body);
    }
    let jsonData = await response.json();
    if (response.status === 200) {
      fetchdata();
      setModal(false);
    } else if (response.status == 401) {
      if (localStorage.getItem("token") !== undefined) {
        localStorage.setItem("expired", "token expired");
      }
      setAuth(true);
    } else {
      jsonData.error.map((e) => {
        if (e.field === "doctor") {
          setDoctorError(e.message);
        } else if (e.field === "phonenumber") {
          setPhoneError(e.message);
        } else if (e.field === "address") {
          setAddressError(e.message);
        }
      });
    }
  };
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={modal}
      toggle={() => setModal(false)}
    >
      {auth && <Redirect to="/auth/admin/login" />}
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Form Doctor
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => setModal(false)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Form>
          <FormGroup>
            <small>Doctor Name</small>
            <Input value={doctor} onChange={(e) => setDoctor(e.target.value)} />
            <small className="text-danger">{doctorError}</small>
          </FormGroup>
          <FormGroup>
            <small>Address</small>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <small className="text-danger">{addressError}</small>
          </FormGroup>
          <FormGroup>
            <small>Phone</small>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            <small className="text-danger">{phoneError}</small>
          </FormGroup>
        </Form>
      </div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => setModal(false)}
        >
          Close
        </Button>
        <Button
          color="primary"
          onClick={() => {
            checkForm();
          }}
          type="button"
        >
          Save changes
        </Button>
      </div>
    </Modal>
  );
};

export default DialogDoctor;

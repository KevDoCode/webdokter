import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
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
const DialogConfirm = ({ modal, setModal, action }) => {
  return (
    <Modal
      className="modal-dialog-centered modal-primary"
      contentClassName="bg-gradient-primary"
      isOpen={modal}
      toggle={() => setModal(false)}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Confirmation
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
      <div className="modal-body ">
        <h2 className="text-white">Confirmation</h2>
        <h3 className="text-white">Are you sure for continue this action</h3>
      </div>
      <div className="modal-footer">
        <Button
          color="danger"
          data-dismiss="modal"
          type="button"
          onClick={() => setModal(false)}
        >
          No
        </Button>
        <Button
          color="success"
          onClick={() => {
            action();
            setModal(false);
          }}
          type="button"
        >
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default DialogConfirm;

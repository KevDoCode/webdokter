import React from "react";
import { Modal, Button } from "reactstrap";

const AfterModal = ({
  modal = false,
  setModal,
  header = "YOU SHOULD READ THIS !",
  msg = "Error",
  status = "danger",
}) => {
  return (
    <Modal
      className={"modal-dialog-centered modal-" + status}
      contentClassName={"bg-gradient-" + status}
      isOpen={modal}
      toggle={() => setModal(false)}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-notification"></h6>
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
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <h4 className="heading mt-4">{header}</h4>
          <p>{msg}</p>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          className="text-white ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={() => setModal(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default AfterModal;

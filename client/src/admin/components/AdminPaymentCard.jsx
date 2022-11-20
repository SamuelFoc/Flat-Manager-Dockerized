import React from "react";
import "./styles/AdminPaymentCard.css";
import "./styles/AdminPaymentCard_phone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const PaymentCard = (props) => {
  return (
    <div className="adminPaymentCard medium-text m-1">
      <div className="row align-items-center text-center">
        <div
          className={
            props?.info?.isDefault
              ? "col-12 col-md-2 text-warning"
              : "col-12 col-md-2 text-secondary"
          }
        >
          <FontAwesomeIcon icon={faUser} />
          <span>&ensp;{props?.info?.user}</span>
        </div>
        <div className="phoneCardText col-12 col-md-5">
          IBAN: {props?.info?.iban}
        </div>
        <div className="phoneCardText col-12 col-md-2">
          CC: {props?.info?.currency}
        </div>
        <div className="phoneCardText col-12 col-md-3 align-items-center d-flex justify-content-md-end justify-content-center">
          <button
            type="button"
            className="btn btn-outline-warning ms-md-4"
            onClick={() => props.showForm(props?.info?.user)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-4"
            onClick={() => props.handleDelete(props?.info?.user)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;

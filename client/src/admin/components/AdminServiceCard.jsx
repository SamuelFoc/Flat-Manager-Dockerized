import React from "react";
import "./styles/AdminServiceCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = (props) => {
  return (
    <div className="adminServiceCard medium-text m-1">
      <div className="row align-items-center text-center">
        <div className="phoneCardText col-12 col-md-3">
          <span className="my-2">
            <FontAwesomeIcon icon={faCalendarCheck} />
            &emsp;
            {new Date(props?.info?.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="phoneCardText col-12 col-md-2">{props?.info?.name}</div>
        <div className="phoneCardText col-12 col-md-4">
          {props?.info?.unit_price
            ? props?.info?.unit_price
            : props?.info?.monthly_price}
          &ensp;
          {`CZK${
            props?.info?.unit
              ? `/${props?.info?.unit}`
              : ` payed by ${props?.info?.pay_day}th`
          }`}
        </div>
        <div className="col-12 col-md-3 align-items-center d-flex justify-content-md-end justify-content-center">
          <button
            type="button"
            className="btn btn-outline-warning ms-4"
            onClick={() => props.showForm(props?.info?.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-4"
            onClick={() => props.handleDelete(props?.info?.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

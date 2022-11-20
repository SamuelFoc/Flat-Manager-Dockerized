import React from "react";
import "./styles/AdminEnergyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function EnergyCard(props) {
  return (
    <div className="adminEnergyCard medium-text m-1">
      <div className="row align-items-center text-center">
        <div className="phoneCardText col-12 col-md-3">
          <span className="my-2">
            <FontAwesomeIcon icon={faCalendarPlus} />
            &emsp;
            {new Date(props.info.measured_at).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="phoneCardText col-12 col-md-2 ">{props.info.type}</div>
        <div className="phoneCardText col-12 col-md-3">
          <FontAwesomeIcon icon={faRuler} />
          &emsp;{props.info.measured_value}&ensp;
          {props.type === "water" || props.type === "gas" ? (
            <span className="m-0">
              m<sup>3</sup>
            </span>
          ) : (
            "kWh"
          )}
        </div>
        <div className="phoneCardText col-12 col-md-4 align-items-center d-flex justify-content-md-end justify-content-center">
          <button
            type="button"
            className="btn btn-outline-warning ms-md-4"
            onClick={() => props.showForm(props?.info?.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-4"
            onClick={() => props.handleDelete(props.info.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
}

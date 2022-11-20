import React from "react";
import "./styles/EnergyCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

export default function EnergyCard(props) {
  return (
    <div className="energyCard m-1">
      <div className="row energyCardText text-center">
        <div className="col-12 col-md-5">
          <span>
            <FontAwesomeIcon
              icon={faCalendarPlus}
              className="energyCardSubIcon"
            />
            &emsp;
            {new Date(props?.info?.measured_at).toLocaleDateString("en-GB", {
              dateStyle: "medium",
            })}
          </span>
        </div>
        <div className="col-6 col-md-2 align-items-center">
          {props?.info?.type}
        </div>
        <div className="col-6 col-md-5 align-items-center d-flex justify-content-md-end">
          <FontAwesomeIcon icon={faRuler} className="energyCardSubIcon" />
          <span className="d-flex align-items-center">
            &emsp;{props?.info?.measured_value}&ensp;
            {props?.type === "water" || props?.type === "gas" ? (
              <p className="m-0">
                m<sup>3</sup>
              </p>
            ) : (
              "kWh"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

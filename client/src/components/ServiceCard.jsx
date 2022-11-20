import React from "react";
import "./styles/ServiceCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = (props) => {
  return (
    <div className="serviceCard">
      <h5 className="serviceCardTitle">{props?.info?.name}</h5>
      <div className="d-flex align-items-center serviceCardText">
        <FontAwesomeIcon icon={faMoneyBill} className="serviceCardSubIcon" />{" "}
        &emsp;{" "}
        {props?.info?.monthly_price
          ? props?.info?.monthly_price
          : props?.info?.unit_price}{" "}
        CZK {props?.info?.unit ? `/${props.info.unit}` : ""}
      </div>
      {props?.info?.pay_day ? (
        <div className="d-flex align-items-center serviceCardText">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="serviceCardSubIcon"
          />{" "}
          &emsp; Pay by {props?.info?.pay_day}
          <sup>th</sup>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ServiceCard;

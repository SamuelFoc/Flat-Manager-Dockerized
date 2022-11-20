import React from "react";
import "./styles/UserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function UserCard(props) {
  return (
    <div className="userCard p-3 my-2 mx-3">
      <div className="d-flex">
        <div to="/" className="text-center m-2 me-3">
          {props?.info?.isAdmin ? (
            <FontAwesomeIcon icon={faUserLock} className="userCardIcon" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="userCardIcon" />
          )}
        </div>
        <div>
          <div className="userCardInfoBox">
            <h6 className="userCardTitle">{props?.info?.username}</h6>
            <p className="userCardText">{props?.info?.age} years</p>
            <p className="userCardText">Working at {props?.info?.work}</p>
          </div>
        </div>
      </div>
      <div className="p-0">
        <FontAwesomeIcon icon={faMobile} className="userCardSubIcon" />
        <strong className="userCardText">{props?.info?.contact}</strong>
      </div>
      <div>
        <FontAwesomeIcon icon={faEnvelope} className="userCardSubIcon" />
        <strong className="userCardText">{props?.info?.email}</strong>
      </div>
    </div>
  );
}

export default UserCard;

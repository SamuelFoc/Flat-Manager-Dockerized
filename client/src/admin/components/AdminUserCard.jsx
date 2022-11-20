import React from "react";
import "./styles/AdminUserCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const UserCard = (props) => {
  return (
    <div className="adminServiceCard medium-text m-1">
      <div className="row align-items-center text-center">
        <div className="phoneCardText col-12 col-md-2">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="phoneCardText col-12 col-md-4">
          {props?.info?.username}
        </div>
        <div className="phoneCardText col-12 col-md-2">
          {new Date(props?.info?.createdAt)?.toLocaleDateString("en-GB") +
            ", " +
            new Date(props?.info?.createdAt)?.toLocaleTimeString("en-GB")}
        </div>
        <div className="phoneCardText col-12 col-md-4 align-items-center d-flex justify-content-md-end justify-content-center">
          <button
            type="button"
            className="btn btn-outline-warning ms-md-4"
            onClick={() => props.showForm(props?.info?.username)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-4"
            onClick={() => props.handleDelete(props?.info?.username)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

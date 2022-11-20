import React from "react";
// * Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles/RespCard.css";

function RespCard(props) {
  const checkClass = (data) => {
    let myClass;

    if (data === "CRITICAL") {
      myClass = " criticalResp";
    } else if (data === "HIGH") {
      myClass = " highResp";
    } else if (data === "LOW") {
      myClass = " lowResp";
    } else {
      myClass = "";
    }

    return myClass;
  };

  return (
    <div className="respCard">
      <div className="d-flex">
        <div className={"col-6 respCardTitle" + checkClass(props.info.urgent)}>
          <h6 className="my-2">
            {props.info.title}
            <FontAwesomeIcon
              icon={props.info.done ? faCheck : faXmark}
              className={
                props.info.done
                  ? "ms-2 respDoneIcon-check"
                  : "ms-2 respDoneIcon-cross"
              }
            />
          </h6>
        </div>
        <div className="col-6 d-flex justify-content-end respCardBtns">
          {props.info.done ? (
            <button
              className="btn-custom-edit"
              onClick={() => props.handleEdit(props.info.id, props.info.done)}
            >
              <FontAwesomeIcon icon={faRepeat} className="respCardSubIcon" />
            </button>
          ) : (
            <button
              className="btn-custom-success"
              onClick={() => props.handleEdit(props.info.id, props.info.done)}
            >
              <FontAwesomeIcon icon={faCheck} className="respCardSubIcon" />
            </button>
          )}
          <button
            className="btn-custom-delete mx-1"
            onClick={() => props.handleDelete(props.info.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="respCardSubIcon" />
          </button>
        </div>
      </div>
      <div className="row d-flex align-items-center">
        <div className="col-12 col-md-7 respCardText text-start">
          {props.info.description}
        </div>
        <div
          className={
            "col-12 col-md-5 text-end pe-3 pt-1 respCardHighlight" +
            checkClass(props.info.urgent)
          }
        >
          Deadline: {new Date(props.info.deadline).toLocaleDateString("cs-CZ")}
        </div>
      </div>
    </div>
  );
}

export default RespCard;

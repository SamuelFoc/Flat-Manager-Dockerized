import React from "react";
import "./styles/ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ProductCard(props) {
  return (
    <div className="productCard p-3 mx-3 my-2 position-relative">
      <div className="d-flex">
        <div className="text-center m-2 me-3">
          <FontAwesomeIcon icon={faTag} className="productCardIcon" />
        </div>
        <div>
          <h6 className="productCardTitle">{props.info.name.toUpperCase()}</h6>
          <p className="productCardText">{props.info.type}</p>
          <p className="productCardText">~{props.info.price}CZK</p>
        </div>
      </div>
      <div className="p-0 d-flex">
        <strong className="productCardSubTitle">For: </strong>
        <p className="productCardText">
          {props.info.ownership === "every"
            ? "Everybody"
            : props.info.ownership}
        </p>
      </div>
      <div>
        <FontAwesomeIcon icon={faTruckFast} className="productCardSubIcon" />
        <strong className="productCardHighlight">{props.info.urgent}</strong>
      </div>
      <div className="productCardBtnBox">
        <FontAwesomeIcon
          icon={faEdit}
          className="btn-custom-edit"
          onClick={() => props.handleEdit(props.info.id)}
        />
        <FontAwesomeIcon
          icon={faCheck}
          className="ms-2 btn-custom-success"
          onClick={() => props.handleDelete(props.info.id)}
        />
      </div>
    </div>
  );
}

export default ProductCard;

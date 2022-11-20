import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles/PaymentCard.css";

const PaymentCard = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [isOpen, setIsOpen] = useState();
  const [src, setSrc] = useState("");
  const [dateDiff, setDateDiff] = useState();
  const [showQR, setShowQR] = useState(false);
  const { auth } = useAuth();

  // Payment Card open/close function
  const openPayment = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Set how long is from last payment transaction
  useEffect(() => {
    // Set date difference between today and last payment
    setDateDiff((new Date() - new Date(props?.info?.last_paid)) / 86400000);

    // Create QR code for payment
    const objectQR = {
      ACC: props?.info?.iban?.replace(/\s/g, ""),
      AM: props?.info?.am,
      CC: props?.info?.cc,
      SS: props?.info?.ss,
      VS: props?.info?.vs,
      DT: new Date().toLocaleDateString("en-GB").split("/").reverse().join(""),
      RN: props?.info?.rn,
      MSG: props?.info?.msg,
    };

    const arrayQR = ["SPD*1.0"];

    arrayQR.push(
      Object.keys(objectQR)
        .map((key) => {
          if (key === "VS" || key === "SS") {
            return "X-" + key + ":" + objectQR[key];
          } else {
            return key + ":" + objectQR[key];
          }
        })
        .join("*")
    );

    const stringQR = arrayQR.join("*");

    QRCode.toDataURL(stringQR).then(setSrc);
  }, [props]);

  // Pay this payment
  const pay = (id) => {
    if (!id || !auth.user) {
      props.msg("Unathorized access to payments, payment denied.");
    }
    axiosPrivate
      .put(`/payments/${id}`, {
        last_paid: new Date(),
      })
      .then(() => {
        props.msg(
          `Payment ${
            props?.info?.title
          } registered on ${new Date().toLocaleDateString("en-GB")}.`
        );
      })
      .catch((err) => {
        props.msg(`Payment failed due to ${err.message}.`);
      });
  };

  // Delete this payment
  const deletePayment = (id) => {
    if (!id || !auth.user) {
      props.msg("Unathorized access to payments, deletion denied.");
    }
    axiosPrivate
      .delete(`/payments/${id}`, {
        last_paid: new Date(),
      })
      .then(() => {
        props.msg(
          `Payment ${
            props?.info?.title
          } deleted at ${new Date().toLocaleDateString("en-GB")}.`
        );
      })
      .catch((err) => {
        props.msg(`Payment deletion failed due to ${err.message}.`);
      });
  };

  return (
    <div className="d-flex m-2 justify-content-center">
      {isOpen ? (
        <div className="openedPayment">
          <div className="d-flex justify-content-between">
            <h4 className="paymentCardTitle fw-bold">{props?.info?.title}</h4>
            <div>
              <button className="btn btn-outline-warning me-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => props.handleEdit(props?.info?.id)}
                />
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deletePayment(props?.info?.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
          <div className="openedPaymentConatainer">
            <div>
              <strong>Description:&ensp;</strong>
              <span>{props?.info?.description}</span>
            </div>
            <div className="ms-4">
              <strong>IBAN:&ensp;</strong>
              <span>{props?.info?.iban}</span>
            </div>
            <div className="ms-4">
              <strong>SS:&ensp;</strong>
              <span>{props?.info?.ss}</span>
            </div>
            <div className="ms-4">
              <strong>VS:&ensp;</strong>
              <span>{props?.info?.vs}</span>
            </div>
            <div className="ms-4">
              <strong>RN:&ensp;</strong>
              <span>{props?.info?.rn}</span>
            </div>
            <div className="ms-4">
              <strong>MSG:&ensp;</strong>
              <span>{props?.info?.msg}</span>
            </div>
            <div>
              <strong>Ammount:&ensp;</strong>
              <span>{props?.info?.am}&ensp;CZK</span>
            </div>
            <div>
              <strong>Currency:&ensp;</strong>
              <span>{props?.info?.cc}&ensp;CZK</span>
            </div>
            <div>
              <strong>Last paid:&ensp;</strong>
              <span>
                {new Date(props?.info?.last_paid)?.toLocaleDateString("cs-CZ")}
              </span>
            </div>

            <div className="d-flex justify-content-center">
              {dateDiff > 25 || showQR ? (
                <img className="qrcodeImg" src={src} alt="qr-code" />
              ) : (
                <span className="alreadyPaid">Already Paid ✔️</span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-warning" onClick={openPayment}>
              Close
            </button>
            {dateDiff > 25 ? (
              <button
                className="ms-4 btn btn-outline-success"
                onClick={() => {
                  setShowQR(false);
                  pay(props?.info?.id);
                }}
              >
                Pay
              </button>
            ) : (
              <button
                className="ms-4 btn btn-outline-primary"
                onClick={() => setShowQR(!showQR)}
              >
                Show QR
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="payment display-4" onClick={openPayment}>
          <FontAwesomeIcon icon={faCoins} />
          <h5 className="mt-2">{props?.info?.title}</h5>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;

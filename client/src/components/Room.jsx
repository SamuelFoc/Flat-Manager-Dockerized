import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "./styles/Room.css";

const Room = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [room, setRoom] = useState();
  const [src, setSrc] = useState("");
  const [dateDiff, setDateDiff] = useState();
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const getRoom = async () => {
      const result = await axiosPrivate.get(`/rooms/${props.name}/`);
      setRoom(result.data);
      setDateDiff((new Date() - new Date(result.data.paid_on)) / 86400000);
    };
    getRoom();
  }, [axiosPrivate, props.name, props.msg]);

  useEffect(() => {
    const getPayment = async () => {
      let paymentData = await axiosPrivate("/paymentAccounts/");
      paymentData = paymentData.data.data[0];
      const qrText = `SPD*1.0*ACC:${paymentData?.iban?.replace(/\s/g, "")}*AM:${
        room?.cost
      }*CC:${paymentData?.currency}*MSG:Rent from ${props?.name}.`;
      QRCode.toDataURL(qrText).then(setSrc);
    };
    getPayment();
  }, [axiosPrivate, props?.name, room?.cost]);

  return (
    <div className="d-flex justify-content-center">
      {props.opened ? (
        <div className="openedRoom">
          <h4>Room {props.name}</h4>
          <div className="openedRoomConatainer">
            <div>
              <strong>People:&ensp;</strong>
              <span>{room?.livings}</span>
            </div>
            <div>
              <strong>Services:&ensp;</strong>
              {room?.units?.map((unit, i) => (
                <div key={i} className="ms-4">
                  <strong>{unit.name}:&ensp;</strong>
                  <span>{unit.price}&ensp;CZK</span>
                </div>
              ))}
              <hr className="m-0 mx-3" />
              <div className="ms-4 mb-2">
                <strong>Sum:&ensp;</strong>
                <span>{room?.units_total}&ensp;CZK</span>
              </div>
            </div>
            <div>
              <strong>Services paid by me:&ensp;</strong>
              {room?.my_units?.map((unit, i) => (
                <div key={i} className="ms-4">
                  <strong>{unit.name}:&ensp;</strong>
                  <span>{unit.price}&ensp;CZK</span>
                </div>
              ))}
              <hr className="m-0 mx-3" />
              <div className="ms-4 mb-2">
                <strong>Sum:&ensp;</strong>
                <span>{room?.units_paid_by_me}&ensp;CZK</span>
              </div>
            </div>
            <div className="mb-2">
              <strong>To pay:&ensp;</strong>
              <div className="ms-4">
                <strong>{room?.units_total}</strong>
                <br />
                <strong>-{room?.units_paid_by_me}</strong>
                <br />
                <hr className="m-0 me-5" />
                <span>{room?.arrears}&ensp;CZK</span>
              </div>
            </div>
            <div className="mb-2">
              <strong>Rent:&ensp;</strong>
              <span>{room?.rent}&ensp;CZK</span>
            </div>
            <div className="mb-2">
              <strong>Pay together:&ensp;</strong>
              <div className="ms-4">
                <strong>{room?.rent}</strong>
                <br />
                <strong>{room?.arrears}</strong>
                <br />
                <hr className="m-0 me-5" />
                <span>{room?.cost}&ensp;CZK</span>
              </div>
            </div>
            <div>
              <strong>Last paid:&ensp;</strong>
              <span>
                {new Date(room?.paid_on)?.toLocaleDateString("cs-CZ")}
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
          <button
            className="btn btn-outline-warning"
            onClick={() => props.openRoom(props.name, room?.living_names)}
          >
            Close Room
          </button>
          {dateDiff > 25 ? (
            <button
              className="ms-4 btn btn-outline-success"
              onClick={() => {
                setShowQR(false);
                props.pay(props.name);
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
      ) : (
        <div
          className="room display-4"
          onClick={() => props.openRoom(props.name, room?.living_names)}
        >
          <FontAwesomeIcon icon={faBed} />
          <h3 className="mt-2">{props.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Room;

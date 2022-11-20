import { useState, useEffect } from "react";
import Users from "./components/Users";
import Energies from "./components/Energies";
import Units from "./components/Units";
import Rooms from "./components/Rooms";
import Payments from "./components/Payments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./Admin.css";
import "./Admin_phone.css";
import { axiosPrivate } from "../api/axios";
import Services from "./components/Services";
// AXIOS SET

const Admin = () => {
  const [newError, setNewError] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [energy, setEnergy] = useState("");
  const [service, setService] = useState("");
  const [unit, setUnit] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    const getData = async () => {
      await axiosPrivate.get("/admin/paymentAccounts").then((payments) => {
        setPayment(payments.data.data);
      });
      await axiosPrivate.get("/admin/energies").then((energies) => {
        setEnergy(energies.data.data);
      });
      await axiosPrivate.get("/admin/services").then((services) => {
        setService(services.data.data);
      });
      await axiosPrivate.get("/admin/users").then((users) => {
        setUser(users.data.data);
      });
      await axiosPrivate.get("/admin/rooms").then((rooms) => {
        setRoom(rooms.data.data);
      });
      await axiosPrivate.get("/admin/units").then((units) => {
        setUnit(units.data.data);
      });
    };

    getData();
  }, [newMsg]);

  const hideError = () => {
    setNewError("");
  };
  const hideSuccess = () => {
    setNewMsg("");
  };

  return (
    <section className="adminMainSection container-fluid">
      <div className="adminMsgBox">
        <h4 className="text-light">
          {newMsg || newError ? (
            ""
          ) : (
            <p className="p-2 mt-2 adminMessage">No messages</p>
          )}
        </h4>
        <div
          className={
            newError ? "alert alert-danger" : "alert alert-danger collapse"
          }
          role="alert"
        >
          {newError}
          <FontAwesomeIcon
            icon={faXmark}
            className="xMark"
            onClick={hideError}
          />
        </div>
        <div
          className={
            newMsg ? "alert alert-success" : "alert alert-success collapse"
          }
          role="alert"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="xMark-success"
            onClick={hideSuccess}
          />
          {newMsg}
        </div>
      </div>
      <div className="adminBox">
        <Payments
          payments={payment}
          showMsg={setNewMsg}
          addError={setNewError}
        />
      </div>
      <div className="adminBox">
        <Users users={user} showMsg={setNewMsg} addError={setNewError} />
      </div>
      <div className="adminBox">
        <Rooms rooms={room} showMsg={setNewMsg} addError={setNewError} />
      </div>
      <div className="adminBox">
        <Services
          services={service}
          showMsg={setNewMsg}
          addError={setNewError}
        />
      </div>
      <div className="adminBox">
        <Units units={unit} showMsg={setNewMsg} addError={setNewError} />
      </div>
      <div className="adminBox">
        <Energies
          energies={energy}
          showMsg={setNewMsg}
          addError={setNewError}
        />
      </div>
    </section>
  );
};

export default Admin;

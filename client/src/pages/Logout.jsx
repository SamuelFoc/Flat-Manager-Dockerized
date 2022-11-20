import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
// *Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
// * Components
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

// TODO: CSS
import "./styles/Logout.css";

const Logout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("/logout").then(() => {
      setAuth({});
    });
  }, [axiosPrivate, setAuth]);

  return (
    <div className="logoutMainSection">
      <h1 className="logoutMainTitle">You've been logged out..</h1>
      <FontAwesomeIcon className="logoutMainIcon" icon={faArrowTurnUp} />
      <NavLink className="d-flex align-items-center" to="/admin">
        <button className="btn btn-success logoutMainButton">
          Go to Log In..
        </button>
      </NavLink>
    </div>
  );
};

export default Logout;

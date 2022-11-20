import React from "react";
// * Icons
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameSimple } from "@fortawesome/free-solid-svg-icons";
import { faBellConcierge } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

// TODO: CSS
import "./styles/UserHome.css";

export default function Home() {
  return (
    <div className="userHomeMainSection mt-5 py-5">
      {/* USERS */}
      <Link to="/users" className="userHomeItem mx-3 mt-4 text-center">
        <FontAwesomeIcon
          icon={faUsers}
          className="userHomeItemIcon display-5 mt-5"
        />
        <h6 className="userHomeSubTitle">My Roommates</h6>
      </Link>

      {/* SHOPPING LIST */}
      <Link to="/shoppingList" className="userHomeItem mx-3 mb-4 text-center">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="userHomeItemIcon display-5 mt-5"
        />
        <h6 className="userHomeSubTitle">Shopping List</h6>
      </Link>

      {/* RESPONSIBILITIES */}
      <Link
        to="/responsibilities"
        className="userHomeItem mx-3 mt-4 text-center"
      >
        <FontAwesomeIcon
          icon={faBriefcase}
          className="userHomeItemIcon display-5 mt-5"
        />
        <h6 className="userHomeSubTitle">My Responsibilities</h6>
      </Link>

      {/* EVENTS */}
      <Link to="/events" className="userHomeItem mx-3 mb-4 text-center">
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="userHomeItemIcon display-5 mt-5"
        />
        <h6 className="userHomeSubTitle">Events</h6>
      </Link>

      {/* ENERGIES */}
      <Link to="/energies" className="userHomeItem mx-3 mt-4 text-center">
        <FontAwesomeIcon
          icon={faFireFlameSimple}
          className="userHomeItemIcon display-5 mt-5"
        />
        <h6 className="userHomeSubTitle">Energies</h6>
      </Link>

      {/* STATISTICS */}
      <Link to="/statistics" className="userHomeItem mx-3 mb-4 text-center">
        <FontAwesomeIcon
          icon={faChartLine}
          className="userHomeItemIcon display-5 mt-5"
        />
        <h6 className="userHomeSubTitle">Statistics</h6>
      </Link>

      {/* SERVICES */}
      <Link to="/services" className="userHomeItem mx-3 mt-4 text-center">
        <FontAwesomeIcon
          icon={faBellConcierge}
          className="userHomeItemIcon display-5 mt-5"
        />
        <h6 className="userHomeSubTitle">Services</h6>
      </Link>
    </div>
  );
}

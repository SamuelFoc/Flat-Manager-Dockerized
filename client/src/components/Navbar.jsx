import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "./styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { faFireFlameSimple } from "@fortawesome/free-solid-svg-icons";
import { faBellConcierge } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div>
      <nav>
        <div className="d-flex align-items-center">
          <Logo className="m-5" />
          <NavLink to="/" className="navbarTitle ms-3">
            Flat Manager
          </NavLink>
        </div>

        <ul className="text-light d-flex align-items-center m-2">
          <NavLink to="/admin">
            <FontAwesomeIcon icon={faLock} className="nav-item mx-3" />
          </NavLink>
          <NavLink to="/users">
            <FontAwesomeIcon icon={faUsers} className="nav-item mx-3" />
          </NavLink>
          <NavLink to="/rooms">
            <FontAwesomeIcon icon={faCouch} className="nav-item mx-3" />
          </NavLink>
          <NavLink to="/shoppingList">
            <FontAwesomeIcon icon={faCartShopping} className="nav-item mx-3" />
          </NavLink>
          <NavLink to="/responsibilities">
            <FontAwesomeIcon icon={faBriefcase} className="nav-item mx-3" />
          </NavLink>
          <NavLink to="/mypayments">
            <FontAwesomeIcon icon={faMoneyBillWave} className="nav-item mx-3" />
          </NavLink>
          <NavLink to="/energies">
            <FontAwesomeIcon
              icon={faFireFlameSimple}
              className="nav-item mx-3"
            />
          </NavLink>
          <NavLink to="/statistics">
            <FontAwesomeIcon icon={faChartBar} className="nav-item mx-3" />
          </NavLink>
          <NavLink to="/services">
            <FontAwesomeIcon
              icon={faBellConcierge}
              className="nav-item  mx-3 ring"
            />
          </NavLink>
          <NavLink to="/logout">
            <FontAwesomeIcon icon={faSignOut} className="nav-item my-3" />
          </NavLink>
        </ul>
      </nav>
      <aside>
        <ul className="text-light align-items-center pt-3">
          <NavLink to="/admin">
            <FontAwesomeIcon icon={faLock} className="nav-item my-1 mx-2" />
          </NavLink>
          <NavLink to="/users">
            <FontAwesomeIcon icon={faUsers} className="nav-item my-1 mx-2" />
          </NavLink>
          <NavLink to="/rooms">
            <FontAwesomeIcon icon={faCouch} className="nav-item my-1 mx-2" />
          </NavLink>
          <NavLink to="/shoppingList">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="nav-item my-1 mx-2"
            />
          </NavLink>
          <NavLink to="/responsibilities">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="nav-item my-1 mx-2"
            />
          </NavLink>
          <NavLink to="/mypayments">
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              className="nav-item my-1 mx-2"
            />
          </NavLink>
          <NavLink to="/energies">
            <FontAwesomeIcon
              icon={faFireFlameSimple}
              className="nav-item my-1 mx-2"
            />
          </NavLink>
          <NavLink to="/statistics">
            <FontAwesomeIcon icon={faChartBar} className="nav-item my-1 mx-2" />
          </NavLink>
          <NavLink to="/services">
            <FontAwesomeIcon
              icon={faBellConcierge}
              className="nav-item  my-1 mx-2 ring"
            />
          </NavLink>
          <NavLink to="/logout">
            <FontAwesomeIcon icon={faSignOut} className="nav-item my-1 mx-2" />
          </NavLink>
        </ul>
      </aside>
    </div>
  );
}

export default Navbar;

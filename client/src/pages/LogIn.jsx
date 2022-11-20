import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
// * Components
import useAuth from "../hooks/useAuth";
import Logo from "../components/LoginLogo";

// TODO: CSS
import "./styles/Login.css";

// TODO: AXIOS SET
import axios from "../api/axios";
const LOGIN_URL = "/login";

const LogIn = () => {
  // TODO: STATES
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TODO: FETCH DATA
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      setIsLoading(false);
      errRef.current.focus();
    }
  };

  return (
    <section className="loginMainSection">
      <div className="loginBackgroundText">
        <h1>FLAT MANAGER</h1>
      </div>
      <Logo />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
        <i className="xMark" onClick={() => setErrMsg(false)}>
          ×
        </i>
      </p>
      <h1 className="loginMainTitle">Log In</h1>
      <form onSubmit={handleSubmit} className="loginMainContainer">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          ref={userRef}
          className="form-control mb-2"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        {isLoading ? (
          <button className="btn btn-primary mt-4">
            <span
              className="spinner-border spinner-border-sm me-4"
              role="status"
              aria-hidden="true"
            ></span>
            Loging In...
          </button>
        ) : (
          <button className="btn btn-primary mt-4">Log In</button>
        )}
      </form>
    </section>
  );
};

export default LogIn;

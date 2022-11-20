import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// * Components
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserCard from "../components/UserCard";

// TODO: CSS
import "./styles/Users.css";

export default function Home() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        isMounted && setUsers(response.data.data);
      } catch (err) {
        console.log(err);
        navigate("/home", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <div className="usersMainSection">
      <div className="ps-2">
        <h3 className="m-2 custom-pill-box">All accommodated</h3>
      </div>
      <div className="usersMainContainer">
        {users?.length ? (
          users.map((user, i) => <UserCard key={i} info={user} />)
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </div>
  );
}

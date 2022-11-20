import Room from "../components/Room";
import React from "react";
import "./styles/Rooms.css";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Rooms = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [openedRooms, setOpenedRooms] = useState([]);
  const [rooms, setRooms] = useState();
  const [msg, setMsg] = useState({ status: true, message: "Payment summary" });

  const openRoom = (room, living_names) => {
    const isAuthorized = living_names.includes(auth.user);
    const isAlreadyOpen = openedRooms?.includes(room);

    if (isAuthorized) {
      if (isAlreadyOpen) {
        setOpenedRooms((prevState) => {
          let newState = [...prevState];
          return newState.filter((item) => item !== room);
        });
        setMsg({ status: true, message: `Room ${room} closed.` });
      } else {
        setOpenedRooms((prevState) => {
          let newState = [...prevState];
          newState.push(room);
          return newState;
        });
        setMsg({ status: true, message: `Room ${room} opened.` });
      }
    } else {
      setMsg({
        status: false,
        message: `You don't have access to ${room}'s room.`,
      });
    }
  };

  const pay = (room) => {
    var config = {
      method: "put",
      url: `/admin/room/${room}`,
      data: JSON.stringify({ paidOn: new Date() }),
    };
    axiosPrivate(config)
      .then((res) => {
        setMsg({
          status: true,
          message: `Payment for ${room} completed.`,
        });
      })
      .catch((err) => {
        setMsg({
          status: false,
          message: `Payment for ${room} denied.`,
        });
      });
  };

  useEffect(() => {
    const getRooms = async () => {
      const result = await axiosPrivate.get("/rooms/");
      setRooms(result.data.data);
    };
    getRooms();
  }, [axiosPrivate, msg]);

  return (
    <section className="roomsMainSection">
      <div className={msg.status ? "roomsMsg-success" : "roomsMsg-denied"}>
        {msg.message}
      </div>
      <div className="roomsMainContainer">
        <div className="roomsSubContainer">
          {rooms?.length > 0 ? (
            rooms?.map((room, i) => (
              <Room
                key={i}
                name={room?.name}
                opened={openedRooms.includes(room?.name)}
                openRoom={openRoom}
                pay={pay}
                msg={msg}
              />
            ))
          ) : (
            <h3>There are no rooms yet..</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default Rooms;

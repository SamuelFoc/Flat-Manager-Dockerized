import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Room from "./AdminRoomCard";
import HiddenForm from "../../components/HiddenForm";

const Rooms = (props) => {
  const [formData, setFormData] = useState();
  const [showRooms, setShowRooms] = useState(false);
  const [user, setUser] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");

  // TODO: User Editing
  const [isEditForm, setIsEditForm] = useState(false);
  const showEditForm = (name) => {
    setIsEditForm((prevState) => !prevState);
    setName(name);
    setFormData({});
  };

  const showCreateForm = (name) => {
    setIsEditForm((prevState) => !prevState);
    setName(false);
    setFormData({});
  };

  const setVisibility = () => {
    setShowRooms((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  useEffect(() => {
    const getData = async () => {
      await axiosPrivate.get("/admin/users").then((users) => {
        let userArray = [];
        for (const user of users.data.data) {
          userArray.push(user.username);
        }
        setUser(userArray);
      });
    };

    getData();
  }, [axiosPrivate]);

  const formConfig = {
    type: "small",
    submit: {
      url: name ? `/admin/room/${name}` : "admin/room",
      method: name ? "put" : "post",
      data: formData,
    },
    inputs: [{ name: "name" }],
    selections: [{ name: "users", options: user }],
    submitName: name ? "EDIT" : "CREATE",
  };

  // TODO: DELETE USER
  const deleteRoom = (username) => {
    axiosPrivate
      .delete(`/admin/room/${username}`)
      .then(() => {
        props.showMsg(`Room ${username} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ${username}.`);
      });
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Rooms</h3>
        {!showRooms ? (
          <button
            className="btn btn-outline-warning my-2"
            onClick={setVisibility}
          >
            Configure
          </button>
        ) : (
          <button
            className="btn btn-outline-danger my-2"
            onClick={setVisibility}
          >
            Close
          </button>
        )}
      </div>
      <div className={showRooms ? "formBox" : "formBox hidden"}>
        {isEditForm && (
          <HiddenForm
            formInfo={formConfig}
            showForm={showEditForm}
            handleChange={handleChange}
            whatChanged={props.showMsg}
            whatFailed={props.addError}
          />
        )}
        <div className="text-light my-4">
          {props?.rooms?.length > 0 ? (
            props?.rooms?.map((room, i) => (
              <Room
                key={i}
                info={room}
                handleDelete={deleteRoom}
                showForm={showEditForm}
              />
            ))
          ) : (
            <h6 className=" m-2 text-light">There are no Rooms yet..</h6>
          )}
        </div>
        <button
          className="btn btn-outline-success my-2"
          onClick={showCreateForm}
        >
          Add Room
        </button>
      </div>
    </div>
  );
};

export default Rooms;

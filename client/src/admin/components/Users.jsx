import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import User from "./AdminUserCard";
import HiddenForm from "../../components/HiddenForm";

const Users = (props) => {
  const [formData, setFormData] = useState();
  const [showUsers, setShowUsers] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [username, setUsername] = useState("");

  // TODO: User Editing
  const [isEditForm, setIsEditForm] = useState(false);
  const showEditForm = (username) => {
    setIsEditForm((prevState) => !prevState);
    setUsername(username);
    setFormData({});
  };

  const showCreateForm = (username) => {
    setIsEditForm((prevState) => !prevState);
    setUsername(false);
    setFormData({});
  };

  const setVisibility = () => {
    setShowUsers((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formConfig = {
    type: "small",
    submit: {
      url: username ? `/admin/user/${username}` : "admin/register",
      method: username ? "put" : "post",
      data: formData,
    },
    inputs: [
      { name: "user" },
      { name: "email" },
      { name: "pwd", type: "password" },
      { name: "age", type: "number", min: 0, max: 120 },
      { name: "work" },
      { name: "contact", type: "number" },
      { name: "room" },
    ],
    checks: [{ name: "isAdmin" }],
    submitName: username ? "EDIT" : "CREATE",
  };

  // TODO: DELETE USER
  const deleteUser = (username) => {
    axiosPrivate
      .delete(`/admin/user/${username}`)
      .then(() => {
        props.showMsg(`User ${username} deleted succesfully.`);
      })
      .catch((err) => {
        props.addError(`Error occurred while deleting ${username}.`);
      });
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Users</h3>
        {!showUsers ? (
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
      <div className={showUsers ? "formBox" : "formBox hidden"}>
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
          {props?.users?.length > 0 ? (
            props?.users?.map((user) => (
              <User
                info={user}
                handleDelete={deleteUser}
                showForm={showEditForm}
              />
            ))
          ) : (
            <h6 className=" m-2 text-light">There are no users yet..</h6>
          )}
        </div>
        <button
          className="btn btn-outline-success my-2"
          onClick={showCreateForm}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default Users;
